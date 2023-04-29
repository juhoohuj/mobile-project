import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, ScrollView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WorkoutList } from './WorkoutTemplates';



//Workoutin lisäämisen komponenttti
const WorkoutForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workout } = route.params || {};
  const [name, setName] = useState(workout?.name || '');
  const [moves, setMoves] = useState(workout?.moves || []);
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState([{ weight: '', reps: '' }]);
  const [lastWeight, setLastWeight] = useState(null);

  const [workoutHistory, setWorkoutHistory] = useState([]);


const getLastWeight = async () => {
    try {
      const lastWeight = await AsyncStorage.getItem('lastWeight');
      return lastWeight ? JSON.parse(lastWeight) : null;
    } catch (error) {
      console.log('Error retrieving last weight from AsyncStorage:', error);
    }
  };
  
  const saveLastWeight = async (weight) => {
    try {
      await AsyncStorage.setItem('lastWeight', JSON.stringify(weight));
      console.log('Last weight saved successfully.');
    } catch (error) {
      console.log('Error saving last weight to AsyncStorage:', error);
    }
  };
  
/*  Old code : maybe delet useEffect(() => {
    if (weight) {
      saveLastWeight(weight);
      setLastWeight(weight);
    }
  }, [weight]);
   */

  const handleSaveWeight = (weight) => {
    // Save the weight to your workout tracking system
  
    // Update the last weight in local storage
    saveLastWeight(weight);
  
    // Update the last weight in the component state
    setLastWeight(weight);
  };
  


  useEffect(() => {
    if (route.params?.workout) {
      setName(workout.name)
      setMoves(workout.moves)
      saveLastWeight(weight);
      setLastWeight(weight);;
    }
  }, [route.params?.workout, weight],);

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

  const handleDeleteSet = (moveIndex, setIndex) => {
    const newMoves = [...moves];
    newMoves[moveIndex].sets.splice(setIndex, 1);
    setMoves(newMoves);
  };

  //Uuden workoutin tallennus AsyncStorageen
  const handleSaveWorkout = async () => {
    try {
      // const workout = { name, moves };
      const workout = {
        name: 'Workout Name',
        moves: [
          {
            name: 'Exercise 1', // Exercise name
            sets: [
              { weight: '10', reps: '12' },
              { weight: '15', reps: '10' },
            ],
          },
          // Other exercises...
        ],
      };
      const existingWorkouts = await AsyncStorage.getItem('workouts');
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(workout);
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      Alert.alert('Workout saved successfully!');
      setName('');
      setMoves([]);
      setWorkoutHistory(prevWorkoutHistory => [...prevWorkoutHistory, workout]);

    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while saving the workout.');
    }
  };

  const handleAddSet = (moveIndex) => {
    const lastSet = moves[moveIndex].sets[moves[moveIndex].sets.length - 1];
    const newSet = { weight: lastSet.weight, reps: lastSet.reps };
    const newMoves = [...moves];
    newMoves[moveIndex].sets = [...newMoves[moveIndex].sets, newSet];
    setMoves(newMoves);
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
            icon={<AntDesign name="minuscircleo" size={24} color="black" />}
          />
        </View>

        {move.sets.map((set, setIndex) => (
          <View key={setIndex} style={styles.setContainer}>
            <Text style={{ alignSelf: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              Set {setIndex + 1}
            </Text>
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
              icon={<AntDesign name="delete" size={24} color="black" />}
              onPress={() => handleDeleteSet(moveIndex, setIndex)}
              type="clear"
            />
          </View>
        ))}

        <Button
          title="Add Set"
          type="clear"
          onPress={() => handleAddSet(moveIndex)}
        />
      </View>
    ))}

    <View style={styles.buttonContainer}>
      <Button title="Add Move" type="clear" onPress={handleAddMove} />
      <Button
        title="Save Workout"
        type="clear"
        onPress={() => {
          handleSaveWorkout();
          handleSaveWeight();
        }}
      />
    </View>

    <View>
      <Button title="Clear" onPress={clearInputs} />
      <Button
        title="Templates"
        onPress={() => navigation.navigate("WorkoutTemplates")}
      />
      <Text></Text>
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


export {WorkoutForm};