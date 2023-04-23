import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";
import HomeScreenWorkouts from "./HomeScreenWorkouts";
import WorkoutCalendar from "./Calendar";

const LogWorkoutScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <HomeScreenWorkouts />
        {/* <WorkoutCalendar /> */}
      </View>
    )
 }


export {LogWorkoutScreen}