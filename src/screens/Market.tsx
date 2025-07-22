import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import { categories, products } from '../data/products'; // assume tu exportes les arrays depuis un fichier `data.ts`

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const getProducts = (categoryName: string) => {
    const cat = products.find((c) => c.category === categoryName);
    return cat ? cat.products : [];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>marché</Text>
        <Text style={styles.description}>
          Faites vos achats sans quitter votre chambre. Produits d’hygiène, accessoires, snacks et bien plus, livrés rapidement à votre porte.
        </Text>
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Parcourir les catégories</Text>

        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              style={({ focused }) => [
                styles.categoryItem,
                focused && styles.focused,
                selectedCategory === item && styles.selected,
              ]}
              hasTVPreferredFocus={selectedCategory === item}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryLabel}>{item}</Text>
            </Pressable>
          )}
        />

        <Text style={styles.sectionTitle}>{selectedCategory}</Text>

        <FlatList
          data={getProducts(selectedCategory)}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.productsList}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price} MAD</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Market;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: '40%',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
  },
  categoriesList: {
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  focused: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#00bcd4',
    borderRadius: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 5,
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  productsList: {
    paddingVertical: 20,
  },
  productCard: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 120,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productTitle: {
    color: '#fff',
    fontSize: 14,
  },
  productPrice: {
    color: '#ccc',
    fontSize: 12,
  },
});
