import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { Button } from '@rneui/base';
import WorkoutForm from "./WorkoutForm";
import { useNavigation } from "@react-navigation/native";
import WorkoutTemplates, { WorkoutList } from "./WorkoutTemplates";
import Styles from "../styles/Styles";

const AddScreenTheme = {
    //color:'#ffffff',
    //borderColor:"#ffffff"
};


 const AddScreen = () => {
    const [value, setValue] = useState("");
    const navigation = useNavigation();
    

    const getWorkouts = async () => {
        try {
          const workouts = await AsyncStorage.getItem('workouts');
          if (workouts !== null) {
            const parsed = JSON.parse(workouts)
            console.log(workouts)
            return JSON.parse(workouts);
          }
        } catch (error) {
          console.error(error);
        }
        return [];
      };

    const saveData = async (value) => {
        try {
            await AsyncStorage.setItem("test", JSON.stringify(value));
            alert("Data successfully saved")
          } catch (error) {
            console.log(error);
            alert("Something went wrong")
          }
        };

    const getData = async () => {
        try {
            const savedData = await AsyncStorage.getItem("test");
            const currentData = JSON.parse(savedData);
            console.log(currentData);
            setText(currentData);

        } catch (error) {
            console.log(error);
        }
        };

    function buttonPressed() {
        saveData(value);
        getData();  
    }


    return (
        <SafeAreaView style={Styles.AddScreenContainer}>
            <View>
                <Text style={Styles.AddScreenText}>Manage workouts</Text>
            </View>
            <View>
                <TouchableOpacity style={Styles.AddScreenButton} onPress={() => navigation.navigate("WorkoutForm")}>
                    <Text style={Styles.AddScreenButton}>Create new workout</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={Styles.AddScreenText}>Templates</Text>
                <WorkoutList />
            </View>
        </SafeAreaView>
    )

    
 }


 export {AddScreen}