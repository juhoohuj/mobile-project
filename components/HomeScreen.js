import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native";
import { Button } from "react-native";
import { object } from "prop-types";


const STORAGE_KEY = '@exe-Key';

const HomeScreen = () => {
    const [exes, setExes] = useState([]);
    const [moves, setMoves] = useState([]);
    const [text, setText] = useState("");
   

            
    const getWorkouts = async () => {
        try {
            const workouts = await AsyncStorage.getItem('workouts');
            if (workouts !== null) {
                const parsed = JSON.parse(workouts);
                console.log("lalallalal", parsed[0].moves);
                //console.log(Array.isArray(parsed));
                //object.values(parsed[0]).map(x=>console.log(x));
                
                
                setExes(parsed[0].moves);
            }

            } catch (e) {
                console.error("obj",e);
            }
    };

    const getWorkoutMoves = async () => {
        try {
            const workouts = await AsyncStorage.getItem('workouts');
            if (workouts !== null) {
                const parsed = JSON.parse(workouts, (key,value) => {
                    console.log(parsed);
                    if(typeof value === 'string') {
                        setMoves[value];
                        console.log(value);
                    }
                })
                console.log(workouts)
                
            }

            } catch (e) {
                console.error(e);
            }
    };

    useEffect(() => {
        
        console.log(exes);
        console.log("movet" );
    })

    function buttonPressed() {

        /*const newKey = exes.lenght + 1;
        const newExe = {key: newKey.toString(), description: text};
        const newExes = [...exes, newExe];*/

        getWorkouts();
        
    }


    return (
        <View>
            <Text>Test</Text>


            <Button title="Test" onPress={() => {buttonPressed()}}/>

        {
            exes.map((exe, i) => (
                
                <View key={i}>
                    <Text>{exe.name}</Text>
                    
                </View>
                
            ))
        }            
            
            
        </View>
    )
}

 export {HomeScreen}

 /*{moves.map((move) => (
    <Text>{move.name}</Text>
))}*/