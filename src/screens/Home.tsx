import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AppsList from '../components/AppList/AppsList';
import { useNavigation } from '@react-navigation/native';

const cardsData = [
  { title: 'Market', image: require('../assets/images/menu/food.jpg') },
  { title: 'Transport', image: require('../assets/images/menu/car.jpg') },
  { title: 'Excursion', image: require('../assets/images/menu/travel.jpg') },
  { title: 'Shopping', image: 'https://source.unsplash.com/400x300/?shopping' },
  { title: 'Entertainment', image: 'https://source.unsplash.com/400x300/?entertainment' },
  { title: 'Health', image: 'https://source.unsplash.com/400x300/?health' },
  { title: 'Culture', image: 'https://source.unsplash.com/400x300/?culture' },
  { title: 'Sports', image: 'https://source.unsplash.com/400x300/?sports' },
];

const CARD_WIDTH = 160;
const CARD_MARGIN = 16;
const VISIBLE_CARDS = 3;

const Home = () => {
  const navigation = useNavigation();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const scales = useRef(cardsData.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (focusedIndex === null) {
      Animated.stagger(
        50,
        scales.map((scale) =>
          Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else {
      scales.forEach((scale, index) => {
        Animated.timing(scale, {
          toValue: focusedIndex === index ? 1.1 : 0.9,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [focusedIndex, scales]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <View style={styles.leftSide}>
          <Text style={styles.welcomeText}>Bienvenue Tomas</Text>
          <TouchableOpacity style={styles.button}>
            <Icon name="play" size={16} color="#fff" />
            <Text style={styles.buttonText}>Découvrez-nous</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cardsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.cardsContainer}
          style={{
            width: VISIBLE_CARDS * (CARD_WIDTH + CARD_MARGIN) - CARD_MARGIN,
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.title)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              style={[styles.cardWrapper, focusedIndex === index && { zIndex: 10 }]}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [{ scale: scales[index] }],
                    borderRadius: 12,
                    overflow: 'hidden',
                    ...(focusedIndex === index
                      ? {
                          ...Platform.select({
                            ios: {
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 8 },
                              shadowOpacity: 0.3,
                              shadowRadius: 10,
                            },
                            android: {
                              elevation: 10,
                            },
                          }),
                        }
                      : {}),
                  },
                ]}
              >
                <Image
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                  style={styles.cardImage}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.overlay}
                />
                <Text style={styles.cardText}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </View>

      <AppsList />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSide: {
    flexShrink: 1,
    marginRight: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    gap: 8,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cardsContainer: {
    flexGrow: 0,
  },
  cardWrapper: {
    marginRight: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
