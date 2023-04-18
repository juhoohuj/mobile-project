import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView } from "react-native";
import { useState } from 'react';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function WeightGraph(){

const [inputWeight, setInputWeight] = useState(0)

const [WeightDates, setWeightDates] = useState([])
const [WeightData, setWeightData] = useState([])


function handleAddWeight(){
    currentDate = new Date()
    setWeightDates([...WeightDates, currentDate.toLocaleDateString()])
  
    // let weigtToAdd = inputWeight.parseFloat()
    // console.log(inputWeight)
    // console.log(parseFloat(inputWeight))
    setWeightData([...WeightData, parseFloat(inputWeight)])
  }
  if (WeightData.length == 0){
    return (
      <View style={styles.containerW}>
        <Text>No data</Text>
        <TextInput
          style={styles.input}
          value={inputWeight.toString()}
          onChangeText={value => setInputWeight(value)}
          placeholder="Input your weight"
          keyboardType="numeric"/>
        <Button
          title='ADD'
          onPress={handleAddWeight}/>
      </View>
    )
  }

    return (
        <View style={styles.containerW}>
            <Text>Paino</Text>
            <LineChart
            data={{
                labels: WeightDates,
                datasets: [
                {
                    data: WeightData
                }
                ]
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#020887",
                backgroundGradientFrom: "#222222",
                backgroundGradientTo: "#020887",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                borderRadius: 16
                },
                propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#647AA3"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,

            }}
            onDataPointClick={({ value, getColor }) =>
            console.log(value)
            }/>   
        <TextInput
        style={styles.input}
        value={inputWeight.toString()}
        onChangeText={value => setInputWeight(value)}
        placeholder="Input your weight"
        keyboardType="numeric"/>
        <Button
            title='ADD'
            onPress={handleAddWeight}/>
    </View>
    )
}

const styles = StyleSheet.create({
    containerW: {
    //   flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    input: {
      backgroundColor: '#f3f3f3',
      fontSize: 18,
    },
    scrollContainer: {
      marginLeft: 10,
      marginRight: 10
    }
  });