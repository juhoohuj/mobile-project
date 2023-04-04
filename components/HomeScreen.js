import { View, Text, Image } from "react-native";
import React, { Component } from 'react';
import styles from '../styles/Styles';



 const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>Hi user</Text>
                <View style={[{flex: 1}, styles.elementsContainer]}>
                    <View style={{flex: 3, backgroundColor: '#647AA3', borderRadius: 25 }}>
                        <Image 
                            source={require('../assets/boxikuva1.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} />              
                    </View>
                    <View style={{flex: 3, backgroundColor: '#334195', borderRadius: 25}}>
                        <Image 
                            source={require('../assets/boxikuva2.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} /> 
                    </View>
                    <View style={{flex: 3, backgroundColor: '#334195', borderRadius: 25}}>
                        <Image 
                            source={require('../assets/boxikuva3.jpg')}
                            style={styles.imageStyle} 
                            resizeMode='cover'
                            borderRadius={40} /> 
                    </View>            
                </View>
      </View>
    );
 }

 export {HomeScreen}