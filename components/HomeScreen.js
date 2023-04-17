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
    const [num, setNum] = useState(0);

            
    const getWorkouts = async () => {
        setExes([]);
        setMoves([]);
        try {
            const workouts = await AsyncStorage.getItem('workouts');
            if (workouts !== null) {
                const parsed = JSON.parse(workouts);

                for (let i = 0; i < Object.keys(parsed).length; i++) {
                    exes.push(parsed[i].name);
                    console.log("testi", Object.keys(parsed[i].moves).length);

                    for (let j = 0; j < Object.keys(parsed[i].moves).length; j++) {
                        console.log(j);
                        console.log("mitääää" , parsed[i].moves[j].name);
                        moves.push(parsed[i].moves[j].name);
                    }


                    
                    //console.log(parsed[i].moves[i]);
                    //console.log(Object.keys("pituus", parsed[i].moves).length);
                    //console.log("lalallalal", parsed[i].name, parsed[i].moves[1].name);
                    
                   
                }
                
                console.log("Toimiiks", exes, moves);
                //console.log(Array.isArray(parsed));
                //object.values(parsed[0]).map(x=>console.log(x));
                
                
                

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
        
        //console.log(exes);
        
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
            
            <Text>{exes}</Text>
        </View>
    )
}

 export {HomeScreen}

 /*{moves.map((move) => (
    <Text>{move.name}</Text>
))}{moves.map((mov, j) => (
                        <View key={j}>
                            <Text>{mov.name}</Text>
                        </View>
                    ))}*/