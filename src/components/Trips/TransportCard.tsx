import React, {useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {t} from 'i18next'

interface TripCardProps {
  image: any
  title: string
  category: string
  price: number
  onPress: () => void
  delay?: string
}

const TransportCard = ({
  image,
  title,
  category,
  price,
  onPress,
  delay
}: TripCardProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [imageError, setImageError] = useState(false)

  console.log('image transport', image)
  console.log('image type:', typeof image)

  const imageSource = typeof image === 'string' ? {uri: image} : image

  return (
    <TouchableOpacity
      style={[styles.card, isFocused && styles.cardFocused]}
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      activeOpacity={0.9}>
      <View style={{position: 'relative', marginBottom: 10}}>
        {!imageError ? (
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={styles.image}
            resizeMode="cover"
            onError={error => {
              console.log(
                'image transport full:',
                JSON.stringify(image, null, 2)
              )
              console.log(
                'imageSource final:',
                JSON.stringify(imageSource, null, 2)
              )
              setImageError(true)
            }}
            onLoad={() => console.log('Image loaded successfully:', image)}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Icon name="image" size={50} color="#666" />
          </View>
        )}
        <TouchableOpacity style={styles.heartButton}>
          <Icon name="heart" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.category}>{delay}</Text>
      <Text style={styles.label}>{category}</Text>
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.price}> à partir de : {price} MAD</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TransportCard

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 20,
    paddingBottom: 20,
    borderRadius: 14
  },
  cardFocused: {
    borderWidth: 2,
    borderColor: 'white'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    backgroundColor: '#1a1a1a'
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a'
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14
  },
  category: {
    color: '#ccc',
    fontSize: 13,
    marginVertical: 4
  },
  label: {
    color: 'white',
    fontSize: 12
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 30,
    backgroundColor: '#92CC97'
  },
  buttonFocused: {
    borderWidth: 2,
    borderColor: 'white'
  },
  type: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 6
  }
})
