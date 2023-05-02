import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import uuid from 'react-native-uuid';



const WorkoutCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  // const workout = {key: 'workout', color: 'green'};


  useEffect(() => {
    AsyncStorage.getItem('@WorkoutHistory').then((value) => 
    {
      if(value) {
        const workoutHistory = JSON.parse(value)
        const newMarkedDates = {};
        workoutHistory.forEach((workout) => {
          const date = new Date(workout.date).toISOString().split('T')[0];
          newMarkedDates[date] = { marked: true };
        });
        setMarkedDates(newMarkedDates);
      }
    }
    ).catch((e) => console.log(e))

/*     async function getWorkoutHistory() {
      const workoutHistoryJSON = await AsyncStorage.getItem('@WorkoutHistory');
      const workoutHistory = JSON.parse(workoutHistoryJSON);

      const newMarkedDates = {};

      workoutHistory.forEach((workout) => {
        const date = new Date(workout.date).toISOString().split('T')[0];
        newMarkedDates[date] = { marked: true };
      });

      setMarkedDates(newMarkedDates);
    }

    getWorkoutHistory(); */
  }, []);

  const handleDayPress = (day) => {
    const selectedDay = day.dateString;
  
    async function getWorkoutsForSelectedDay() {
      const workoutHistoryJSON = await AsyncStorage.getItem('@WorkoutHistory');
      const workoutHistory = JSON.parse(workoutHistoryJSON);
  
      const workoutsForSelectedDay = workoutHistory.filter((workout) => {
        const workoutDate = new Date(workout.date).toISOString().split('T')[0];
        return workoutDate === selectedDay;
      });
  
      setSelectedDate(selectedDay);
      setSelectedWorkout(workoutsForSelectedDay);
    }
  
    getWorkoutsForSelectedDay();
  };

  return (
    <ScrollView>
      <Calendar
        style={styles.calendarBackground}
        theme={styles.calendarTheme}
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />
      {selectedWorkout && (
        <View style={[styles.container, { padding: 16 }]}>
          <Text style={styles.title}>Workout for {new Date(selectedDate).toLocaleDateString()}</Text>
          {selectedWorkout.map((workout) => (
            <View key={uuid.v4()}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              {/* <Text style={styles.subTitle}>Moves:</Text> */}
              {workout.moves.map((move, index) => (
                <View key={uuid.v4()}>
                  <Text style={styles.moveName}>{move.name}</Text>
                  <Text style={styles.setsTitle}>Sets:</Text>
                  {move.sets.map((set, index) => (
                    <View key={uuid.v4()} style={styles.setsContainer}>
                      <Text style={styles.setNumber}>Set {index + 1}:</Text>
                      <Text style={styles.weightAndReps}>Weight: {set.weight} Reps: {set.reps}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default WorkoutCalendar;