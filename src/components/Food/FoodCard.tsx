import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

interface Category {
  _id: string
  name: string
}

interface FoodItem {
  _id: string
  title: string
  price: number
  category: Category
  description: string
  image: string | null
  createdAt: string
  updatedAt: string
}

interface FoodCardProps {
  item: FoodItem
}

const FoodCard: React.FC<FoodCardProps> = ({item}) => {
  return (
    <TouchableOpacity style={styles.card}>
      {/* Food Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      {/* Food Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.category}>{item.category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FoodCard

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 14
  },
  infoContainer: {
    padding: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
    lineHeight: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  category: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  }
})
