import { ImageBackground, View, Text, Image } from "react-native";
import React, { Component } from 'react';
import styles from '../styles/Styles';
import backgroundImage from '../assets/background.jpg';


 const HomeScreen = () => {
    return (
        <View style={styles.container}>
         <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Text style={styles.headerStyle}>Gym app</Text>
                <View style={[{flex: 1}, styles.elementsContainer]}>
                    <View style={{flex: 2, backgroundColor: '#647AA3', borderRadius: 25, marginBottom:15 }}>
                        <Image 
                            source={require('../assets/boxikuva1.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} 
                            /> 
                            <View style={styles.imageText}>
                                <Text style={{color: 'white'}}>Tähän kalenteri?</Text>
                            </View>
                    </View>
                    <View style={{flex: 2, backgroundColor: '#334195', borderRadius: 25, marginBottom:15}}>
                        <Image 
                            source={require('../assets/boxikuva2.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} /> 
                    </View>
                    <View style={{flex: 2, backgroundColor: '#334195', borderRadius: 25}}>
                        <Image 
                            source={require('../assets/boxikuva3.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} /> 
                    </View>            
                </View>
        </ImageBackground>

      </View>
    );
 }

 export {HomeScreen}