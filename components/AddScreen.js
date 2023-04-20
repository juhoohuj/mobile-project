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
        <ScrollView style={{paddingTop: insets.top, }}>
            <View>
                <WorkoutForm/>
            </View>
            <View>
                <Button title="GET WORKOUTS" onPress={getWorkouts}/>  
                <Button title="Clear" onPress={clearWorkouts} />
            </View>
            <View>
                {parsed.map( i =>  
                     <Text>{i.moves}</Text>
                )}
            </View>
        </ScrollView>
    )

    
 }


 export {AddScreen}