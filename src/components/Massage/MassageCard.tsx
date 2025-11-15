import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Button from '../Button/Button'

interface MassageCardProps {
  title: string
  specialty: string
  image: string | null
  massageId: string
  onPress?: () => void
}

const MassageCard: React.FC<MassageCardProps> = ({
  title,
  specialty,
  image,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Massage Image */}
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
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.details}>
          <Text style={styles.specialtyText}>
            Spécialité: <Text style={styles.specialtyValue}>{specialty}</Text>
          </Text>
        </View>

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

export default MassageCard

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
    marginBottom: 10
  },
  details: {
    justifyContent: 'space-between',
    marginBottom: 8
  },
  specialtyText: {
    color: '#767474',
    fontSize: 12
  },
  specialtyValue: {
    color: '#B61753',
    fontWeight: 'bold'
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
