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
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        {showDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Icon name="trash-2" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price} MAD</Text>

        {onAddToCart && (
          <TouchableOpacity
            style={[styles.addButton, isFocused && styles.addButtonFocused]}
            onPress={handleAddToCart}
            onFocus={() => setIsFocused(false)}
            onBlur={() => setIsFocused(false)}>
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
  imageContainer: {
    position: 'relative',
    width: '100%'
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: 8
  },
  details: {
    width: '100%',
    paddingHorizontal: 8
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    marginTop: 4,
    marginBottom: 2,
    minHeight: 22
  },
  price: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4
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
  addButtonFocused: {
    borderWidth: 3,
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.2)'
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
