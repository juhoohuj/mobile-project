import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen'
import { LogWorkoutScreen } from "./LogWorkoutScreen";
import { CalendarScreen } from "./CalendarScreen";
import LogWorkoutForm from "./LogWorkoutForm";


const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LogWorkoutForm" component={LogWorkoutForm}
            options={{headerShown: false}} />
            <Stack.Screen name="LogWorkoutScreen" component={LogWorkoutScreen} 
             options={{headerShown: false}}/>
            <Stack.Screen name="CalendarScreen" component={CalendarScreen } 
             options={{headerShown: false}} />
        </Stack.Navigator>
    );
  }
  
export {HomeStack}