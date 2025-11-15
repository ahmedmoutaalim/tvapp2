import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'
import RestaurantCard from '../components/RestaurantCard/RestaurantCard'
import {useQuery} from '@tanstack/react-query'
import {getMenuData} from '../services/menu'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'

const Restaurant = () => {
  const {t} = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<
    Array<{id: string; name: string}>
  >([])
  const [groupedMenuItems, setGroupedMenuItems] = useState<{
    [key: string]: any[]
  }>({})

  const {data, isLoading, error} = useQuery({
    queryKey: ['MENU'],
    queryFn: getMenuData
  })

  console.log('🍽️ Restaurant Query State:', {
    isLoading,
    hasError: !!error,
    hasData: !!data,
    dataKeys: data ? Object.keys(data) : []
  })

  if (error) {
    console.error('❌ Restaurant Query Error:', {
      message: (error as Error).message,
      name: (error as Error).name,
      fullError: JSON.stringify(error, null, 2)
    })
  }

  // Extract unique categories and group menu items by category
  useEffect(() => {
    if (data?.menuItems) {
      // Extract unique categories
      const uniqueCategories = data.menuItems.reduce(
        (acc: Array<{id: string; name: string}>, item: any) => {
          const categoryExists = acc.find(cat => cat.id === item.category._id)
          if (!categoryExists && item.category) {
            acc.push({
              id: item.category._id,
              name: item.category.name
            })
          }
          return acc
        },
        []
      )
      setCategories(uniqueCategories)

      // Group menu items by category
      const grouped = data.menuItems.reduce(
        (acc: {[key: string]: any[]}, item: any) => {
          const categoryId = item.category._id
          if (!acc[categoryId]) {
            acc[categoryId] = []
          }
          acc[categoryId].push(item)
          return acc
        },
        {}
      )
      setGroupedMenuItems(grouped)
    }
  }, [data])

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  // Get categories to display based on selection
  const displayCategories = selectedCategory
    ? categories.filter(cat => cat.id === selectedCategory)
    : categories

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HeadTitle
          title={t('restaurant_service')}
          description={t('restaurant_description')}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <HeadTitle
          title={t('restaurant_service')}
          description={t('restaurant_description')}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Error loading menu data. Please try again.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeadTitle
        title={t('restaurant_service')}
        description={t('restaurant_description')}
      />

      {/* Category Filter Buttons */}
      {categories.length > 0 && (
        <View style={styles.categoryFilterContainer}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilterList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleCategoryPress(item.id)}
                style={[
                  styles.categoryButton,
                  selectedCategory === item.id && styles.categoryButtonActive
                ]}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === item.id &&
                      styles.categoryButtonTextActive
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {displayCategories.length > 0 ? (
          displayCategories.map(category => (
            <View key={category.id}>
              <Text style={styles.sectionTitle}>{category.name}</Text>
              <FlatList
                data={groupedMenuItems[category.id] || []}
                horizontal
                keyExtractor={item => item._id}
                contentContainerStyle={styles.productsList}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <RestaurantCard item={item} />}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No items in this category
                  </Text>
                }
              />
            </View>
          ))
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No menu items available</Text>
          </View>
        )}
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
    fontSize: RFValue(14),
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: hp(1)
  },
  productsList: {
    paddingVertical: 20
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(5)
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: RFValue(14),
    textAlign: 'center'
  },
  emptyText: {
    color: '#999',
    fontSize: RFValue(12),
    textAlign: 'center',
    padding: wp(5)
  },
  categoryFilterContainer: {
    marginVertical: hp(1)
  },
  categoryFilterList: {
    paddingVertical: hp(1)
  },
  categoryButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginRight: wp(2),
    borderWidth: 2,
    borderColor: '#fff'
  },
  categoryButtonActive: {
    backgroundColor: 'transparent',
    borderColor: '#fff'
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    fontWeight: '500'
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600'
  }
})
