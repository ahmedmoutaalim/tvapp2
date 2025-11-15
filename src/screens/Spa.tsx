import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import Button from '../components/Button/Button'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import {useTranslation} from 'react-i18next'
import SpaCard from '../components/SpaCard/SpaCard'
import {useQuery} from '@tanstack/react-query'
import {getSpaData} from '../services/spa'

const filterOptions = [
  {
    id: 1,
    title: 'Hammam traditionnel'
  },
  {
    id: 2,
    title: 'Spa de luxe'
  },
  {
    id: 3,
    title: 'Spa médical'
  },
  {
    id: 4,
    title: 'Spa berbère'
  },
  {
    id: 5,
    title: 'Spa urbain'
  }
]

const Spa = ({navigation}: any) => {
  const {t} = useTranslation()

  const {
    data: spaResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['SPA_KEY'],
    queryFn: getSpaData
  })

  console.log('spaData:', spaResponse)

  // Get spa items from response
  const spaItems = React.useMemo(() => {
    return spaResponse?.spaItems || spaResponse?.spaItems || []
  }, [spaResponse])

  console.log('Spa Items:', spaItems)

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
          {t('error_loading_spa') || 'Error loading spa items'}
        </Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1, paddingBottom: hp(2)}}>
      <View style={styles.header}>
        <HeadTitle
          title={t('spa_&_wellness')}
          description={t('spa_description')}
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
          showsHorizontalScrollIndicator={false}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.sectionTitle}>{t('recommended_for_you')}</Text>

          {spaItems.length > 0 ? (
            <FlatList
              data={spaItems}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: wp(5)}}
              renderItem={({item}) => (
                <SpaCard
                  onPress={() =>
                    navigation.navigate('SpaDetails', {id: item._id})
                  }
                  image={item.image}
                  title={item.title}
                  spaId={item._id}
                />
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t('no_spa_services_found') || 'No spa services found'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Spa

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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: wp(3)
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16
  }
})
