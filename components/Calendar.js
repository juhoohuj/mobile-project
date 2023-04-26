import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WorkoutCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const workout = {key: 'workout', color: 'green'};

  useEffect(() => {
    async function getWorkoutHistory() {
      const workoutHistoryJSON = await AsyncStorage.getItem('@WorkoutHistory');
      const workoutHistory = JSON.parse(workoutHistoryJSON);

      const newMarkedDates = {};

      workoutHistory.forEach((workout) => {
        const date = new Date(workout.date).toISOString().split('T')[0];
        newMarkedDates[date] = { marked: true };
      });

      setMarkedDates(newMarkedDates);
    }

    getWorkoutHistory();
  }, []);

  const handleDayPress = (day) => {
    const selectedDay = day.dateString;

    async function getWorkoutForSelectedDay() {
      const workoutHistoryJSON = await AsyncStorage.getItem('@WorkoutHistory');
      const workoutHistory = JSON.parse(workoutHistoryJSON);

      const selectedWorkout = workoutHistory.find((workout) => {
        const workoutDate = new Date(workout.date).toISOString().split('T')[0];
        return workoutDate === selectedDay;
      });

      setSelectedDate(selectedDay);
      setSelectedWorkout(selectedWorkout);
    }

    getWorkoutForSelectedDay();
  };

  return (
    <ScrollView >
      <Calendar


      style={{
      //Tausta boxin väri  
      backgroundColor: '#111111',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      
    }}
        theme={{
        
          //Päivien boxin väri
        calendarBackground: '#555555',
        textSectionTitleColor: '#222222',
        selectedDayBackgroundColor: '#c2bfee',
        selectedDayTextColor: '#000000',
        todayTextColor: '#00adf5',
        // dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#002222',
        indicatorColor: 'blue',

        
}}
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />
      {selectedWorkout && (
        <View>
        <Text style={{color: "#fff"}} >Workout for {new Date(selectedDate).toLocaleDateString()}</Text>
        <Text style={{color: "#fff"}}>{selectedWorkout.name}</Text>
        <Text style={{color: "#fff"}}>Moves:</Text>
        {selectedWorkout.moves.map((move) => (
          <View key={move.name}>
            <Text style={{color: "#fff"}}>{move.name}</Text>
            <Text style={{color: "#fff"}}>Sets:</Text>
            {move.sets.map((set, index) => (
              <View key={index}>
                <Text style={{color: "#fff"}}>Set {index + 1}:</Text>
                <Text style={{color: "#fff"}}>Weight: {set.weight} Reps: {set.reps}</Text>
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