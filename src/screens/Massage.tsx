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
import Button from '../components/Button/Button'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {getMassageData} from '../services/massage'
import MassageCard from '../components/Massage/MassageCard'

const Massage = ({navigation}: any) => {
  const {t} = useTranslation()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  )

  const {
    data: massageResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['MASSAGE_KEY'],
    queryFn: getMassageData
  })

  console.log('MassageData:', massageResponse)

  // Extract unique specialties from massage items
  const specialties = React.useMemo(() => {
    const massageItems = massageResponse?.massageItems || []

    if (!massageItems || massageItems.length === 0) return []

    const uniqueSpecialties = new Map()
    massageItems.forEach((item: any) => {
      if (item.specialty && !uniqueSpecialties.has(item.specialty)) {
        uniqueSpecialties.set(item.specialty, item.specialty)
      }
    })

    return Array.from(uniqueSpecialties.values())
  }, [massageResponse])

  // Filter massages by selected specialty
  const filteredMassages = React.useMemo(() => {
    const massageItems = massageResponse?.massageItems || []

    if (!massageItems || massageItems.length === 0) return []

    if (!selectedSpecialty) {
      return massageItems
    }

    return massageItems.filter(
      (item: any) => item.specialty === selectedSpecialty
    )
  }, [massageResponse, selectedSpecialty])

  console.log('Specialties:', specialties)
  console.log('Filtered Massages:', filteredMassages)

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
          {t('error_loading_massages') || 'Error loading massages'}
        </Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1, paddingBottom: hp(2)}}>
      <View style={styles.header}>
        <HeadTitle
          title={t('massage_at_home')}
          description={t('massage_description')}
          customStyles={{
            header: {width: wp('70%')}
          }}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Specialty Filter Buttons */}
      <View style={{paddingHorizontal: wp(3)}}>
        <FlatList
          data={['all', ...specialties]}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: hp(1)}}
          renderItem={({item}) => (
            <Button
              variant={
                (item === 'all' && !selectedSpecialty) ||
                item === selectedSpecialty
                  ? 'primary'
                  : 'outline'
              }
              title={item === 'all' ? t('all') || 'All' : item}
              onPress={() => setSelectedSpecialty(item === 'all' ? null : item)}
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

          {filteredMassages.length > 0 ? (
            <FlatList
              data={filteredMassages}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: wp(5)}}
              renderItem={({item}) => (
                <MassageCard
                  onPress={() =>
                    navigation.navigate('MassageDetails', {id: item._id})
                  }
                  image={item.image}
                  title={item.name}
                  specialty={item.specialty}
                  massageId={item._id}
                />
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t('no_massages_found') || 'No massages found'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Massage

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
