import { ImageBackground, View, Text, Image, TouchableOpacity } from "react-native";
import React, { Component } from 'react';
import styles from '../styles/Styles';
import backgroundImage from '../assets/background.jpg';
import { useSafeAreaInsets,} from 'react-native-safe-area-context';
import { CalendarScreen } from "./CalendarScreen";
// import HomeScreenWorkouts from "./HomeScreenWorkouts";

const HomeScreen = ({navigation}) => {

const insets = useSafeAreaInsets();
return (
    <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Text style={styles.headerStyle}>Colossus</Text>

        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10 }}>
        {/* <CalendarScreen></CalendarScreen> */}
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
           <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva1.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.imageText}>Calendar</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity> 
        </View>

        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('LogWorkoutScreen')}>
            
                <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva2.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.imageText}>Log workout</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

        <View style={{marginRight: 20, marginLeft: 20}}>
        <TouchableOpacity>
                <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva3.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.imageText}>Jotain?</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>



        </ImageBackground>
    </View>


    // <View style={[styles.container, {paddingTop: insets.top}]}>
    // <HomeScreenWorkouts />
    // </View>


)
};
  
 export {HomeScreen}