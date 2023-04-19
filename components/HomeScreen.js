import { ImageBackground, View, Text, Image } from "react-native";
import React, { Component } from 'react';
import styles from '../styles/Styles';
import backgroundImage from '../assets/background.jpg';

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Text style={styles.headerStyle}>GYM APP</Text>
          <View style={[{flex: 1}, styles.elementsContainer]}>
            <View style={{flex: 2, backgroundColor: '#191D32', borderRadius: 25, marginBottom:15 }}>
              <Image 
                source={require('../assets/boxikuva1.jpg')}
                style={styles.imageStyle} 
                resizeMode='cover'
                borderRadius={40} 
              /> 
              <View style={{position: 'absolute', zIndex: 1, top: 90, left: 50}}>
                <Text style={styles.imageText}>Tähän kalenteri?</Text>
              </View>
            </View>
            <View style={{flex: 2, backgroundColor: '#334195', borderRadius: 25, marginBottom:15}}>
              <Image 
                source={require('../assets/boxikuva2.jpg')}
                style={styles.imageStyle} 
                resizeMode='cover'
                borderRadius={40} 
              />
              <View style={{position: 'absolute', zIndex: 1, top: 90, left: 50}}>
                <Text style={styles.imageText}>Tähän historia?</Text>
              </View> 
            </View>
            <View style={{flex: 2, backgroundColor: '#334195', borderRadius: 25}}>
              <Image 
                source={require('../assets/boxikuva3.jpg')}
                style={styles.imageStyle} 
                resizeMode='cover'
                borderRadius={40}
              /> 
              <View style={{position: 'absolute', zIndex: 1, top: 90, left: 50}}>
                <Text style={styles.imageText}> Tähän jotain?</Text>
              </View>
            </View>            
          </View>
        </ImageBackground>
      </View>
    );
  }
  
 export {HomeScreen}