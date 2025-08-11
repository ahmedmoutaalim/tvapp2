import React, {useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Button from '../Button/Button'
import Icon from 'react-native-vector-icons/Feather'
import {t} from 'i18next'

interface TripCardProps {
  image: any
  title: string
  category: string
  price: number
  type: string
  onPress: () => void
}

const TripCard = ({
  image,
  title,
  category,
  price,
  type,
  onPress
}: TripCardProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.card} onTouchStart={onPress}>
      <View style={{position: 'relative', marginBottom: 10}}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity style={styles.heartButton}>
          <Icon name="heart" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.label}>à partir de :</Text>
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.price}>{price} MAD</Text>
          <Text style={styles.type}>{type}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title={t('book_now')}
            style={[styles.button, isFocused && styles.buttonFocused]}
            textStyle={{color: 'black'}}
            variant="primary"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onPressIn={() => {
              setIsFocused(true)
            }}
            onPressOut={() => setIsFocused(false)}
            onPress={() => console.log('Book Now pressed')}
          />
        </View>
      </View>
    </View>
  )
}

export default TripCard

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 20,
    paddingBottom: 20
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 14
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
    fontSize: 16
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
