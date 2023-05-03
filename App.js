import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { ProfileStack } from './components/ProfileStack';
import { HomeStack } from './components/HomeStack';
import { AddStack } from './components/AddStack';
import { useFonts } from 'expo-font';
import styles from './styles/Styles';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
  <SafeAreaProvider>
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
    </SafeAreaProvider>
  
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
    <SafeAreaProvider>

    return null;
    </SafeAreaProvider>
  }

  return (
    
    <View style={styles.container}>
      <Nav/>
    </View>
  );
}





