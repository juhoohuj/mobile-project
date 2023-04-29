import { ImageBackground, View, Text, Image, TouchableOpacity } from "react-native";
import React, { Component, useState, useEffect } from 'react';
import styles from '../styles/Styles';
import backgroundImage from '../assets/background.jpg';
import { useSafeAreaInsets,} from 'react-native-safe-area-context';
import { CalendarScreen } from "./CalendarScreen";
// import HomeScreenWorkouts from "./HomeScreenWorkouts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getWorkoutHistory from "../components/HomeScreenWorkouts"
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-web";
const HomeScreen = ({navigation}) => {



  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    getWorkoutHistory();
  }, []);
  
  const getWorkoutHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@WorkoutHistory');
      console.log('Retrieved workout history data:', jsonValue);
      const historyData = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log('Parsed workout history data:', historyData);
      setWorkoutHistory(historyData);
      console.log('Updated workout history state:', workoutHistory);
    } catch (error) {
      console.error('Error retrieving workout history:', error);
    }
  };

const insets = useSafeAreaInsets();
return (
    <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <Text style={styles.headerStyle}>GYM APP</Text>




        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10 }}>
        <CalendarScreen navigation={Calendar}></CalendarScreen>
       {/*  <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}
        >
           <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva1.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.imageText}>Kalenteri?</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>  */}
        </View>

        <View style={{marginRight: 20, marginLeft: 20, marginBottom: 10}}>
        <TouchableOpacity
        onPress={() => navigation.navigate('LogWorkoutScreen')}
        >
                <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva2.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.imageText}>Log workout</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

  {/*       <View style={{marginRight: 20, marginLeft: 20}}>
        <TouchableOpacity>
                <ImageBackground style={{borderRadius: 20, overflow: "hidden"}} source={require('../assets/boxikuva3.jpg')}>
                    <View style={{height: 180, alignItems: "center", justifyContent: "center"}}>
                    <Text>Workout History:</Text>
      {workoutHistory.map((workout, index) => (
        <ScrollView key={index}>{workout.name} - {workout.date}</ScrollView>

      ))}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

 */}
<ScrollView contentContainerStyle={styles.workoutHistoryContainer}>
  {workoutHistory.slice(-3).map((workout, index) => (
    <View key={index} style={styles.workoutBox}>
      <Text style={styles.workoutName}>{workout.name}</Text>
      <Text style={styles.workoutDate}>{workout.date}</Text>
      {workout.moves.map((move, moveIndex) => (
        <View key={moveIndex} style={styles.moveContainer}>
          <Text style={styles.moveName}>{move.name}</Text>
          {move.sets.map((set, setIndex) => (
            <Text key={setIndex} style={styles.setText}>
              Exercise: {move.name} - Set {setIndex + 1}: Weight - {set.weight}, Reps - {set.reps}
            </Text>
          ))}
        </View>
      ))}
    </View>
  ))}
</ScrollView>



        </ImageBackground>
    </View>


    // <View style={[styles.container, {paddingTop: insets.top}]}>
    // <HomeScreenWorkouts />
    // </View>


)
};

export default HomeScreen;