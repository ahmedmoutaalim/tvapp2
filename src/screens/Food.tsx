import React, {useState} from 'react'
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native'
import {categories, products} from '../data/products'
import ProductCard from '../components/ProductCard/ProductCard'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'

const data = {
  tacos: [
    {
      id: 1,
      title: 'Tacos',
      price: 12.99,
      image: require('../assets/tacos.jpg'),
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.'
    },
    {
      id: 2,
      title: 'Caesar Salad',
      price: 8.99,
      image: require('../assets/salad.jpg'),
      description: 'Crisp romaine lettuce with Caesar dressing, croutons.'
    },
    {
      id: 3,
      title: 'Pizza Margherita',
      price: 12.99,
      image: require('../assets/salad.jpg'),
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.'
    },
    {
      id: 4,
      title: 'Caesar Salad',
      price: 8.99,
      image: require('../assets/tacos.jpg'),
      description: 'Crisp romaine lettuce with Caesar dressing, croutons.'
    }
  ],
  Pizzas: [
    {
      id: 3,
      title: 'Pizza',
      price: 5.99,
      image: require('../assets/salad.jpg'),
      description: 'A selection of pastries, fruits, and coffee.'
    },
    {
      id: 4,
      title: 'Pizza',
      price: 10.99,
      image: require('../assets/tacos.jpg'),
      description: 'Eggs, bacon, sausages, beans, and toast.'
    }
  ],
  sandwish: [
    {
      id: 5,
      title: 'sandwish',
      price: 15.99,
      image: require('../assets/tacos.jpg'),
      description: 'Fresh salmon fillet grilled to perfection.'
    },
    {
      id: 6,
      title: 'sandwish',
      price: 18.99,
      image: require('../assets/salad.jpg'),
      description: 'Juicy steak served with crispy fries.'
    }
  ],
  accompagnements: [
    {
      id: 7,
      title: 'accompagnement Cake',
      price: 6.99,
      image: require('../assets/tacos.jpg'),
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
const Food = () => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <HeadTitle title={t('food')} description={t('food_description')} />

      <ScrollView>
        <Text style={styles.sectionTitle}>{t('tacos')}</Text>

        <FlatList
          data={data.tacos}
          horizontal
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('Pizzas')}</Text>
        <FlatList
          data={data.Pizzas}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('sandwish')}</Text>
        <FlatList
          data={data.sandwish}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />

        <Text style={styles.sectionTitle}>{t('accompagnements')}</Text>
        <FlatList
          data={data.accompagnements}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <RestaurantCard item={item} />}
        />
      </ScrollView>
    </View>
  )
}

export default Food

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
