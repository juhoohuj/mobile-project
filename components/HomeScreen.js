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


    // const [exes, setExes] = useState([]);
    // const [moves, setMoves] = useState([]);
    // const [text, setText] = useState("");
    // const [num, setNum] = useState(0);

    
    // const [data, setData] = useState()

    // const getData = async () => {
    //     try {
    //       const jsonValue = await AsyncStorage.getItem('workouts');
    //       if (jsonValue != null) {
    //         setData(JSON.parse(jsonValue));
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   };
    

    // const getWorkouts = async () => {
    //     setExes([]);
    //     setMoves([]);
    //     try {
    //         const workouts = await AsyncStorage.getItem('workouts');

    //         console.log("--------------------",workouts)
    //         if (workouts !== null) {
    //             const parsed = JSON.parse(workouts);
    //             console.log("parsed", parsed);

    //             // console.log("parsed", parsed[0].moves);
    //             console.log("")
    //             console.log("Workout name: ", parsed[0].name);

    //             console.log("Name: ", parsed[0].moves[0].name);
    //             console.log("Reps: ", parsed[0].moves[0].sets[0].reps);
    //             console.log("Weight: ", parsed[0].moves[0].sets[0].weight);

    //             console.log("")
    //             // setdata(JSON.stringify(parsed, null, 2))

    //             // console.log(JSON.stringify(parsed, null, 2));
    //             // Set the state 


    //             // setExes(parsed[0].name);


    //             // for (let i = 0; i < Object.keys(parsed).length; i++) {
    //             //     exes.push(parsed[i].name);
    //             //     // console.log("testi", Object.keys(parsed[i].moves).length);

    //             //     for (let j = 0; j < Object.keys(parsed[i].moves).length; j++) {
    //             //         // console.log(j);
    //             //         // console.log("mitääää" , parsed[i].moves[j].name);
    //             //         moves.push(parsed[i].moves[j].name);
    //             //     }


                    
    //             //     //console.log(parsed[i].moves[i]);
    //             //     //console.log(Object.keys("pituus", parsed[i].moves).length);
    //             //     //console.log("lalallalal", parsed[i].name, parsed[i].moves[1].name);
                    
                   
    //             // }
                
    //             // console.log("Toimiiks", exes, moves);
    //             //console.log(Array.isArray(parsed));
    //             //object.values(parsed[0]).map(x=>console.log(x));
                
                
                

    //         }

    //         } catch (e) {
    //             console.error("obj",e);
    //         }
    // };

    // const getWorkoutMoves = async () => {
    //     try {
    //         const workouts = await AsyncStorage.getItem('workouts');
    //         if (workouts !== null) {
    //             const parsed = JSON.parse(workouts, (key,value) => {
    //                 // console.log(parsed);
    //                 if(typeof value === 'string') {
    //                     setMoves[value];
    //                     // console.log(value);
    //                 }
    //             })
    //             // console.log(workouts)
                
    //         }

    //         } catch (e) {
    //             console.error(e);
    //         }
    // };

    // useEffect(() => {
        
    //     //console.log(exes);
        
    // })

    // function buttonPressed() {

    //     /*const newKey = exes.lenght + 1;
    //     const newExe = {key: newKey.toString(), description: text};
    //     const newExes = [...exes, newExe];*/

    //     getData();
        
    // }


    // return (
    //     <View>
    //         <Text>Test</Text>


    //         <Button title="Test" onPress={() => {buttonPressed()}}/>

    //     {
    //         exes.map((exe, i) => (
                
    //             <View key={i}>
    //                 <Text>{exe.name}</Text>
                    
    //             </View>
                
    //         ))
    //     }            
            
    //         <Text>{exes}</Text>
    //     </View>
    // )

    // const RenderItem = ({ name, sets }) => (
    //     <View>
    //       <Text>{name}</Text>
    //       {sets.map(({ weight, reps }) => (
    //         <View key={`${weight}-${reps}`}>
    //           <Text>Weight: {weight}</Text>
    //           <Text>Reps: {reps}</Text>
    //         </View>
    //       ))}
    //     </View>
    //   );




    return (
        <View style={[Styles.container, {paddingTop: insets.top}]}>
            <HomeScreenWorkouts />
        </View>

    //     <View>
    //         <Text>Test</Text>
    //         <Button title="Test" onPress={() => {buttonPressed()}}/>

    //         <FlatList
    //             data={data}
    //             renderItem={({ item }) => (
    //     <RenderItem name={item.name} sets={item.moves[0].sets} />
    //   )}
    // />

    //     </View>
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