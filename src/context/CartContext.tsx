import React, {createContext, useContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type {CartItem, AddToCartParams, Cart} from '../interfaces/cart'

interface CartContextType {
  cart: Cart
  addToCart: (params: AddToCartParams) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = '@tv_app_cart'

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    loadCart()
  }, [])

  // Calculate totals whenever items change
  useEffect(() => {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    setCart(prev => ({
      ...prev,
      totalItems,
      totalPrice
    }))
  }, [cart.items.length])

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY)
      if (cartData) {
        const parsedCart: Cart = JSON.parse(cartData)
        setCart(parsedCart)
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveCart = async (updatedCart: Cart) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart))
    } catch (error) {
      console.error('Error saving cart to storage:', error)
    }
  }

  const addToCart = async (params: AddToCartParams) => {
    try {
      const existingItemIndex = cart.items.findIndex(
        item =>
          item.product_id === params.product_id && item.type === params.type
      )

      let updatedItems: CartItem[]

      if (existingItemIndex > -1) {
        // Item already exists, increase quantity
        updatedItems = [...cart.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        }
      } else {
        // New item, add to cart
        const newItem: CartItem = {
          id: `${params.product_id}_${Date.now()}`,
          product_id: params.product_id,
          client_id: params.client_id,
          type: params.type,
          title: params.title,
          price: params.price,
          image: params.image,
          quantity: 1,
          category: params.category
        }
        updatedItems = [...cart.items, newItem]
      }

      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      const updatedCart: Cart = {
        items: updatedItems,
        totalItems,
        totalPrice
      }

      setCart(updatedCart)
      await saveCart(updatedCart)
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      console.log('🗑️ [CartContext] removeFromCart called with ID:', itemId)
      console.log('🗑️ [CartContext] Current cart items:', cart.items.length)

      const itemToRemove = cart.items.find(item => item.id === itemId)
      console.log(
        '🗑️ [CartContext] Item to remove:',
        itemToRemove?.title || 'NOT FOUND'
      )

      const updatedItems = cart.items.filter(item => item.id !== itemId)
      console.log('🗑️ [CartContext] Updated items count:', updatedItems.length)

      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      const updatedCart: Cart = {
        items: updatedItems,
        totalItems,
        totalPrice
      }

      console.log('🗑️ [CartContext] Updating cart state...')
      setCart(updatedCart)
      console.log('🗑️ [CartContext] Saving to AsyncStorage...')
      await saveCart(updatedCart)
      console.log('✅ [CartContext] Item removed and saved successfully')
    } catch (error) {
      console.error('❌ [CartContext] Error removing item from cart:', error)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId)
        return
      }

      const updatedItems = cart.items.map(item =>
        item.id === itemId ? {...item, quantity} : item
      )

      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      const updatedCart: Cart = {
        items: updatedItems,
        totalItems,
        totalPrice
      }

      setCart(updatedCart)
      await saveCart(updatedCart)
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const clearCart = async () => {
    try {
      const emptyCart: Cart = {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
      setCart(emptyCart)
      await AsyncStorage.removeItem(CART_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading
      }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
