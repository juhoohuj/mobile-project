import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native";
import { Button } from "react-native";
import { object } from "prop-types";
import HomeScreenWorkouts from "./HomeScreenWorkouts";
import Styles from "../styles/Styles";
import { useSafeAreaInsets } from 'react-native-safe-area-context';




const STORAGE_KEY = '@exe-Key';

const HomeScreen = () => {
    const insets = useSafeAreaInsets();


    const [exes, setExes] = useState([]);
    const [moves, setMoves] = useState([]);
    const [text, setText] = useState("");
    const [num, setNum] = useState(0);

    
    const [data, setData] = useState()

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('workouts');
          if (jsonValue != null) {
            setData(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error(e);
        }
      };
    

    const getWorkouts = async () => {
        setExes([]);
        setMoves([]);
        try {
            const workouts = await AsyncStorage.getItem('workouts');

            console.log("--------------------",workouts)
            if (workouts !== null) {
                const parsed = JSON.parse(workouts);
                console.log("parsed", parsed);

                // console.log("parsed", parsed[0].moves);
                console.log("")
                console.log("Workout name: ", parsed[0].name);

                console.log("Name: ", parsed[0].moves[0].name);
                console.log("Reps: ", parsed[0].moves[0].sets[0].reps);
                console.log("Weight: ", parsed[0].moves[0].sets[0].weight);

                console.log("")
               
                
                
                

            }

            } catch (e) {
                console.error("obj",e);
            }
    };



    const RenderItem = ({ name, sets }) => (
        <View>
          <Text>{name}</Text>
          {sets.map(({ weight, reps }) => (
            <View key={`${weight}-${reps}`}>
              <Text>Weight: {weight}</Text>
              <Text>Reps: {reps}</Text>
            </View>
          ))}
        </View>
      );

    return (
        <View style={[Styles.container, {paddingTop: insets.top}]}>
            <HomeScreenWorkouts />
        </View>

    )
}

 export {HomeScreen}
