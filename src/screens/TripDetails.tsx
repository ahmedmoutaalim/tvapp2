import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import {useRoute} from '@react-navigation/native'
import HeadTitle from '../components/HeadTitle/HeadTitle'
import {useTranslation} from 'react-i18next'

const TripDetails = () => {
  const {t} = useTranslation()
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
      <View style={styles.mediaSection}>
        <Image
          source={{uri: 'https://example.com/quad.jpg'}}
          style={styles.mainImage}
        />
        <View style={styles.sideImages}>
          <Image
            source={{uri: 'https://example.com/desert1.jpg'}}
            style={styles.sideImage}
          />
          <Image
            source={{uri: 'https://example.com/desert2.jpg'}}
            style={styles.sideImage}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>À propos</Text>
      <Text style={styles.description}>
        Découvrez tout ce que le désert d’Agafay a à offrir en seulement une
        demi-journée avec cette excursion de groupe...
      </Text>
      <View style={styles.bookingBox}>
        <Text style={styles.price}>À partir de 300 MAD</Text>
        <Text style={styles.perAdult}>par adulte</Text>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Réserver maintenant</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Expériences similaires</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            source={{uri: 'https://example.com/card1.jpg'}}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Dîner spectacle...</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={{uri: 'https://example.com/card2.jpg'}}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Forfait désert...</Text>
        </View>
      </ScrollView>
    </ScrollView>
  )
}

export default TripDetails

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15},
  dateText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10
  },
  title: {color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15},
  mediaSection: {flexDirection: 'row', marginBottom: 20},
  mainImage: {width: '65%', height: 200, borderRadius: 10},
  sideImages: {width: '35%', justifyContent: 'space-between', marginLeft: 10},
  sideImage: {width: '100%', height: 95, borderRadius: 10},
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  description: {color: '#ccc', fontSize: 14, lineHeight: 20},
  bookingBox: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20
  },
  price: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  perAdult: {color: '#ccc', fontSize: 14, marginBottom: 10},
  bookBtn: {backgroundColor: '#34d399', padding: 12, borderRadius: 8},
  bookBtnText: {color: '#000', fontWeight: 'bold', textAlign: 'center'},
  card: {width: 150, marginRight: 10},
  cardImage: {width: '100%', height: 100, borderRadius: 8},
  cardText: {color: '#fff', fontSize: 14, marginTop: 5}
})
