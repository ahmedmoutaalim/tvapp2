import {StyleSheet, Text, Image, Pressable, View} from 'react-native'
import React, {useState} from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Feather'

interface Product {
  _id: string
  title: string
  price: number
  image: string
  description?: string
  category: {
    _id: string
    name: string
  }
}

interface Props {
  item: Product
}

const RestaurantCard = ({item}: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Pressable
      onFocus={() => setIsFocused(false)}
      onBlur={() => setIsFocused(false)}
      style={[styles.container, isFocused && styles.focused]}>
      {!imageError ? (
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Icon name="image" size={50} color="#666" />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
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
    height: hp('22%'),
    backgroundColor: '#1a1a1a'
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a'
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
    color: '#ccc',
    fontSize: RFValue(9),
    marginTop: 4
  },
  price: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: '500',
    marginTop: 4
  },
  focused: {
    borderColor: 'white'
  }
})
