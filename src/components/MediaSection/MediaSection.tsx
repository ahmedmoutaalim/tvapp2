import React, {useRef, useState} from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Video from 'react-native-video'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

const MediaSection = () => {
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(true)
  const [progress, setProgress] = useState(0)

  const onProgress = (data: any) => {
    if (data.seekableDuration > 0) {
      setProgress(data.currentTime / data.seekableDuration)
    }
  }

  return (
    <View style={styles.mediaSection}>
      {/* Main Video */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
          style={styles.video}
          paused={paused}
          resizeMode="cover"
          onProgress={onProgress}
        />

        {/* Play Button */}
        {paused && (
          <TouchableOpacity
            activeOpacity={1}
            focusable={true}
            hasTVPreferredFocus={true}
            onPress={() => setPaused(false)}
            style={styles.playButtonWrapper}>
            <View style={styles.playCircle}>
              <Icon name="play" size={40} color="#fff" />
            </View>
          </TouchableOpacity>
        )}

        {/* Gradient with Title + Progress */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}>
          <Text style={styles.videoTitle}>Agafay Desert Adventure</Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, {width: `${progress * 100}%`}]}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Side Images */}
      <View style={styles.sideImages}>
        {[
          require('../../assets/images/trip/trip2.jpg'),
          require('../../assets/images/trip/trip3.jpg')
        ].map((src, index) => (
          <TouchableOpacity
            key={index}
            focusable={true}
            style={styles.sideImageWrapper}>
            <Image source={src} style={styles.sideImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default MediaSection

const styles = StyleSheet.create({
  mediaSection: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden'
  },
  videoContainer: {
    width: '65%',
    height: 220,
    backgroundColor: '#000',
    position: 'relative'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  playButtonWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -35}, {translateY: -35}],
    zIndex: 10,
    // Focus styles handled automatically by React Native TV
    borderWidth: 0,
    borderRadius: 40
    // TV focus will automatically apply scaling and border
  },
  playCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  videoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6
  },
  progressBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#555',
    borderRadius: 2
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2
  },
  sideImages: {
    width: '35%',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  sideImageWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    // Focus styles handled automatically by React Native TV
    borderWidth: 0
  },
  sideImage: {
    width: '100%',
    height: 105
  }
})
