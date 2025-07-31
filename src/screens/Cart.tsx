import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageSourcePropType
} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import CartProduct from '../components/Cart/CartProduct'
import Modal from '../components/Modal/Modal'
import Button from '../components/Button/Button'

const cartItems: {
  id: number
  name: string
  price: number
  image: ImageSourcePropType
}[] = [
  {
    id: 1,
    name: 'Sidi ali 12x50cl',
    price: 36,
    image: require('../assets/images/products/cat/cat1.jpg')
  },
  {
    id: 2,
    name: 'Entrecôte de boeuf',
    price: 72,
    image: require('../assets/images/products/cat/cat2.jpg')
  },
  {
    id: 3,
    name: 'OMO active oxygen 4.5kg',
    price: 140,
    image: require('../assets/images/products/cat/cat1.jpg')
  },
  {
    id: 4,
    name: 'Filet de Poulet 500g',
    price: 36,
    image: require('../assets/images/products/cat/cat2.jpg')
  },
  {
    id: 5,
    name: 'Viande hachée',
    price: 36,
    image: require('../assets/images/products/cat/cat1.jpg')
  },
  {
    id: 6,
    name: 'Lesieur 1L',
    price: 62,
    image: require('../assets/images/products/cat/cat2.jpg')
  },
  {
    id: 7,
    name: 'Sidi Ali 12x50cl',
    price: 36,
    image: require('../assets/images/products/cat/cat1.jpg')
  },
  {
    id: 8,
    name: 'Entrecôte de boeuf',
    price: 72,
    image: require('../assets/images/products/cat/cat2.jpg')
  },
  {
    id: 9,
    name: 'OMO active oxygen 4.5kg',
    price: 140,
    image: require('../assets/images/products/cat/cat1.jpg')
  },
  {
    id: 10,
    name: 'Filet de Poulet 500g',
    price: 36,
    image: require('../assets/images/products/cat/cat2.jpg')
  }
]

const Cart = () => {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<'edit' | 'delete' | null>(null)

  const totalItems = cartItems.length
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <HeadTitle
          title="Votre panier"
          description={`Vous avez ${totalItems} produits chez xxx`}
        />
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="trash" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        renderItem={({item}) => (
          <View style={styles.itemWrapper}>
            <CartProduct
              name={item.name}
              price={item.price}
              image={item.image}
              onEdit={() => {
                setAction('edit')
                setVisible(true)
              }}
              onDelete={() => {
                setAction('delete')
                setVisible(true)
              }}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={visible}
        title={
          action === 'edit' ? 'Modifier le produit' : 'Supprimer le produit'
        }
        onClose={() => setVisible(false)}
        bodyStyle={{alignItems: 'center'}}
        footer={
          action === 'delete' ? (
            <Button
              title="Supprimer"
              onPress={() => {
                setVisible(false)
              }}
              style={{backgroundColor: '#ff4d4d'}}
            />
          ) : (
            <Button
              title="Modifier"
              onPress={() => {
                setVisible(false)
              }}
            />
          )
        }>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {action === 'edit'
            ? 'Produit modifié avec succès'
            : 'Produit supprimé avec succès'}
        </Text>
      </Modal>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 50
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#D9D9D980',
    borderRadius: '100%',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  itemWrapper: {
    flex: 1,
    margin: 8
  }
})
