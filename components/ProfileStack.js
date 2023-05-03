import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GraphsScreen } from './GraphsScreen'
import { ProfileScreen } from "./ProfileScreen";
import { CreateGraphScreen } from "./CreateGraphScreen";
import { AddScreen } from "./AddScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        

        <Stack.Navigator
        screenOptions={{
            headerShown: false,}}
  >
            <Stack.Screen name="MainProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="Graphs" component={GraphsScreen} 
          />
            <Stack.Screen name="CreateGraphs" component={CreateGraphScreen} 
             />
            <Stack.Screen name="AddScreen" component={AddScreen} />
        </Stack.Navigator>
    );
  }
  
export {ProfileStack}