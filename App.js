import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreen } from './components/HomeScreen';
import { AddScreen } from './components/AddScreen';
import { ProfileStack } from './components/ProfileStack';
import { HomeStack } from './components/HomeStack';
import { ProfileScreen } from './components/ProfileScreen';
import { AddStack } from './components/AddStack';
import { useFonts } from 'expo-font';
import styles from './styles/Styles';
import React from 'react';


const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#191D32',
          borderTopWidth: 0
        }
      }}>
        <Tab.Screen name="Home" component={HomeStack} options={{tabBarIcon: ()=> <AntDesign name="home" size={24} color="#f3f3f3" />}} />
        <Tab.Screen name="Templates" component={AddStack} options={{tabBarIcon: ()=> <AntDesign name="plus" size={24} color="#f3f3f3" />}} />
        <Tab.Screen name="Profile" component={ProfileStack} options={{tabBarIcon: ()=> <AntDesign name="areachart" size={24} color="#f3f3f3" />}}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': require('./assets/Fonts/RobotoCondensed-BoldItalic.ttf'),
    'RobotoCondensed-Regular' : require('./assets/Fonts/RobotoCondensed-Regular.ttf'),
    'RobotoCondensed-BoldItalic' : require('./assets/Fonts/RobotoCondensed-BoldItalic.ttf'),
    'RobotoCondensed-Light' : require('./assets/Fonts/RobotoCondensed-Light.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Nav/>
    </View>
  );
}





