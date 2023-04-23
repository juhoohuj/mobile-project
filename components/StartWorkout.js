import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutTimer = ({ workoutName }) => {
    const [workout, setWorkout] = useState(null);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [currentSetStartTime, setCurrentSetStartTime] = useState(null);
    const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  
    useEffect(() => {
      const getWorkout = async () => {
        try {
          const existingWorkouts = await AsyncStorage.getItem('workouts');
          const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
          const selectedWorkout = workouts.find(workout => workout.name === workoutName);
          setWorkout(selectedWorkout);
        } catch (error) {
          console.error(error);
          Alert.alert('An error occurred while retrieving the workout.');
        }
      };
  
      getWorkout();
    }, [workoutName]);
  
    const handleStartWorkout = () => {
      setCurrentMoveIndex(0);
      setCurrentSetIndex(0);
      setCurrentSetStartTime(Date.now());
      setTotalWorkoutTime(0);
    };
  
    const handleNextSet = () => {
      if (currentSetIndex < workout.moves[currentMoveIndex].sets.length - 1) {
        setCurrentSetIndex(currentSetIndex + 1);
        setCurrentSetStartTime(Date.now());
      } else if (currentMoveIndex < workout.moves.length - 1) {
        setCurrentMoveIndex(currentMoveIndex + 1);
        setCurrentSetIndex(0);
        setCurrentSetStartTime(Date.now());
      } else {
        const workoutEndTime = Date.now();
        const workoutDuration = workoutEndTime - currentSetStartTime;
        setTotalWorkoutTime(totalWorkoutTime + workoutDuration);
        const completedWorkout = { ...workout, completedAt: workoutEndTime, duration: totalWorkoutTime };
        saveCompletedWorkout(completedWorkout);
        Alert.alert(`Workout completed in ${Math.round(totalWorkoutTime / 1000)} seconds!`);
      }
    };
  
    const saveCompletedWorkout = async (completedWorkout) => {
      try {
        const existingCompletedWorkouts = await AsyncStorage.getItem('completedWorkouts');
        const completedWorkouts = existingCompletedWorkouts ? JSON.parse(existingCompletedWorkouts) : [];
        completedWorkouts.push(completedWorkout);
        await AsyncStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
      } catch (error) {
        console.error(error);
        Alert.alert('An error occurred while saving the completed workout.');
      }
    };
  
    if (!workout) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.workoutName}>{workoutName}</Text>
        <Button
          title="Start Workout"
          onPress={handleStartWorkout}
        />
        {currentMoveIndex < workout.moves.length && (
          <View style={styles.currentSetContainer}>
            <Text style={styles.currentMoveName}>{workout.moves[currentMoveIndex].name}</Text>
            <Text style={styles.currentSetNumber}>Set {currentSetIndex + 1} of {workout.moves[currentMoveIndex].sets.length}</Text>
            <Button
              title="Next Set"
              onPress={handleNextSet}
          />
        </View>
      )}
    </View>
    );}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        workoutName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        currentSetContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        currentMoveName: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        currentSetNumber: {
            fontSize: 16,
            marginBottom: 20,
        },
    });

    export default WorkoutTimer;