import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  NativeModules
} from 'react-native';



const {InstalledApps} = NativeModules;

const AppsList = () => {
const [apps, setApps] = React.useState([]);
  const [scales, setScales] = React.useState<Animated.Value[]>([]);
    

  const onPressIn = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1.1,
      useNativeDriver: true,
      friction: 5,
      tension: 150,
    }).start();
  };

  const onPressOut = (index: number) => {
    Animated.spring(scales[index], {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 150,
    }).start();
  };


  useEffect(() => {
    InstalledApps.getInstalledApps()
      .then((appsList :any) => {
        console.log('Installed Apps:', appsList);
        setApps(appsList);
      })
      .catch((e :any) => console.error(e));
  }, []);

  const lunchApp = (packageName: string) => {
    InstalledApps.launchApp(packageName)
      .then(() => console.log(`App ${packageName} launched successfully`))
        .catch((e: any) => console.error(`Failed to launch app ${packageName}:`, e));
    };



  useEffect(() => {
  setScales(apps.map(() => new Animated.Value(1)));
}, [apps]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apps</Text>

      {apps.length > 0 && scales.length === apps.length && <FlatList
        data={apps}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.packageName}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback
            onPressIn={() => {onPressIn(index) ; lunchApp(item.packageName)}}
            onPressOut={() => onPressOut(index)}
          >
            <Animated.View
              style={[
                styles.appCard,
                { transform: [{ scale: scales[index] }] },
              ]}
            >
              <Image
                source={{ uri: `data:image/png;base64,${item.iconBase64}` }}
                style={styles.appIcon}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
      /> }
      
    </View>
  );
};

export default AppsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 20,
    maxHeight: 140, 
  },
  listContainer: {
    paddingLeft: 4,
  },
  appCard: {
    width: 150,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  appIcon: {
    width: '100%',
    height: '100%',
    marginBottom: 8,
  },
  
});
