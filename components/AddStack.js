import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {WorkoutTemplates} from "./WorkoutTemplates";
import {WorkoutForm} from "./WorkoutForm";
import { AddScreen } from "./AddScreen";

const Stack = createNativeStackNavigator();

function AddStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddScreen" component={AddScreen} options={{headerShown: false}}/>
            <Stack.Screen name="WorkoutForm" component={WorkoutForm} options={{headerShown: false}}/>
            <Stack.Screen name="WorkoutTemplates" component={WorkoutTemplates} />
        </Stack.Navigator>
    );
  }
  
export {AddStack}