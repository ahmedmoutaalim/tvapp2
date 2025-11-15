import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

interface Props {
  name: string
  price: number
  image: string
  quantity: number
  onEdit?: () => void
  onDelete?: () => void
  onIncreaseQuantity?: () => void
  onDecreaseQuantity?: () => void
  hasTVPreferredFocus?: boolean
}

const CartProduct = ({
  name,
  price,
  image,
  quantity,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity
}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price.toFixed(2)} MAD</Text>
        <View style={styles.quantityContainer}>
          <TouchableHighlight
            onPress={onDecreaseQuantity}
            style={styles.quantityBtn}>
            <Icon name="minus" size={16} color="#fff" />
          </TouchableHighlight>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableHighlight
            onPress={onIncreaseQuantity}
            style={styles.quantityBtn}>
            <Icon name="plus" size={16} color="#fff" />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableHighlight onPress={onDelete} style={styles.iconBtn}>
          <Icon name="trash-2" size={18} color="#fff" />
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default CartProduct

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 12
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 28,
    backgroundColor: '#fff'
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4
  },
  actions: {
    gap: 8
  },
  iconBtn: {
    backgroundColor: '#D9D9D980',
    padding: 8,
    borderRadius: 100,
    marginLeft: 6
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10
  },
  quantityBtn: {
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center'
  }
})
