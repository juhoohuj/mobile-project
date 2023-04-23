import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";
import WorkoutCalendar from "./Calendar";

const CalendarScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <WorkoutCalendar />
        {/* <Text>asdadsads</Text> */}
      </View>
    )
 }


export {CalendarScreen}