import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, ScrollView, Text  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Styles from '../styles/Styles';


//Workoutin lisäämisen komponenttti
const LogWorkoutForm = () => {
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
  //Uuden workoutin tallennus AsyncStoragee
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

  const addToWorkoutHistory = async () => {



    const workoutWithDate = { name, moves, date: new Date().toISOString() };

    await AsyncStorage.getItem('@WorkoutHistory').then((value) => {
        let workoutHistory = [];
        if (value != null) {
          workoutHistory = JSON.parse(value);
        }
        workoutHistory.push(workoutWithDate);
        AsyncStorage.setItem('@WorkoutHistory', JSON.stringify(workoutHistory)).then(() => {
            Alert.alert("Workout added to history")
            console.log("Workout added to history")
            console.log(JSON.stringify(workoutHistory))
            navigation.navigate("HomeScreen")
        })
    })
  };
  
  return (
    <View style={Styles.formContainer}>
    <ScrollView style={styles.scrollView} >
      <Text style={Styles.formText}>Workout Name</Text>
      <TextInput
        style={Styles.formInput}
        placeholder="Workout Name"
        placeholderTextColor="gray" 

        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={Styles.formText}>Moves</Text>
      {moves.map((move, moveIndex) => (
        <View key={moveIndex} style={styles.moveContainer}>
          <View style={styles.inputContainer}>
          <TextInput
            style={Styles.moveInput}
            placeholder="Move Name"
            placeholderTextColor="gray" 


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
            <View key={setIndex} style={styles.setContainer}>
              <Text style={{alignSelf:'center', justifyContent:'space-between', marginHorizontal:10,color:"#ffffff"}}>Set {setIndex + 1}</Text>
              <TextInput
                style={Styles.setInput}
                placeholder="Weight"
                placeholderTextColor="gray" 

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
                placeholderTextColor="gray" 

                keyboardType="numeric"
                value={set.reps}
                onChangeText={text => {
                  const newMoves = [...moves];
                  newMoves[moveIndex].sets[setIndex].reps = text;
                  setMoves(newMoves);
                }}
              />
              <Button title="Delete" type='clear' titleStyle={{ color: '#ffffff' }}
                onPress={() => handleDeleteSet(moveIndex, setIndex)}
              />
            </View>
          ))}
           <Button title="Add Set" type='clear' titleStyle={{ color: '#ffffff' }} onPress={() => handleAddSet(moveIndex)} />
         
        </View>
      ))}
    </ScrollView>
    <View style={Styles.buttonContainer}>
        <Button title="Add Move"buttonStyle={{backgroundColor: '#334195', borderRadius: 3, }}onPress={handleAddMove}/>
        <Button title="Log workout"buttonStyle={{backgroundColor: '#334195', borderRadius: 3, }}onPress={addToWorkoutHistory}/>
        <Button title="Clear fields"buttonStyle={{backgroundColor: '#334195', borderRadius: 3, }}onPress={clearInputs}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flexDirection: "column", 
    height: "100%"
  },
  scrollView: {
    height:"90%",
    backgroundColor: "#191D32",

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
  buttonContainer: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});
export default LogWorkoutForm