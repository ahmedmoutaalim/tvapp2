import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const icons = [
  'search',
  'home',
  'grid',
  'play',
  'heart',
  'user',
];

const Sidebar = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const animations = useRef(icons.map(() => new Animated.Value(1))).current;

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    Animated.spring(animations[index], {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setFocusedIndex(null);
  };

  const handlePress = (index: number) => {
    Animated.sequence([
      Animated.spring(animations[index], {
        toValue: 0.8,
        useNativeDriver: true,
      }),
      Animated.spring(animations[index], {
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.spring(animations[index], {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {icons.map((iconName, index) => (
        <TouchableOpacity
          key={iconName}
          style={[
            styles.iconContainer,
            focusedIndex === index && styles.focusedIcon,
          ]}
          activeOpacity={0.8}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onPress={() => handlePress(index)}
        >
          <Animated.View style={{ transform: [{ scale: animations[index] }] }}>
            <Icon
              name={iconName}
              size={24}
              color="#fff"
            />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    width: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIcon: {
    backgroundColor: 'rgba(200,200,200,0.3)',
  },
});
