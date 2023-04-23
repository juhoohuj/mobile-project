import React, { useEffect, useState  } from 'react';
import { FlatList, Text, TouchableOpacity, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

const HomeScreenWorkouts = () => {
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
        console.log("useEffect")
        try {
          const jsonValue = await AsyncStorage.getItem('workouts');
          if (jsonValue != null) {
            setData(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error(e);
        }
      };
    getData();
  }, [isFocused]);



//   const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('workouts');
//       if (jsonValue != null) {
//         setData(JSON.parse(jsonValue));
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

  const [expandedIds, setExpandedIds] = useState([]);

/*   const toggleExpanded = (id) => {
    console.log(id)
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };
 */
console.log(expandedIds)

const addToWorkoutHistory = async (workout) => {
  const workoutWithDate = { ...workout, date: new Date().toISOString() };
  try {
    const jsonValue = await AsyncStorage.getItem('@WorkoutHistory');
    let workoutHistory = [];
    if (jsonValue != null) {
      workoutHistory = JSON.parse(jsonValue);
    }
    workoutHistory.push(workoutWithDate);
    await AsyncStorage.setItem('@WorkoutHistory', JSON.stringify(workoutHistory));
    console.log("Workout added to history")
    console.log(JSON.stringify(workoutHistory))
  } catch (e) {
    console.error(e);
  }
  
};

// function to delete workoutHistory
const deleteWorkoutHistory = async () => {
  try {
    await AsyncStorage.removeItem('@WorkoutHistory');
  } catch (e) {
    console.error(e);
  }
};


  const RenderItem = ({ index, id, name, moves }) => (
    <View style={{
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        marginBottom: 6,
        }}>
      <TouchableOpacity onPress={() => toggleExpanded(index)} style={Styles.homeScreenItem}>
        <Text style={{fontSize: 24, color: "#FFF"}}>{name}</Text>
        <MaterialIcons name="expand-more" size={24} color="white" />
      </TouchableOpacity>
      {expandedIds.includes(index) &&
        moves.map(({ name: moveName, sets }) => (
          <View key={`${moveName}-${id}`}  style={{alignItems: 'center'}}>
            <Text style={{color: "#fff", fontSize: 22, marginBottom: 6}}>{moveName}</Text>
            {sets.map(({ weight, reps }, index) => (
              <View key={`${weight}-${reps}-${index}`}>
                <Text style={{color: "#fff", fontSize: 16}} >Weight: {weight}</Text>
                <Text style={{color: "#fff", fontSize: 16, marginBottom: 6}} >Reps: {reps}</Text>
              </View>
            ))}
          </View>
        ))}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => addToWorkoutHistory({ name, moves })}>
            <MaterialIcons name="add-circle" size={54} color="white" />
          </TouchableOpacity>
        </View>
                {/* <Button
                title="Add to Workout History"
                onPress={() => addToWorkoutHistory({ name, moves })}
              /> */}
              
    </View>
  );

  const renderItem = ({ item, index }) => (
    <RenderItem id={item.id} name={item.name} moves={item.moves} index={index} />
  );

  const keyExtractor = (item, index) => item.id?.toString() || index.toString();

  return (
    <>
  <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} /> 

      <Button
      title="Delete"
      onPress={() => deleteWorkoutHistory()}
    />
</>
  );
};

export default HomeScreenWorkouts;

function toggleExpanded(index) {
  throw new Error('Function not implemented.');
}
