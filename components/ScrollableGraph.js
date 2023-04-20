import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView } from "react-native";
import { useState } from 'react';
import {
  LineChart
} from "react-native-chart-kit";

export default function ScrollableGraph(){

const [inputWeight, setInputWeight] = useState("")

const [WeightDates, setWeightDates] = useState([0])
const [WeightData, setWeightData] = useState([0])
const [graphWidth, setGraphWidth] = useState(Dimensions.get("window").width - 20)


function handleAddWeight(){
    let currentDate = new Date()
    setWeightDates([...WeightDates, currentDate.toLocaleDateString()])

    setWeightData([...WeightData, parseFloat(inputWeight)])

    if(WeightData.length > 3) {
        setGraphWidth(graphWidth + 100)
    }
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
           <ScrollView
            style={styles.scrollContainer}
            horizontal={true}
            // The graph will be scrolled to the end on start up
            contentOffset={{ x: WeightData.length * 200, y: 0 }}
            showsHorizontalScrollIndicator={false}
            // Auto scroll to end when new weight is added
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
            >
                <LineChart
                    data={{
                    labels: WeightDates,
                    datasets: [
                        {
                        data: WeightData
                        }
                    ]
                    }}
                    width={graphWidth}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix="kg"
                    yAxisInterval={1}
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
                    />
                </ScrollView>
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