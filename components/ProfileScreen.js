import React from "react";
import { ImageBackground, Text, View, SafeAreaView, ScrollView, Button, Alert } from "react-native";
import styles from "../styles/Styles";
import Card from "../components/Card";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import backgroundImage from '../assets/background.jpg';




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

  function clearAll() {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.clear();
            // Add any additional logic to run after clearing data
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function getData() {
      try {
        const weightHistory = await AsyncStorage.getItem("@savedGraphDataWeight");
        if (weightHistory !== null) {
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

  const insets = useSafeAreaInsets();


  const ProfileInfoText = ({ label, value, units }) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.profileText}>{label}</Text>
        <Text style={styles.profileText}>{value} {units ? units : ""}</Text>
      </View>
    );
  };


    return (
        <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <ScrollView>
        <Text style={styles.headerStyle}>PROFILE</Text>

        <View style={{height: 250,
           backgroundColor: "#0d2863", 
           margin: 10, 
           borderRadius: 25, 
           padding: 3, 
           borderColor: "#334195", 
           borderWidth: 2,
           shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
           elevation: 5,
           }}>
              <Text style={styles.profileHeader}>Here are some stats for you!</Text>

          <ProfileInfoText label={"Latest weight:"} value={latestWeight} units={"kg"}/>
          <ProfileInfoText label={"Total weight lifted:"} value={totalWeightLifted} units={"kg"}/>
          <ProfileInfoText label={"Most weight lifted in a workout:"} value={mostWeightLifted} units={"kg"}/>
          <ProfileInfoText label={"Total workouts completed:"} value={totalWorkoutsDone}/>

            </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", padding: 0, marginBottom: 35, flexWrap: "wrap", rowGap: 5}}>
                <Card navigation={navigation} cardText={"Graphs"} icon={"line-graph"}  destination={'Graphs'} />
                <Card navigation={navigation} cardText={"Add Graphs"} icon={"plus"}  destination={'CreateGraphs'}/>
                <Card navigation={navigation} cardText={"Calendar"} icon={"calendar"}  destination={'CalendarScreen'}/>
                <Card navigation={navigation} cardText={"Add workout"} icon={"plus"}  destination={'AddScreen'}/>
              </View>
              <Button color={"red"} onPress={clearAll} title="Clear all data" />
            </ScrollView>
            </ImageBackground>
          </SafeAreaView>
    )
 }
export {ProfileScreen}