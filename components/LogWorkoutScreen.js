import React from "react";
import { ImageBackground, Text, View } from "react-native";
import backgroundImage from '../assets/background.jpg';
import styles from "../styles/Styles";
import HomeScreenWorkouts from "./HomeScreenWorkouts";


const LogWorkoutScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Text style={styles.headerStyle}>LOG WORKOUT</Text>
          <HomeScreenWorkouts />
          {/* <WorkoutCalendar /> */}
        </ImageBackground>
      </View>
    )
 }


export {LogWorkoutScreen}