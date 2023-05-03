import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GraphsScreen } from './GraphsScreen'
import { ProfileScreen } from "./ProfileScreen";
import { CreateGraphScreen } from "./CreateGraphScreen";
import { AddScreen } from "./AddScreen";


const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Graphs" component={GraphsScreen} 
            options={{headerShown: false}}/>
            <Stack.Screen name="CreateGraphs" component={CreateGraphScreen} options={{headerShown: false}}
             />
            <Stack.Screen name="AddScreen" component={AddScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
  }
  
export {ProfileStack}