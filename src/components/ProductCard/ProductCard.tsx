import {StyleSheet, Text, Image, Pressable} from 'react-native'
import React, {useState} from 'react'

interface Product {
  id: string
  title: string
  price: number
  image: string
}

interface Props {
  item: Product
}

const ProductCard = ({item}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Pressable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[styles.container]}>
      <Image
        source={{uri: item.image}} // Fixed - use the actual image URL from data
        style={[styles.image, isFocused && styles.focused]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price} MAD</Text>
    </Pressable>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    alignItems: 'center'
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 30,
    marginBottom: 5
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  price: {
    color: '#fff',
    fontSize: 16
  },
  focused: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 30
  }
})
