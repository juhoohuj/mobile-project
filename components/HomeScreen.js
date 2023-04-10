import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage";
import { TextInput } from "react-native";
import { Button } from "react-native";

const STORAGE_KEY = '@exe-Key';

const HomeScreen = () => {
    const [exes, setExes] = useState([]);
    
    const [text, setText] = useState("");
   

            
    const getWorkouts = async () => {
        try {
            return AsyncStorage.getItem('workouts')
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = [];
                }
                console.log(json);
                setExes(json);
            })
            .catch (error => console.log(error));

            } catch (e) {
                console.error(e);
            }
    };

    useEffect(() => {
        
        console.log(exes);
       
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
            exes.map((exe) => (
                <View>
                    <Text>{exe.name} </Text>
                </View>
            ))
        }            
            
            
        </View>
    )
}

 export {HomeScreen}