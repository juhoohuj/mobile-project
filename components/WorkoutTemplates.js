import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import {WorkoutForm} from './WorkoutForm';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        const parsedWorkouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
        setWorkouts(parsedWorkouts);
      } catch (error) {
        console.error(error);
      }
    };

    loadWorkouts();
  }, []);

  //Navigoi WorkoutFormiin ja lähettää valitun templaten mukana
  const handleWorkoutPress = (workout) => {
    navigation.navigate('WorkoutForm', { workout });
    console.log(workout)
  };

  const handleBackPress = () => {
    setSelectedWorkout(null);
  };

  //Poistaa templaten AsyncStoragestä
  const handleDeleteWorkout = async (workoutIndex) => {
    try {
      const newWorkouts = [...workouts];
      newWorkouts.splice(workoutIndex, 1);
      await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts));
      setWorkouts(newWorkouts);
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while deleting the workout.');
    }
  };

  if (selectedWorkout) {
    return (
      <WorkoutForm workout={selectedWorkout} onBackPress={handleBackPress} />
    );
  }

  return (
    <ScrollView style={styles.container}>
      {workouts.map((workout, workoutIndex) => (
        <TouchableOpacity
          key={workoutIndex}
          style={styles.workoutContainer}
          onPress={() => handleWorkoutPress(workout)}
        >
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <Button
              icon={<AntDesign name="delete" size={24} color="black" />}
              onPress={() => handleDeleteWorkout(workoutIndex)}
              type="clear"
            />
          </View>
          {workout.moves.map((move, moveIndex) => (
            <View key={moveIndex} style={styles.moveContainer}>
              <Text style={styles.moveName}>{move.name}</Text>
              {move.sets.map((set, setIndex) => (
                <View key={setIndex} style={styles.setContainer}>
                  <Text style={styles.setDetails}>{`Set ${setIndex + 1}: ${set.weight} kg, ${set.reps} reps`}</Text>
                </View>
              ))}
            </View>
          ))}
        </TouchableOpacity>
      ))}
      <Button title="Create New Workout" onPress={() => navigation.navigate("WorkoutForm")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  workoutContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 20,
  },
  moveContainer: {
    marginBottom: 8,
  },
  moveName: {
    fontSize: 16,
    marginBottom: 4,
  },
  setContainer: {
    marginBottom: 4,
  },
  setDetails: {
    fontSize: 14,
  },
});

export {WorkoutList}