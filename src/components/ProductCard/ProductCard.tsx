import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  TouchableOpacity
} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {useTranslation} from 'react-i18next'
import type {CartItemType} from '../../interfaces/cart'

interface Product {
  id: string
  title: string
  price: number
  image: string
  category?: string
}

interface Props {
  item: Product
  onAddToCart?: (product: Product) => void
  onDelete?: (productId: string) => void
  type?: CartItemType
  showDelete?: boolean
}

const ProductCard = ({
  item,
  onAddToCart,
  onDelete,
  type,
  showDelete = false
}: Props) => {
  const {t} = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  const handleAddToCart = (e: any) => {
    e?.stopPropagation()
    if (onAddToCart) {
      onAddToCart(item)
    }
  }

  const handleDelete = (e: any) => {
    e?.stopPropagation()
    if (onDelete) {
      onDelete(item.id)
    }
  }

  return (
    <View style={[styles.container]}>
      <Pressable
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.pressable}>
        <Image
          source={{uri: item.image}}
          style={[styles.image, isFocused && styles.focused]}
        />
        {showDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Icon name="trash-2" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </Pressable>

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price} MAD</Text>

        {onAddToCart && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Icon name="shopping-cart" size={16} color="#fff" />
            <Text style={styles.addButtonText}>{t('add_to_cart')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    alignItems: 'center',
    width: 180
  },
  pressable: {
    position: 'relative',
    width: '100%'
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: 8
  },
  focused: {
    borderWidth: 3,
    borderColor: '#007AFF',
    borderRadius: 16
  },
  details: {
    width: '100%',
    paddingHorizontal: 4
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    minHeight: 40
  },
  price: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    marginTop: 4
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4d4d',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  }
})
