import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Workoutin lisäämisen komponenttti
const WorkoutForm = () => {
  const [name, setName] = useState('');
  const [moves, setMoves] = useState([]);

  //Uuden liikkeen lisääminen workouttiin
  const handleAddMove = () => {
    const newMove = { name: '', sets: [{ weight: '', reps: '' }] };
    setMoves([...moves, newMove]);
  };

  //Uuden sarjan lisääminen liikkeeseen
  const handleAddSet = (moveIndex) => {
    const newSet = { weight: '', reps: '' };
    const newMoves = [...moves];
    newMoves[moveIndex].sets.push(newSet);
    setMoves(newMoves);
  };

  //Uuden workoutin tallennus AsyncStorageen
  const handleSaveWorkout = async () => {
    try {
      const workout = { name, moves };
      const existingWorkouts = await AsyncStorage.getItem('workouts');
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(workout);
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      Alert.alert('Workout saved successfully!');
      setName('');
      setMoves([]);
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while saving the workout.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Workout Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Moves</Text>
      {moves.map((move, moveIndex) => (
        <View key={moveIndex} style={styles.moveContainer}>
          <TextInput
            style={styles.moveInput}
            placeholder="Move Name"
            value={move.name}
            onChangeText={text => {
              const newMoves = [...moves];
              newMoves[moveIndex].name = text;
              setMoves(newMoves);
            }}
          />
          {move.sets.map((set, setIndex) => (
            <View key={setIndex} style={styles.setContainer}>
              <TextInput
                style={styles.setInput}
                placeholder="Weight"
                keyboardType="numeric"
                value={set.weight}
                onChangeText={text => {
                  const newMoves = [...moves];
                  newMoves[moveIndex].sets[setIndex].weight = text;
                  setMoves(newMoves);
                }}
              />
              <TextInput
                style={styles.setInput}
                placeholder="Reps"
                keyboardType="numeric"
                value={set.reps}
                onChangeText={text => {
                  const newMoves = [...moves];
                  newMoves[moveIndex].sets[setIndex].reps = text;
                  setMoves(newMoves);
                }}
              />
            </View>
          ))}
          <Button title="Add Set" onPress={() => handleAddSet(moveIndex)} />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Move" onPress={handleAddMove} />
        <Button title="Save Workout" onPress={handleSaveWorkout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  moveContainer: {
    marginBottom: 16,
  },
  moveInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});


export default WorkoutForm;