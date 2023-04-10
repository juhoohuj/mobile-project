import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutForm = () => {
  const [name, setName] = useState('');
  const [moves, setMoves] = useState([]);
  const [moveName, setMoveName] = useState('');
  const [moveSets, setMoveSets] = useState('');

  const handleAddMove = () => {
    const newMove = { name: moveName, sets: moveSets };
    setMoves([...moves, newMove]);
    setMoveName('');
    setMoveSets('');
  };

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
      setMoveName('');
      setMoveSets('');
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while saving the workout.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Workout Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {moves.map((move, index) => (
        <View key={index}>
          <TextInput
            placeholder="Move Name"
            value={move.name}
            onChangeText={text => {
              const newMoves = [...moves];
              newMoves[index].name = text;
              setMoves(newMoves);
            }}
          />
          <TextInput
            placeholder="Number of Sets"
            keyboardType="numeric"
            value={move.sets}
            onChangeText={text => {
              const newMoves = [...moves];
              newMoves[index].sets = text;
              setMoves(newMoves);
            }}
          />
        </View>
      ))}
      <View>
        <TextInput
          placeholder="Move Name"
          value={moveName}
          onChangeText={text => setMoveName(text)}
        />
        <TextInput
          placeholder="Number of Sets"
          keyboardType="numeric"
          value={moveSets}
          onChangeText={text => setMoveSets(text)}
        />
        <Button title="Add Move" onPress={handleAddMove} />
      </View>
      <Button title="Save Workout" onPress={handleSaveWorkout} />
    </View>
  );
};

export default WorkoutForm;