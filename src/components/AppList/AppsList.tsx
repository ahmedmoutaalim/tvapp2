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

const {InstalledApps} = NativeModules

const AppsList = () => {
  const {t} = useTranslation()
  const [apps, setApps] = useState([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  useEffect(() => {
    InstalledApps.getInstalledApps()
      .then((appsList: any) => {
        console.log('Installed Apps:', appsList)
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
    marginTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12
  },
  list: {
    maxHeight: 140
  },
  listContainer: {
    paddingLeft: 4,
    paddingRight: 4
  },
  appCard: {
    width: 150,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  appCardFocused: {
    borderColor: '#fff'
  },
  appIcon: {
    width: '100%',
    height: '100%'
  }
})
