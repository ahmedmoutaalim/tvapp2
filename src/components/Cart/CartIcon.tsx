import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'
import {AppNavigationProp} from '../../navigation/types'
import {useCart} from '../../context/CartContext'

const CartIcon = () => {
  const navigation = useNavigation<AppNavigationProp>()
  const {cart} = useCart()

  return (
    <TouchableOpacity
      style={styles.cartIcon}
      onPress={() => navigation.navigate('Cart' as never)}>
      <Ionicons name="cart" size={22} color="#fff" />
      {cart.totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
            {cart.totalItems > 99 ? '99+' : cart.totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CartIcon

const styles = StyleSheet.create({
  cartIcon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D980',
    borderRadius: 100,
    padding: 5,
    justifyContent: 'center',
    width: 40,
    height: 40,
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
