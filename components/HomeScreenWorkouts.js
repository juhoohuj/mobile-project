import React, { useEffect, useState  } from 'react';
import { FlatList, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const HomeScreenWorkouts = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const navigation = useNavigation();

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

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpanded = (id) => {
    console.log(id)
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

console.log(expandedIds)


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
        borderColor: "#fff",
        borderWidth: 2,
        margin: 8,
        padding: 8
        }}>
          <TouchableOpacity onPress={() => navigation.navigate("LogWorkoutForm", {workout: {
            name: name, 
            moves: moves
          }})} >
          <Text style={{fontSize: 24, color: "#FFF"}}>{name}</Text>
          </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <RenderItem id={item.id} name={item.name} moves={item.moves} index={index} />
  );

  const keyExtractor = (item, index) => item.id?.toString() || index.toString();

  return (
    <>
      <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} /> 

   {/*    <Button
      title="Delete"
      onPress={() => deleteWorkoutHistory()}
    /> */}
</>
  );
};

export default HomeScreenWorkouts;