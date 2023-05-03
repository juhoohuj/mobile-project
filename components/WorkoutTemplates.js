import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
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
  }, [{workouts}]);

  //Navigoi WorkoutFormiin ja lähettää valitun templaten mukana
  const handleWorkoutPress = (workoutIndex) => {
    if (selectedWorkout === workoutIndex) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workoutIndex);
    }
  };

  const handleContinuePress = (workout) => {
    navigation.navigate('WorkoutForm', { workout });
  };

  const handleBackPress = () => {
    setSelectedWorkout(null);
  };

  //Poistaa templaten AsyncStoragestä
  const handleDeleteWorkout = async (workoutIndex) => {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const newWorkouts = [...workouts];
              newWorkouts.splice(workoutIndex, 1);
              await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts));
              setWorkouts(newWorkouts);
            } catch (error) {
              console.error(error);
              Alert.alert('An error occurred while deleting the workout.');
            }
          }
        }
      ]
    );
  };

  if (selectedWorkout) {
    return (
      <WorkoutForm workout={selectedWorkout} onBackPress={handleBackPress} />
    );
  }

  

  return (
    <SafeAreaView style={styles.container}>
    {workouts.map((workout, workoutIndex) => (
      <View key={workoutIndex} style={styles.workoutContainer}>
        <TouchableOpacity
          style={styles.workoutHeader}
          onPress={() => handleWorkoutPress(workoutIndex)}
        >
          <Text style={styles.workoutName}>{workout.name}</Text>
          <AntDesign name={selectedWorkout === workoutIndex ? "caretup" : "caretdown"} size={24} color="white" />
          <Button
              icon={<AntDesign name="delete" size={24} color="#ffffff" />}
              onPress={() => handleDeleteWorkout(workoutIndex)}
              type="clear"
            />
        </TouchableOpacity>
        {selectedWorkout === workoutIndex && (
          <View>
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
            <Button type='clear' titleStyle={{color:"white"}} title="Use this template" onPress={() => handleContinuePress(workout)} />
          </View>
        )}
      </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#191D32",
    color: '#ffffff',
    margin: 16,
  },
  workoutContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 20,
    color: '#ffffff',
  },
  moveContainer: {
    marginBottom: 8,
  },
  moveName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#ffffff',
  },
  setContainer: {
    marginBottom: 4,
  },
  setDetails: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export {WorkoutList}