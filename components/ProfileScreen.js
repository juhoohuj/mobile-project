import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";
import Card from "../components/Card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";


const ProfileScreen = ({ navigation }) => {

  const [latestWeight, setLatestWeight] = useState(0)
  const [totalWeightLifted, setTotalWeightLifted] = useState(0)
  const [totalWorkoutsDone, setTotalWorkoutsDone] = useState(0)
  const [mostWeightLifted, setMostWeightLifted] = useState(0)

  const isFocused = useIsFocused();

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
getAllKeys()

// clearAll = async () => {
//   try {
//     await AsyncStorage.clear()
//   } catch(e) {
//     // clear error
//   }

//   console.log('Done.')
// }
// clearAll()

  useEffect(() => {
    async function getData() {
      try {
        const weightHistory = await AsyncStorage.getItem("@savedGraphDataWeight");
        if (latestWeight !== null) {
          const { mainDataPoint } = JSON.parse(weightHistory);
          setLatestWeight(mainDataPoint[mainDataPoint.length - 1])
  
        } else {
        //  setLatestWeight("No weight data")
        }
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [isFocused]);


  useEffect(() => {
    async function getWorkoutHistory() {
      try {
        const workouts = await AsyncStorage.getItem("@WorkoutHistory");
        if (workouts !== null) {
          workoutsParsed = JSON.parse(workouts)

          let totalWeight = 0;
          let mostWeightLifted = 0;

          for (const workout of workoutsParsed) {
            let workoutWeight = 0;

            for (const move of workout.moves) {
              for (const set of move.sets) {
                const weightLifted = parseInt(set.weight) * parseInt(set.reps);
                workoutWeight += weightLifted;
                totalWeight += weightLifted;
              }
            }
            if (workoutWeight > mostWeightLifted) {
              mostWeightLifted = workoutWeight;
              
            }
            setTotalWeightLifted(totalWeight)
            setMostWeightLifted(mostWeightLifted)
            setTotalWorkoutsDone(workoutsParsed.length)
          }
        } else {
          // console.log("No workout history")
        }
      } catch (e) {
        console.error(e);
      }
    }
    getWorkoutHistory();
  }, [isFocused]);



  const ProfileInfoText = ({ label, value, units }) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.profileText}>{label}</Text>
        <Text style={styles.profileText}>{value} {units ? units : ""}</Text>
      </View>
    );
  };


    return (
        <View style={[styles.container]}>
          <Text style={styles.headerStyle}>Profile</Text>

      <View style={{height: 200, backgroundColor: "#3f3f3f", margin: 10, borderRadius: 25, padding: 8}}>
            <Text style={styles.profileText}>Here are some stats for you!</Text>

        <ProfileInfoText label={"Latest weight:"} value={latestWeight} units={"kg"}/>
        <ProfileInfoText label={"Total weight lifted:"} value={totalWeightLifted} units={"kg"}/>
        <ProfileInfoText label={"Most weight lifted in a workout:"} value={mostWeightLifted} units={"kg"}/>
        <ProfileInfoText label={"Total workouts completed:"} value={totalWorkoutsDone}/>

          </View>
            <View style={{flexDirection: "row", justifyContent: "space-around", padding: 2, flexWrap: "wrap", rowGap: 5}}>
              <Card navigation={navigation} cardText={"Graphs"} icon={"line-graph"}  destination={'Graphs'} />
              <Card navigation={navigation} cardText={"Other"} icon={"code"}  destination={'Home'}/>
            </View>
        </View>
    )
 }
export {ProfileScreen}