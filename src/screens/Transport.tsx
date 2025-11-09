import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native'
import React, {useState} from 'react'

import Icon from 'react-native-vector-icons/Feather'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Button from '../components/Button/Button'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import TransportCard from '../components/Trips/TransportCard'
import {useQuery} from '@tanstack/react-query'
import {getTransportData} from '../services/transport'

const filterOptions = [
  {
    id: 1,
    title: 'private',
    icon: <FAIcon name="star" size={RFValue(18)} color="#fff" />
  },
  {
    id: 2,
    title: 'Airport',
    icon: <FAIcon name="compass" size={RFValue(18)} color="#fff" />
  },
  {
    id: 3,
    title: 'collective_transport_system',
    icon: <FAIcon name="star" size={RFValue(18)} color="#fff" />
  },
  {
    id: 4,
    title: 'taxi_and_shuttles',
    icon: <FAIcon name="book-open" size={RFValue(18)} color="#fff" />
  }
]

const Transport = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const [currentPage, setCurrentPage] = useState(1)

  const {data, isLoading, error} = useQuery({
    queryKey: ['transport', currentPage],
    queryFn: () => getTransportData({page: currentPage, limit: 10})
  })

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

      <View style={{paddingHorizontal: wp(3)}}>
        <FlatList
          data={filterOptions}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={{paddingVertical: hp(1)}}
          renderItem={({item}) => (
            <Button
              variant="outline"
              title={t(item.title)}
              icon={item.icon}
              style={{
                marginRight: wp(2)
              }}
            />
          )}
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
                {t('recommended_transport')}
              </Text>
              <FlatList
                data={data?.transports || []}
                keyExtractor={item => item._id}
                horizontal
                contentContainerStyle={{paddingLeft: wp(5)}}
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
                    No transport options available
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
    backgroundColor: '#007AFF',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    minWidth: wp(25),
    alignItems: 'center'
  },
  paginationButtonDisabled: {
    backgroundColor: '#333',
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
  }
})
