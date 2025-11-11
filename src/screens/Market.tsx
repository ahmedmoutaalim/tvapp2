import React, {useState, useMemo} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native'
import CategoryCard from '../components/CategoryCard/CategoryCard'
import ProductCard from '../components/ProductCard/ProductCard'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {getMarketProducts} from '../services/market'
import {useCart} from '../context/CartContext'
import {getClientId} from '../utils/clientStorage'

const Market = () => {
  const {t} = useTranslation()
  const {addToCart} = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [clientId, setClientId] = useState<string | null>(null)

  const {data, isLoading, error} = useQuery({
    queryKey: ['marketProducts', currentPage],
    queryFn: () => getMarketProducts({page: currentPage, limit: 10})
  })

  // Get client ID from AsyncStorage
  React.useEffect(() => {
    const loadClientId = async () => {
      const id = await getClientId()
      if (id) {
        setClientId(id)
        console.log('✅ Client ID loaded in Market:', id)
      } else {
        console.warn('⚠️ No client ID found. Please go to Home first.')
      }
    }
    loadClientId()
  }, [])

  const categories = useMemo(() => {
    if (!data?.marketProducts) return []
    const uniqueCategories = new Set<string>()
    data.marketProducts.forEach(product => {
      uniqueCategories.add(product.category.name)
    })
    return Array.from(uniqueCategories)
  }, [data?.marketProducts])

  const filteredProducts = useMemo(() => {
    if (!data?.marketProducts) return []
    if (!selectedCategory) return data.marketProducts
    return data.marketProducts.filter(
      product => product.category.name === selectedCategory
    )
  }, [data?.marketProducts, selectedCategory])

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    } else {
      Alert.alert('Success', message)
    }
  }

  const handleAddToCart = async (product: any) => {
    if (!clientId) {
      console.error('❌ Client ID not available. Please go to Home screen first.')
      Alert.alert(
        'Profile Required',
        'Please visit the Home screen first to load your profile.',
        [{text: 'OK'}]
      )
      return
    }

    console.log('Adding to cart:', {
      product_id: product.id,
      client_id: clientId,
      type: 'market',
      title: product.title,
      price: product.price
    })

    try {
      await addToCart({
        product_id: product.id,
        client_id: clientId,
        type: 'market',
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      })

      // Show success feedback
      showToast(`✓ ${product.title} added to cart`)
    } catch (error) {
      console.error('Error adding to cart:', error)
      Alert.alert('Error', 'Failed to add item to cart')
    }
  }

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete product API call
            console.log('Deleting product:', productId)
            showToast('Product deleted successfully')
          }
        }
      ]
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <HeadTitle title={t('market')} description={t('market_description')} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Error loading products. Please try again.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeadTitle title={t('market')} description={t('market_description')} />

      <ScrollView>
        <Text style={styles.sectionTitle}>Parcourir les catégories</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.categoriesList}
              renderItem={({item}) => (
                <CategoryCard
                  item={item}
                  isSelected={selectedCategory === item}
                  onPress={() => handleCategoryPress(item)}
                />
              )}
            />

            <Text style={styles.sectionTitle}>
              {selectedCategory || 'All Products'}
            </Text>

            <FlatList
              data={filteredProducts}
              keyExtractor={item => item._id}
              horizontal
              contentContainerStyle={styles.productsList}
              renderItem={({item}) => (
                <ProductCard
                  item={{
                    id: item._id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    category: item.category.name
                  }}
                  onAddToCart={handleAddToCart}
                  onDelete={handleDeleteProduct}
                  type="market"
                  showDelete={false} // Set to true if you want delete button on products
                />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No products available</Text>
              }
            />

            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.paginationButtonDisabled
                ]}
                onPress={handlePrevPage}
                disabled={currentPage === 1}>
                <Text
                  style={[
                    styles.paginationButtonText,
                    currentPage === 1 && styles.paginationButtonTextDisabled
                  ]}>
                  Previous
                </Text>
              </TouchableOpacity>

              <Text style={styles.paginationText}>
                Page {currentPage} of {data?.totalPages || 1}
              </Text>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === data?.totalPages &&
                    styles.paginationButtonDisabled
                ]}
                onPress={handleNextPage}
                disabled={currentPage === data?.totalPages}>
                <Text
                  style={[
                    styles.paginationButtonText,
                    currentPage === data?.totalPages &&
                      styles.paginationButtonTextDisabled
                  ]}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    marginTop: 20
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center'
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    padding: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  paginationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  paginationButtonDisabled: {
    backgroundColor: '#333',
    opacity: 0.5
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  paginationButtonTextDisabled: {
    color: '#666'
  },
  paginationText: {
    color: '#fff',
    fontSize: 14
  }
})
