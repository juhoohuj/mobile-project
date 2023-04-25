import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import WorkoutForm from './WorkoutForm';
import { AddScreen } from './AddScreen';

const WorkoutTemplates = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const existingWorkouts = await AsyncStorage.getItem('workouts');
        const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
        setWorkouts(workouts);
      } catch (error) {
        console.error(error);
        Alert.alert('An error occurred while retrieving the workouts.');
      }
    };

    getWorkouts();
  }, []);

  const handleWorkoutPress = (workoutName) => {
    const selectedWorkout = workouts.find(workout => workout.name === workoutName);
    if (selectedWorkout) {
      navigation.navigate('WorkoutForm', { workout: selectedWorkout });
    } else {
      Alert.alert('Workout not found.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a workout:</Text>
      {workouts.length > 0 ? (
        workouts.map(workout => (
          <Button
            key={workout.name}
            title={workout.name}
            onPress={() => handleWorkoutPress(workout.name)}
          />
        ))
      ) : (
        <Text>No workouts found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export {WorkoutTemplates};