import React from "react";
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView, } from "react-native";
import styles from '../styles/Styles';
import { useState } from "react";


 const ProfileScreen = () => {
    const [flexDirection, setflexDirection] = useState('column');

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <Text style={styles.headerStyle}>PROFILE</Text>
                <View>
                    {/* <WeightGraph /> */}
                    {/* <ScrollableGraph /> */}
                </View>
                <View
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
            </ImageBackground>
        </View>
    );
    

 }
export {ProfileScreen}