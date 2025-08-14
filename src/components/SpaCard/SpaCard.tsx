// components/SpaCard.tsx
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Button from '../Button/Button'
import {Pressable} from 'react-native-gesture-handler'

interface SpaCardProps {
  title: string
  duration: string
  price: string
  image: any
  onPress?: () => void
}

const SpaCard: React.FC<SpaCardProps> = ({
  title,
  duration,
  price,
  image,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>Durée : {duration}</Text>
          <Text style={styles.priceText}>
            à partir de{' '}
            <Text
              style={{
                color: '#B61753'
              }}>
              {price} MAD
            </Text>
          </Text>
        </View>
        <Button
          title="Réserver"
          variant="primary"
          style={styles.button}
          textStyle={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold'
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

export default SpaCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: 200,
    borderRadius: 18,
    marginBottom: 15,
    marginHorizontal: 10
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover'
  },
  content: {
    paddingHorizontal: 8
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },

  details: {
    justifyContent: 'space-between',
    marginBottom: 4
  },
  detailText: {
    color: '#767474',
    fontSize: 12
  },
  priceText: {
    color: '#767474',
    fontSize: 12,
    fontWeight: 'bold'
  },

  button: {
    paddingVertical: 8,
    backgroundColor: '#00EB5B',
    borderWWidth: 1,
    borderColor: '#0DAF4C',
    borderRadius: 20,
    color: 'black'
  }
})
