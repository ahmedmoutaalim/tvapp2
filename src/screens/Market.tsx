import React, {useState} from 'react'
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native'
import {categories, products} from '../data/products'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import ProductCard from '../components/ProductCard/ProductCard'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'

const Market = () => {
  const {t} = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const getProducts = (categoryName: string) => {
    const cat = products.find(c => c.category === categoryName)
    return cat ? cat.products : []
  }

  return (
    <View style={styles.container}>
      <HeadTitle title={t('market')} description={t('market_description')} />

      <ScrollView>
        <Text style={styles.sectionTitle}>Parcourir les catégories</Text>

        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
          renderItem={({item}) => (
            <CategoryCard
              item={item}
              isSelected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
            />
          )}
        />

        <Text style={styles.sectionTitle}>{selectedCategory}</Text>

        <FlatList
          data={getProducts(selectedCategory)}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({item}) => <ProductCard item={item} />}
        />
      </ScrollView>
    </View>
  )
}

export default Market

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    marginTop: 20
  },
  categoriesList: {
    paddingBottom: 20
  },
  productsList: {
    paddingVertical: 20
  }
})
