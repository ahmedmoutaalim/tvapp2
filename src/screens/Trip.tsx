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

const filterOptions = [
  {
    id: 1,
    title: 'Privé et de luxe',
    icon: <FAIcon name="star" size={22} color="#fff" />
  },
  {
    id: 2,
    title: 'Circuits en 4x4',
    icon: <FAIcon name="compass" size={22} color="#fff" />
  },
  {
    id: 3,
    title: 'Circuits d’une demi-journée',
    icon: <FAIcon name="book-open" size={22} color="#fff" />
  },
  {
    id: 4,
    title: "Excursions d'une journée",
    icon: <FAIcon name="utensils" size={22} color="#fff" />
  }
]

const Trip = () => {
  return (
    <View>
      <View style={styles.header}>
        <HeadTitle
          title="Découvrez Marrakech et ses merveilles"
          description={`Explorez la ville rouge et ses alentours : désert, montagnes, villages berbères, activités culturelles et aventures inoubliables. Réservez facilement vos excursions depuis notre application.`}
          customStyles={{
            header: {width: '70%'}
          }}
        />
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={filterOptions}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={{paddingVertical: 20}}
          renderItem={({item}) => (
            <Button
              variant="outline"
              title={item.title}
              icon={item.icon}
              style={{
                marginRight: 10
              }}
            />
          )}
        />
      </View>
      <ScrollView>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: 'white',
              marginVertical: 12,
              paddingHorizontal: 20
            }}>
            Recommandé pour vous
          </Text>
          <FlatList
            data={trips}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{paddingLeft: 20}}
            renderItem={({item}) => (
              <TripCard
                image={item.image}
                title={item.title}
                category={item.category}
                price={item.price}
                type={item.type}
              />
            )}
          />
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: 'white',
              marginBottom: 12
            }}>
            Tous les circuits
          </Text>
          <FlatList
            data={trips}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{paddingLeft: 20}}
            renderItem={({item}) => (
              <TripCard
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
    </View>
  )
}

export default Trip

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 10
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#D9D9D980',
    borderRadius: '100%',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
