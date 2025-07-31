import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Button from '../Button/Button'
import Icon from 'react-native-vector-icons/Feather'

interface TripCardProps {
  image: any
  title: string
  category: string
  price: number
  type: string
}

const TripCard = ({image, title, category, price, type}: TripCardProps) => {
  return (
    <View style={styles.card}>
      <View style={{position: 'relative', marginBottom: 10}}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#fff',
            padding: 6,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Icon name="heart" size={18} color="#000" />
        </TouchableOpacity>
        <Text>{title}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.label}>à partir de :</Text>
        <Text style={styles.price}>{price} MAD</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
      <Button title="Réserver" style={styles.button} variant="primary" />
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
    borderRadius: 14,
    marginBottom: 10
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
  price: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  type: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 12
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: '#61D273'
  }
})
