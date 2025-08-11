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
import {trips} from '../data/trips'
import TripCard from '../components/Trips/TripCard'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {RFValue} from 'react-native-responsive-fontsize'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import TransportCard from '../components/Trips/TransportCard'
import {transport} from '../data/transport'

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
        <View>
          <Text style={styles.sectionTitle}>{t('recommended_transport')}</Text>
          <FlatList
            data={transport}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{paddingLeft: wp(5)}}
            renderItem={({item}) => (
              <TransportCard
                onPress={() =>
                  navigation.navigate('TripDetails', {id: item.id})
                }
                image={item.image}
                title={item.title}
                category={item.category}
                price={item.price}
                delay={item.delay}
              />
            )}
          />
        </View>
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
  }
})
