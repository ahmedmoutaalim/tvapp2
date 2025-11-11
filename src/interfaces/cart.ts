export type CartItemType = 'market' | 'food' | 'spa' | 'massage' | 'transport' | 'restaurant'

export interface CartItem {
  id: string // unique cart item id (product_id + timestamp)
  product_id: string // from market/food/spa product
  client_id: string // from user data
  type: CartItemType
  title: string
  price: number
  image: string
  quantity: number
  category?: string
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface AddToCartParams {
  product_id: string
  client_id: string
  type: CartItemType
  title: string
  price: number
  image: string
  category?: string
}
