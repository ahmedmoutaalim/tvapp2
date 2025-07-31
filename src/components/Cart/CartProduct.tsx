import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'

interface Props {
  name: string
  price: number
  image: any
  onEdit?: () => void
  onDelete?: () => void
}

const CartProduct = ({ name, price, image, onEdit, onDelete }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}/>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price.toFixed(2)} MAD</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Icon name="edit-3" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <Icon name="trash-2" size={18} color="#fff" />
        </TouchableOpacity>
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
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    gap: 8,
  },
  iconBtn: {
    backgroundColor: '#D9D9D980',
    padding: 8,
    borderRadius: 100,
    marginLeft: 6,
  },
})
