import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreen } from './components/HomeScreen';
import { AddScreen } from './components/AddScreen';
import { ProfileStack } from './components/ProfileStack';
import { ProfileScreen } from './components/ProfileScreen';
import React from 'react';


const MyTheme = {
    ...DefaultTheme,
    //colors: {
    //  ...DefaultTheme.colors,
    //  background:'#647AA3'
    //},
  };


const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ()=> <AntDesign name="home" size={24} color="black" />}} />
        <Tab.Screen name="Add" component={AddScreen} options={{tabBarIcon: ()=> <AntDesign name="plus" size={24} color="black" />}} />
        <Tab.Screen name="Profile" component={ProfileStack} options={{tabBarIcon: ()=> <AntDesign name="areachart" size={24} color="black" />}}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <View style={styles.container}>
      <Nav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


