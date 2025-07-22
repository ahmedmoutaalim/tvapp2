import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './src/components/layout/Navbar/Navbar';
import Sidebar from './src/components/layout/Sidebar/Sidebar';
import Footer from './src/components/layout/Footer/Footer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ImageBackground
        source={require('./src/assets/images/bghotel.jpg')}
        style={styles.bg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.46)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Navbar />
          <View style={styles.content}>
            <Sidebar />
            <Stack.Navigator screenOptions={{ headerShown: false , contentStyle: { backgroundColor: 'transparent' } }} >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Market" component={require('./src/screens/Market').default} />
              

              
            
            </Stack.Navigator>
          </View>
        </LinearGradient>
        <Footer />
      </ImageBackground>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
});
