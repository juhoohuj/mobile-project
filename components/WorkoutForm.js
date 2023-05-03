import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, SafeAreaView, ScrollView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from '../styles/Styles';


//Workoutin lisäämisen komponenttti
const WorkoutForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workout } = route.params || {};
  const [name, setName] = useState(workout?.name || '');
  const [moves, setMoves] = useState(workout?.moves || []);


  useEffect(() => {
    if (route.params?.workout) {
      setName(workout.name)
      setMoves(workout.moves);
    }
  }, [route.params?.workout]);

  const clearInputs = () => {
    setName('');
    setMoves([]);
  };

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
    <ScrollView style={Styles.formContainer}>
      <Text style={Styles.formText}>Workout Name</Text>
      <TextInput
        style={Styles.formInput}
        placeholder="Workout Name"
        placeholderTextColor="#ffffff" 
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={Styles.formText}>Moves</Text>
      {moves.map((move, moveIndex) => (
        <View key={moveIndex} style={Styles.moveContainer}>
          <View style={Styles.inputContainer}>
          <TextInput
            style={Styles.moveInput}
            placeholder="Move Name"
            placeholderTextColor="#ffffff" 
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
                <AntDesign name="minuscircleo" size={24} color="red" />
              }
            />
          </View>
          {move.sets.map((set, setIndex) => (
            <View key={setIndex} style={Styles.setContainer}>
              <Text style={{alignSelf:'center', justifyContent:'space-between', marginHorizontal:10, color:"#ffffff"}}>Set {setIndex + 1}</Text>
              <TextInput
                style={Styles.setInput}
                placeholder="Weight"
                placeholderTextColor="#ffffff" 
                keyboardType="numeric"
                value={set.weight}
                onChangeText={text => {
                  const newMoves = [...moves];
                  newMoves[moveIndex].sets[setIndex].weight = text;
                  setMoves(newMoves);
                }}
              />
              <TextInput
                style={Styles.setInput}
                placeholder="Reps"
                placeholderTextColor="#ffffff" 
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
                  <AntDesign name="delete" size={24} color="white" />
                }
                onPress={() => handleDeleteSet(moveIndex, setIndex)}
                type="clear"
              />
            </View>
          ))}
          <Button title="Add Set" type='clear' titleStyle={{ color: '#ffffff' }} onPress={() => handleAddSet(moveIndex)} />
        </View>
      ))}
      <View style={Styles.buttonContainer}>
        <Button title="Add Move" type='clear' titleStyle={{ color: '#ffffff' }} onPress={handleAddMove} />
        <Button title="Save Workout" type='clear' titleStyle={{ color: '#ffffff' }} onPress={handleSaveWorkout} />
        <Button title="Clear" type='clear' titleStyle={{ color: '#ffffff' }} onPress={clearInputs} />
      </View>
    </ScrollView>
  );
};

export {WorkoutForm};