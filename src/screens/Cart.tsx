import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import CartProduct from '../components/Cart/CartProduct'
import Modal from '../components/Modal/Modal'
import Button from '../components/Button/Button'
import {useCart} from '../context/CartContext'
import {createOrder} from '../services/order'

const Cart = () => {
  const navigation = useNavigation()
  const {cart, removeFromCart, updateQuantity, clearCart, isLoading} = useCart()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<'delete' | 'order' | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isOrdering, setIsOrdering] = useState(false)

  const totalItems = cart.totalItems

  const handleDeleteItem = async () => {
    console.log('🗑️ handleDeleteItem called with ID:', selectedItemId)
    if (selectedItemId) {
      try {
        console.log('🗑️ Removing item from cart...')
        await removeFromCart(selectedItemId)
        console.log('✅ Item removed successfully')
        setVisible(false)
        setSelectedItemId(null)
        setAction(null)
      } catch (error) {
        console.error('❌ Error deleting item:', error)
        Alert.alert('Error', 'Failed to delete item from cart')
      }
    } else {
      console.warn('⚠️ No item ID selected for deletion')
    }
  }

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from the cart?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => await clearCart()
        }
      ]
    )
  }

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart first')
      return
    }

    setAction('order')
    setVisible(true)
  }

  const confirmOrder = async () => {
    setIsOrdering(true)
    try {
      // Group items by client_id (should be same for all)
      const clientId = cart.items[0]?.client_id

      if (!clientId) {
        Alert.alert('Error', 'Client information not found')
        setIsOrdering(false)
        return
      }

      console.log('📦 Starting order submission...')
      console.log('📦 Cart items:', cart.items.length)
      console.log('📦 Client ID:', clientId)

      // Send each item as a separate order to the API
      const orderPromises = cart.items.map(item => {
        const orderData = {
          client_id: clientId,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
          type: item.type
        }
        console.log('📦 Sending order:', orderData)
        return createOrder(orderData)
      })

      const responses = await Promise.all(orderPromises)

      console.log('✅ All orders submitted successfully')
      console.log('📊 Order responses:', JSON.stringify(responses, null, 2))

      await clearCart()
      setVisible(false)
      Alert.alert('Success', 'Your order has been placed successfully!')
    } catch (error) {
      console.error('❌ Error placing order:', error)
      Alert.alert('Error', 'Failed to place order. Please try again.')
    } finally {
      setIsOrdering(false)
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <HeadTitle
            title="Votre panier"
            description={`Vous avez ${totalItems} produit${
              totalItems !== 1 ? 's' : ''
            } - Total: ${cart.totalPrice.toFixed(2)} MAD`}
          />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleClearCart}>
            <Icon name="trash" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {cart.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={64} color="#666" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart.items}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <CartProduct
                  name={item.title}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  onIncreaseQuantity={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  onDecreaseQuantity={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  onDelete={() => {
                    console.log(
                      '🔴 Delete button clicked for item:',
                      item.id,
                      item.title
                    )
                    setSelectedItemId(item.id)
                    setAction('delete')
                    setVisible(true)
                    console.log(
                      '🔴 Modal should open now. Action:',
                      'delete',
                      'Visible:',
                      true
                    )
                  }}
                />
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.footer}>
            <Button
              title={`Place Order - ${cart.totalPrice.toFixed(2)} MAD`}
              onPress={handlePlaceOrder}
              style={styles.orderButton}
            />
          </View>
        </>
      )}

      <Modal
        visible={visible}
        title={
          action === 'delete' ? 'Supprimer le produit' : 'Confirmer la commande'
        }
        onClose={() => {
          console.log('🔵 Modal closing')
          setVisible(false)
          setSelectedItemId(null)
          setAction(null)
        }}
        bodyStyle={{alignItems: 'center'}}
        footer={
          action === 'delete' ? (
            <Button
              title="Supprimer"
              onPress={() => {
                console.log('🟢 Delete button in modal clicked')
                handleDeleteItem()
              }}
              style={{backgroundColor: '#ff4d4d'}}
            />
          ) : (
            <Button
              title={isOrdering ? 'Processing...' : 'Confirmer'}
              onPress={confirmOrder}
              disabled={isOrdering}
            />
          )
        }>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {action === 'delete'
            ? 'Êtes-vous sûr de vouloir supprimer ce produit?'
            : `Confirmer la commande de ${cart.totalItems} produit${
                cart.totalItems !== 1 ? 's' : ''
              } pour ${cart.totalPrice.toFixed(2)} MAD?`}
        </Text>
      </Modal>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  backButton: {
    padding: 10,
    backgroundColor: '#D9D9D980',
    borderRadius: 100,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#D9D9D980',
    borderRadius: 100,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  itemWrapper: {
    flex: 1,
    margin: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
  footer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333'
  },
  orderButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16
  }
})
