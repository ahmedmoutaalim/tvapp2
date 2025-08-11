import React, {useState} from 'react'
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'

const data = {
  offer_of_the_day: [
    {
      id: 1,
      title: 'Pizza Margherita',
      price: 12.99,
      image: require('../assets/food1.jpg'),
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.'
    },
    {
      id: 2,
      title: 'Caesar Salad',
      price: 8.99,
      image: require('../assets/food2.jpg'),
      description: 'Crisp romaine lettuce with Caesar dressing, croutons.'
    },
    {
      id: 3,
      title: 'Pizza Margherita',
      price: 12.99,
      image: require('../assets/food1.jpg'),
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.'
    },
    {
      id: 4,
      title: 'Caesar Salad',
      price: 8.99,
      image: require('../assets/food2.jpg'),
      description: 'Crisp romaine lettuce with Caesar dressing, croutons.'
    }
  ],
  breakfast: [
    {
      id: 3,
      title: 'Continental Breakfast',
      price: 5.99,
      image: require('../assets/food1.jpg'),
      description: 'A selection of pastries, fruits, and coffee.'
    },
    {
      id: 4,
      title: 'Full English Breakfast',
      price: 10.99,
      image: require('../assets/food2.jpg'),
      description: 'Eggs, bacon, sausages, beans, and toast.'
    }
  ],
  dinner: [
    {
      id: 5,
      title: 'Grilled Salmon',
      price: 15.99,
      image: require('../assets/food1.jpg'),
      description: 'Fresh salmon fillet grilled to perfection.'
    },
    {
      id: 6,
      title: 'Steak and Fries',
      price: 18.99,
      image: require('../assets/food2.jpg'),
      description: 'Juicy steak served with crispy fries.'
    }
  ],
  dessert: [
    {
      id: 7,
      title: 'Chocolate Cake',
      price: 6.99,
      image: require('../assets/food1.jpg'),
      description: 'Rich chocolate cake with a creamy frosting.'
    },
    {
      id: 8,
      title: 'Fruit Tart',
      price: 5.99,
      image: require('../assets/food2.jpg'),
      description: 'Delicious tart filled with seasonal fruits.'
    }
  ]
}
const Restaurant = () => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <HeadTitle
        title={t('restaurant_service')}
        description={t('restaurant_description')}
      />

      <ScrollView>
        <Text style={styles.sectionTitle}>{t('offer_of_the_day')}</Text>

        <FlatList
          data={data.offer_of_the_day}
          horizontal
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('breakfast')}</Text>
        <FlatList
          data={data.breakfast}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('dinner')}</Text>
        <FlatList
          data={data.dinner}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('dessert')}</Text>
        <FlatList
          data={data.dessert}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />
      </ScrollView>
    </View>
  )
}

export default Restaurant

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8
  },
  productsList: {
    paddingVertical: 20
  }
})
