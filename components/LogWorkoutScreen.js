import React from "react";
import { ImageBackground, Text, View, SafeAreaView } from "react-native";
import backgroundImage from '../assets/background.jpg';
import styles from "../styles/Styles";
import HomeScreenWorkouts from "./HomeScreenWorkouts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LogWorkoutScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const insets = useSafeAreaInsets();


    return (
      <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <Text style={styles.headerStyle}>LOG WORKOUT</Text>
          <HomeScreenWorkouts />
          {/* <WorkoutCalendar /> */}
        </ImageBackground>
      </SafeAreaView>
    )
 }


export {LogWorkoutScreen}