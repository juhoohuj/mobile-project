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

const deleteWorkouts = async () => {
    try {
        await AsyncStorage.removeItem('workouts');
        alert("Data successfully deleted")
    } catch (error) {
        console.log(error);
        alert("Something went wrong")
    }
};



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
    const insets = useSafeAreaInsets();
    return (
    
        <ScrollView style={{paddingTop: insets.top, }}>
            <View  >
                <Text>{text}</Text>
            </View>
            <View>
                <WorkoutForm/>
            </View>
            <View>
                <Button title="GET WORKOUTS" onPress={getWorkouts}/>
                {/* <Button title="delete workouts" onPress={deleteWorkouts}/> */}
                
            </View>
        </ScrollView>
    )

    
 }


 export {AddScreen}