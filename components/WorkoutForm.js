import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, ScrollView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/base';

//Workoutin lisäämisen komponenttti
const WorkoutForm = () => {
  const [name, setName] = useState('');
  const [moves, setMoves] = useState([]);

  //Uuden liikkeen lisääminen workouttiin
  const handleAddMove = () => {
    const newMove = { name: '', sets: [{ weight: '', reps: '' }] };
    setMoves([...moves, newMove]);
  };

  const handleDeleteMove = (moveIndex) => {
    const newMoves = [...moves];
    newMoves.splice(moveIndex, 1);
    setMoves(newMoves);
  };

  //Uuden sarjan lisääminen liikkeeseen
  const handleAddSet = (moveIndex) => {
    const newSet = { weight: '', reps: '' };
    const newMoves = [...moves];
    newMoves[moveIndex].sets.push(newSet);
    setMoves(newMoves);
  };

  const handleDeleteSet = (moveIndex, setIndex) => {
    const newMoves = [...moves];
    newMoves[moveIndex].sets.splice(setIndex, 1);
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
          <View style={styles.inputContainer}>
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
            <Button
              onPress={() => handleDeleteMove(moveIndex)}
              type="clear"
              icon={
                <AntDesign name="minuscircleo" size={24} color="black" />
              }
            />
          </View>
          {move.sets.map((set, setIndex) => (
            <View key={setIndex} style={styles.setContainer}>
              <Text style={{alignSelf:'center', justifyContent:'space-between', marginHorizontal:10,}}>Set {setIndex + 1}</Text>
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
              <Button
                icon={
                  <AntDesign name="delete" size={24} color="black" />
                }
                onPress={() => handleDeleteSet(moveIndex, setIndex)}
                type="clear"
              />
            </View>
          ))}
          <Button title="Add Set" type='clear' onPress={() => handleAddSet(moveIndex)} />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Move" type='clear' onPress={handleAddMove} />
        <Button title="Save Workout" type='clear' onPress={handleSaveWorkout} />
        
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
    borderBottomWidth: 1,
  },
  moveInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  setInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding:8,
    marginRight: 8,
    marginBottom: 8,
  },
  setContainer: {
    flexDirection: 'row', 
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});


export default WorkoutForm;