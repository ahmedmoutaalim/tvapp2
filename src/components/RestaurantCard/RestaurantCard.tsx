import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  ImageSourcePropType
} from 'react-native'
import React, {useState} from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'

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
    marginRight: wp('1%'),
    alignItems: 'center',
    borderRadius: wp('1%'),
    backgroundColor: '#1D272E',
    width: wp('30%'),
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
    borderStyle: 'solid'
  },
  image: {
    width: '100%',
    height: hp('22%')
  },
  content: {
    padding: wp('0.8%'),
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: '600'
  },
  description: {
    color: 'white',
    fontSize: RFValue(9)
  },
  price: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: '500'
  },
  focused: {
    borderColor: 'white'
  }
})
