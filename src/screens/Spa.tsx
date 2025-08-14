import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'

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
import {transport} from '../data/transport'
import SpaCard from '../components/SpaCard/SpaCard'

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

const data = [
  {
    id: 1,
    title: 'Massage relaxant',
    price: '200',
    duration: '2 hours',
    image: require('../assets/images/massage/massage1.jpg'),
    category: 'Relaxation'
  },
  {
    id: 2,
    title: 'Massage suédois',
    price: '250',
    duration: '1.5 hours',
    image: require('../assets/images/massage/massage2.jpg'),
    category: 'Therapeutic'
  },
  {
    id: 3,
    title: 'Massage tonique',
    price: '300',
    duration: '1 hour',
    image: require('../assets/images/massage/massage1.jpg'),
    category: 'Energizing'
  },
  {
    id: 4,
    title: 'Massage oriental',
    price: '220',
    duration: '2.5 hours',
    image: require('../assets/images/massage/massage2.jpg'),
    category: 'Cultural'
  },
  {
    id: 5,
    title: 'Massage aux huiles essentielles',
    price: '280',
    duration: '1.5 hours',
    image: require('../assets/images/massage/massage1.jpg'),
    category: 'Aromatherapy'
  }
]

const Spa = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
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
        <View>
          <Text style={styles.sectionTitle}>{t('recommended_for_you')}</Text>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{paddingLeft: wp(5)}}
            renderItem={({item}) => (
              <SpaCard
                onPress={() =>
                  navigation.navigate('TripDetails', {id: item.id})
                }
                image={item.image}
                title={item.title}
                category={item.category}
                price={item.price}
                duration={item.duration}
              />
            )}
          />
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
  }
})
