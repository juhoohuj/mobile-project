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
            <Stack.Screen name="LogWorkoutForm" component={LogWorkoutForm} />
            <Stack.Screen name="LogWorkoutScreen" component={LogWorkoutScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
    );
  }
  
export {HomeStack}