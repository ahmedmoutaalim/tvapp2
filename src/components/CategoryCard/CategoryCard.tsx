import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  View,
  findNodeHandle,
  Platform
} from 'react-native';

interface Props {
  item: string;
  autoFocus?: boolean; // 👈 جديد، باش نحدد واش هاد البطاقة خاصها تركز أولاً
  onPress: () => void;
}

const CategoryCard = ({ item, autoFocus, onPress }: Props) => {
  const ref = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus && ref.current && Platform.isTV) {
      // ⏱️ ندير focus بعد ما يدوز شوية الوقت باش يتأكد أنو ترندر
      setTimeout(() => {
        const node = findNodeHandle(ref.current);
        if (node) {
          ref.current.focus();
        }
      }, 300);
    }
  }, [autoFocus]);

  return (
    <Pressable
      ref={ref}
      focusable={true}
      isTVSelectable={true}
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.container,
        
      ]}
    >
      <Image
        source={require('../../assets/images/products/cat/cat1.jpg')}
        style={
            [
                styles.image , isFocused && styles.focused,
            ]
        }
      />
      <Text style={styles.label}>{item}</Text>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
    padding: 5,
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 116,
    marginBottom: 5,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  focused: {
    borderWidth: 4,
    borderColor: 'white',
  },
});
