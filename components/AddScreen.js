import { View, Text, ScrollView } from "react-native";
import React from "react";
import {ImageBackground, View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { useSafeAreaInsets,} from 'react-native-safe-area-context';
import WorkoutForm from "./WorkoutForm";
import styles from "../styles/Styles";
import backgroundImage from '../assets/background.jpg';

const AddScreenTheme = {
    //color:'#ffffff',
    //borderColor:"#ffffff"
};



 const AddScreen = () => {
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const saveData = async (value) => {
        try {
            await AsyncStorage.setItem("test", JSON.stringify(value));
            alert("Data successfully saved")
          } catch (error) {
            console.log(error);
            alert("Something went wrong")
          }
        };

const AddScreen = () => {
    const [parsed, setParsed] = useState([]);

    const getWorkouts = async () => {
        try {
          const workouts = await AsyncStorage.getItem('workouts');
          if (workouts !== null) {
            let parsed  = JSON.parse(workouts);
            console.log(parsed)
            setParsed(parsed);
            return JSON.parse(workouts);
          }
        } catch (error) {
          console.error(error);
        }
        return [];
      };
    
    const clearWorkouts = async() => {
        AsyncStorage.clear();
    }

    const insets = useSafeAreaInsets();
    return (
        <View style={styles.AddScreenContainer}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

             <Text style={styles.headerStyle}>ADD EXERCISE</Text>
            <View>
                <TextInput
                    style={styles.TextInput} textAlign={'center'} placeholder="#"  
                    onChangeText={text => setValue(text)}
                    value={value}
                />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                
                <Button title="Save" onPress={() => {buttonPressed()}}/>
                <Text style={styles.savedText}>{text}</Text>
            </View>
        </ImageBackground>
        </View>
    )

    
 }


 export {AddScreen}