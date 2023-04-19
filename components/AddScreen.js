import { View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { useSafeAreaInsets,} from 'react-native-safe-area-context';
import WorkoutForm from "./WorkoutForm";

const AddScreenTheme = {
    //color:'#ffffff',
    //borderColor:"#ffffff"
};


const getWorkouts = async () => {
    try {
      const workouts = await AsyncStorage.getItem('workouts');
      if (workouts !== null) {
        console.log(workouts);
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

const AddScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView style={{paddingTop: insets.top, }}>
            <View>
                <WorkoutForm/>
            </View>
            <View>
                <Button title="GET WORKOUTS" onPress={getWorkouts}/>  
                <Button title="Clear" onPress={clearWorkouts} />
            </View>
        </ScrollView>
    )

    
 }


 export {AddScreen}