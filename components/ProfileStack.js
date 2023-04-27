import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GraphsScreen } from './GraphsScreen'
import { ProfileScreen } from "./ProfileScreen";
import { CreateGraphScreen } from "./CreateGraphScreen";


const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Graphs" component={GraphsScreen} />
            <Stack.Screen name="CreateGraphs" component={CreateGraphScreen} />
        </Stack.Navigator>
    );
  }
  
export {ProfileStack}