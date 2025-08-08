import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  ImageSourcePropType
} from 'react-native'
import React, {useState} from 'react'

interface Product {
  id: number
  title: string
  price: number
  image: ImageSourcePropType
  description?: string
}

interface Props {
  item: Product
}

const RestaurantCard = ({item}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Pressable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[styles.container, isFocused && styles.focused]}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <Text style={styles.price}>{item.price} MAD</Text>
      </View>
    </Pressable>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#1D272E',
    width: 300,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
    borderStyle: 'solid'
  },
  image: {
    width: '100%',
    height: 150
  },
  content: {
    padding: 10,
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5
  },
  description: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5
  },
  price: {
    color: 'white',
    fontSize: 16
  },
  focused: {
    borderColor: 'white'
  }
})
