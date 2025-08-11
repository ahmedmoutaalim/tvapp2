import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  NativeModules
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const {InstalledApps} = NativeModules

const AppsList = () => {
  const {t} = useTranslation()
  const [apps, setApps] = useState([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    InstalledApps.getInstalledApps()
      .then((appsList: any) => {
        setApps(appsList)
      })
      .catch((e: any) => console.error(e))
  }, [])

  const launchApp = (packageName: string) => {
    InstalledApps.launchApp(packageName)
      .then(() => console.log(`App ${packageName} launched successfully`))
      .catch((e: any) =>
        console.error(`Failed to launch app ${packageName}:`, e)
      )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('apps')}</Text>

      {apps.length > 0 && (
        <FlatList
          data={apps}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.packageName}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setFocusedIndex(index)
                launchApp(item.packageName)
              }}
              style={[
                styles.appCard,
                focusedIndex === index && styles.appCardFocused
              ]}>
              <Image
                source={
                  item.appName === 'YouTube'
                    ? require('../../assets/icons/apps/youtube.png')
                    : {uri: `data:image/png;base64,${item.iconBase64}`}
                }
                style={styles.appIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

export default AppsList

const styles = StyleSheet.create({
  container: {
    marginTop: hp('4%'),
    paddingBottom: hp('3%')
  },
  title: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: '700',
    marginBottom: hp('2%')
  },
  list: {
    maxHeight: hp('20%')
  },
  listContainer: {
    paddingLeft: wp('1%'),
    paddingRight: wp('1%')
  },
  appCard: {
    width: wp('18%'),
    height: hp('16%'),
    backgroundColor: '#fff',
    borderRadius: wp('0.8%'),
    marginRight: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  appCardFocused: {
    borderColor: '#fff',
    transform: [{scale: 1.05}]
  },
  appIcon: {
    width: '90%',
    height: '90%'
  }
})
