import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../styles/Styles";
import WorkoutCalendar from "./Calendar";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const CalendarScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <Text style={styles.headerStyle}>CALENDAR</Text>
        <WorkoutCalendar />
      </View>
    </SafeAreaView>
  );
};


export {CalendarScreen}