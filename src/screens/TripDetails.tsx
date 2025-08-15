import React from 'react'
import {Text, View, Image, ScrollView, StyleSheet, FlatList} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import Icon from 'react-native-vector-icons/Ionicons'
import FatherIcon from 'react-native-vector-icons/Feather'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import HeadTitle from '../components/HeadTitle/HeadTitle'
import Button from '../components/Button/Button'
import {trips} from '../data/trips'
import TripCard from '../components/Trips/TripCard'
import BookingCard from '../components/BookingCard/BookingCard'
import MediaSection from '../components/MediaSection/MediaSection'

const TripDetails = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const {id} = route.params

  return (
    <ScrollView style={styles.container}>
      <HeadTitle
        customStyles={{header: {width: '100%'}}}
        title={t(
          'Dinner show in the Agafay desert with quad biking and camels'
        )}
      />

      <MediaSection />

      <View style={styles.bookingBox}>
        <View style={styles.info}>
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>{t('About')}</Text>
            <Text style={styles.aboutDescription}>
              {t(
                "Découvrez tout ce que le désert d'Agafay a à offrir en seulement une demi-journée avec cette excursion de groupe au départ de Marrakech. Quittez la ville et dirigez-vous vers le désert, où vous pourrez explorer les dunes en VTT et à dos de chameau, avec suffisamment de temps pour prendre des photos. Ensuite, détendez-vous au bord de la piscine jusqu'au dîner composé de plats marocains. Assistez à des concerts et à un spectacle de feu avant le retour en ville."
              )}
            </Text>
          </View>

          <View>
            <View style={styles.infoItem}>
              <FatherIcon name="users" size={20} color="#fff" />
              <Text style={styles.textInfoItem}>
                Âge 0-99, 30 pers. maximum par groupe
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="time-outline" size={20} color="#fff" />
              <Text style={styles.textInfoItem}>
                Horaire de début : vérifier la disponibilité
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="timer-outline" size={20} color="#fff" />
              <Text style={styles.textInfoItem}>Durée : 6 h</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="ticket-outline" size={20} color="#fff" />
              <Text style={styles.textInfoItem}>Billet mobile</Text>
            </View>
            <View style={styles.infoItem}>
              <AntDesignIcon name="global" size={20} color="#fff" />
              <Text style={styles.textInfoItem}>Guide : Anglais, Français</Text>
            </View>
          </View>
        </View>

        <BookingCard />
      </View>

      <View
        style={{
          marginTop: hp('10'),
          paddingBottom: hp('10')
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: hp('5'),
            color: '#fff'
          }}>
          {t('Expériences similaires')}
        </Text>
        <FlatList
          data={trips}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={({item}) => (
            <TripCard
              onPress={() => navigation.navigate('TripDetails', {id: item.id})}
              image={item.image}
              title={item.title}
              category={item.category}
              price={item.price}
              type={item.type}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}

export default TripDetails

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15},

  bookingBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  info: {flex: 1},
  about: {marginRight: 10, borderRadius: 10, marginBottom: hp('5')},
  aboutTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  aboutDescription: {fontWeight: '400', color: '#ccc', fontSize: 12},

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10
  },
  textInfoItem: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic'
  }
})
