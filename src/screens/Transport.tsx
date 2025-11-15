import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native'
import React, {useState, useEffect} from 'react'

import Icon from 'react-native-vector-icons/Feather'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import {useTranslation} from 'react-i18next'
import TransportCard from '../components/Trips/TransportCard'
import {useQuery} from '@tanstack/react-query'
import {getTransportData} from '../services/transport'

const Transport = ({navigation}: any) => {
  const {t} = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<
    Array<{id: string; name: string}>
  >([])

  const {data, isLoading, error} = useQuery({
    queryKey: ['transport', currentPage],
    queryFn: () => getTransportData({page: currentPage, limit: 10})
  })

  // Extract unique categories from transport data
  useEffect(() => {
    if (data?.transports) {
      const uniqueCategories = data.transports.reduce(
        (acc: Array<{id: string; name: string}>, transport: any) => {
          const categoryExists = acc.find(
            cat => cat.id === transport.category._id
          )
          if (!categoryExists && transport.category) {
            acc.push({
              id: transport.category._id,
              name: transport.category.name
            })
          }
          return acc
        },
        []
      )
      setCategories(uniqueCategories)
    }
  }, [data])

  // Filter transports by selected category
  const filteredTransports = selectedCategory
    ? data?.transports?.filter(
        transport => transport.category._id === selectedCategory
      )
    : data?.transports

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

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // Deselect if clicking the same category
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  if (error) {
    return (
      <View style={{flex: 1, paddingBottom: hp(2)}}>
        <View style={styles.header}>
          <HeadTitle
            title={t('transport_&_transfers')}
            description={t('transport_description')}
            customStyles={{
              header: {width: wp('70%')}
            }}
          />
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Error loading transport data. Please try again.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, paddingBottom: hp(2)}}>
      <View style={styles.header}>
        <HeadTitle
          title={t('transport_&_transfers')}
          description={t('transport_description')}
          customStyles={{
            header: {width: wp('70%')}
          }}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Category Filter Buttons */}
      <View style={{paddingHorizontal: wp(3)}}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={{paddingVertical: hp(1)}}
          showsHorizontalScrollIndicator={false}
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
          ListEmptyComponent={
            !isLoading ? (
              <Text style={styles.emptyText}>No categories available</Text>
            ) : null
          }
        />
      </View>

      <ScrollView>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory
                  ? `${
                      categories.find(cat => cat.id === selectedCategory)
                        ?.name || 'Filtered'
                    } Transport`
                  : t('recommended_transport')}
              </Text>
              <FlatList
                data={filteredTransports || []}
                keyExtractor={item => item._id}
                horizontal
                contentContainerStyle={{paddingLeft: wp(5)}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TransportCard
                    onPress={() =>
                      navigation.navigate('TripDetails', {id: item._id})
                    }
                    image={item.image}
                    title={item.title}
                    category={item.category.name}
                    price={item.price}
                    delay={item.delay}
                  />
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    {selectedCategory
                      ? 'No transport options in this category'
                      : 'No transport options available'}
                  </Text>
                }
              />
            </View>

            {data && data.totalPages > 1 && (
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
                  Page {currentPage} of {data.totalPages}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.paginationButton,
                    currentPage === data.totalPages &&
                      styles.paginationButtonDisabled
                  ]}
                  onPress={handleNextPage}
                  disabled={currentPage === data.totalPages}>
                  <Text
                    style={[
                      styles.paginationButtonText,
                      currentPage === data.totalPages &&
                        styles.paginationButtonTextDisabled
                    ]}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default Transport

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3)
  },
  searchButton: {
    padding: wp(1),
    backgroundColor: '#D9D9D980',
    borderRadius: wp(50),
    height: wp(4),
    width: wp(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    color: 'white',
    marginVertical: hp(1.5),
    paddingHorizontal: wp(3)
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
    paddingHorizontal: wp(5)
  },
  paginationButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: 8,
    minWidth: wp(25),
    alignItems: 'center'
  },
  paginationButtonDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.5
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: RFValue(12),
    fontWeight: '600'
  },
  paginationButtonTextDisabled: {
    color: '#666'
  },
  paginationText: {
    color: '#fff',
    fontSize: RFValue(12)
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
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: '500'
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600'
  }
})
