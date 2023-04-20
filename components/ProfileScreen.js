import Card from "../components/Card";
import React from "react";
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView, } from "react-native";
import WeightGraph from "./WeightGraph";
import ScrollableGraph from "./ScrollableGraph";
import styles from '../styles/Styles';
import { useState } from "react";
import backgroundImage from '../assets/background.jpg';



 const ProfileScreen = () => {
    const [flexDirection, setflexDirection] = useState('column');


    return (
        
        <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
         <Text style={styles.headerStyle}>PROFILE</Text>
            <View>
            {/* <WeightGraph /> */}
            <ScrollableGraph />
            </View>
            <View
                label="flexDirection"
                values={['row']}
                selectedValue={flexDirection}
                setSelectedValue={setflexDirection}
                style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                >
                <View style={[styles.square, {fontFamily:'RobotoCondensed-Bold'}]}> 
                    <Text>GRAPHS</Text> 
                </View>
                <View style={[styles.square, {fontFamily:'RobotoCondensed-Bold'}]}> 
                    <Text> CALENDAR </Text> 
                </View>           
                </View>
            <View
                label="flexDirection"
                values={['row']}
                selectedValue={flexDirection}
                setSelectedValue={setflexDirection}
                style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                >
                <View style={[styles.square, {fontFamily:'RobotoCondensed-Bold'}]}> 
                    <Text>STATISTIC</Text> 
                </View>                
                <View style={[styles.square, {fontFamily:'RobotoCondensed-BoldItalic'}]}> 
                    <Text>HISTORY</Text> 
                </View>            
            </View>
    </ImageBackground>
     </View>
    );
 }
export {ProfileScreen}