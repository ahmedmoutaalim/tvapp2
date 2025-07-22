import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const messages = [
  'Discover our offers',
  'Enjoy your stay',
  'Explore excursions',
  'Reserve transport',
  'Taste delicious food',
];

const Footer = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const totalWidth = width * 2; // يتحرك بمسافة ضعف الشاشة
    const animate = () => {
      translateX.setValue(0);
      Animated.timing(translateX, {
        toValue: -totalWidth,
        duration: 30000,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, [translateX]);

  const combinedMessages = messages.join(' • '); // نص موحد بفواصل صغيرة

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX }],
        }}>
        {/* نكرر النص مرتين لضمان الاستمرارية */}
        <Text style={styles.text}>
          {combinedMessages + '   '}
        </Text>
        <Text style={styles.text}>
          {combinedMessages + '   '}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 40,
    backgroundColor: 'rgba(37, 36, 36, 0.72)',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
});
