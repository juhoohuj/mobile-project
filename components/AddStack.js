import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {WorkoutList} from "./WorkoutTemplates";
import {WorkoutForm} from "./WorkoutForm";
import { AddScreen } from "./AddScreen";

const Stack = createNativeStackNavigator();

function AddStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddScreen" component={AddScreen} options={{headerShown: false}}/>
            <Stack.Screen name="WorkoutForm" component={WorkoutForm} options={{headerShown: false}}/>
            <Stack.Screen name="WorkoutTemplates" component={WorkoutList} />
        </Stack.Navigator>
    );
  }
  
export {AddStack}