import { SafeAreaView, ImageBackground, View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react';
import styles from '../styles/Styles';
import backgroundImage from '../assets/background.jpg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.headerStyle}>COLOSSUS</Text>
        
        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10, marginTop: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
            <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva1.jpg')}>
              <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.imageText}>Calendar</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity> 
        </View>

        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('LogWorkoutScreen')}>
            <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva2.jpg')}>
              <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.imageText}>Log workout</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{marginRight: 20, marginLeft: 20}}>
          <TouchableOpacity>
            <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva3.jpg')}>
              <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.imageText}>Jotain?</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        
      </ImageBackground>
    </SafeAreaView>
  );
};

export { HomeScreen };
