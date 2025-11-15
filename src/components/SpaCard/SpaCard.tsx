import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Button from '../Button/Button'

interface SpaCardProps {
  title: string
  image?: string | null
  spaId: string
  onPress?: () => void
}

const SpaCard: React.FC<SpaCardProps> = ({title, image, spaId, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Spa Image */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.descriptionText}>
          Découvrez nos services de spa et bien-être
        </Text>

        <Button
          title="Réserver"
          variant="primary"
          onPress={onPress}
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
    marginHorizontal: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: 120
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0'
  },
  placeholderText: {
    color: '#999',
    fontSize: 14
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  descriptionText: {
    color: '#767474',
    fontSize: 12,
    marginBottom: 10
  },
  button: {
    paddingVertical: 8,
    backgroundColor: '#00EB5B',
    borderWidth: 1,
    borderColor: '#0DAF4C',
    borderRadius: 20,
    color: 'black'
  }
})
