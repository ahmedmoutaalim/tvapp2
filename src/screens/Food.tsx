import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'
import FoodCard from '../components/Food/FoodCard'
import {getFoodData} from '../services/food'

const Food = () => {
  const {t} = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Fetch food data using useQuery
  const {data, isLoading, error} = useQuery({
    queryKey: ['foodData'],
    queryFn: getFoodData
  })

  console.log('Full API Response:', data)

  // Extract unique categories from the food items
  const categories = React.useMemo(() => {
    // Check different possible response structures
    const foodItems = data?.foodItems || []

    console.log('Food Items:', foodItems)

    if (!foodItems || foodItems.length === 0) return []

    const uniqueCategories = new Map()
    foodItems.forEach((item: any) => {
      if (item.category && !uniqueCategories.has(item.category._id)) {
        uniqueCategories.set(item.category._id, item.category)
      }
    })

    return Array.from(uniqueCategories.values())
  }, [data])

  console.log('Categories:', categories)

  // Filter products by selected category
  const filteredProducts = React.useMemo(() => {
    // Check different possible response structures
    const foodItems = data?.foodItems || data?.foodItems || []

    if (!foodItems || foodItems.length === 0) return []

    if (!selectedCategory) {
      return foodItems
    }

    return foodItems.filter(
      (item: any) => item.category._id === selectedCategory
    )
  }, [data, selectedCategory])

  console.log('Filtered Products:', filteredProducts)

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>{t('loading') || 'Loading...'}</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {t('error_loading_food') || 'Error loading food items'}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeadTitle title={t('food')} description={t('food_description')} />

      {/* Categories Filter Buttons */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}>
          {/* All Categories Button */}
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(null)}>
            <Text
              style={[
                styles.categoryButtonText,
                !selectedCategory && styles.categoryButtonTextActive
              ]}>
              {t('all')}
            </Text>
          </TouchableOpacity>

          {/* Individual Category Buttons */}
          {categories.map(category => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.categoryButton,
                selectedCategory === category._id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category._id)}>
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category._id &&
                    styles.categoryButtonTextActive
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            renderItem={({item}) => <FoodCard item={item} />}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {t('no_products_found') || 'No products found'}
            </Text>
          </View>
        )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center'
  },
  categoriesContainer: {
    marginBottom: 20
  },
  categoriesScroll: {
    paddingVertical: 10
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  categoryButtonActive: {
    backgroundColor: 'transparent',
    borderColor: '#fff'
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  categoryButtonTextActive: {
    color: '#fff'
  },
  productsList: {
    paddingVertical: 20
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16
  }
})
