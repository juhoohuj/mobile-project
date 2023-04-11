import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView, Pressable } from "react-native";
import styles from "../styles/Styles";
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function ScrollGraphProps({dataPointDates, DataUnitsType, mainDataPoints, GraphName}){
  
const [inputWeight, setInputWeight] = useState(mainDataPoints[mainDataPoints.length - 1])
const [SelectedDataPoint, setSelectedDataPoint] = useState("--")
const [SelctedDataPointDate, setSelctedDataPointDate] = useState("--.--.----")

console.log(typeof(mainDataPoints[mainDataPoints.length - 1]))
console.log(mainDataPoints[mainDataPoints.length - 1])

const [DataPointDate, setDataPointDate] = useState([...dataPointDates])
const [mainDataPoint, setMainDataPoint] = useState([...mainDataPoints])

// log last element from array MainDataPoints

// console.log(mainDataPoints[])

const itemsPerPage = 7;
const [currentIndex, setCurrentIndex] = useState(mainDataPoint.length - itemsPerPage);


// let mainDataPoint = mainDataPoints
// let DataPointDate = dataPointDates

// let rangeStart = -14
// let rangeEnd = -7

// const [graphWidth, setGraphWidth] = useState(mainDataPoint.length > 3 ? Dimensions.get("window").width - 20 + (100 * mainDataPoint.length) - 400: Dimensions.get("window").width - 20)

// const [DataRange, setDataRange] = useState(mainDataPoint.slice(-7))
// const [DateRange, setDateRange] = useState(DataPointDate.slice(-7))

// const [rangeStart, setrangeStart] = useState(-7)
// const [rangeEnd, setrangeEnd] = useState(0)



// console.log(mainDataPoint)


// console.log(DataRange)
// console.log(DateRange)

// function changeRange(direction) {

//   console.log(rangeStart, rangeEnd)
//   // console.log(direction)
//   if (direction == "back"){
//     setrangeEnd(rangeEnd -7)
//     setrangeStart(rangeStart -7)

//     setDateRange(DataPointDate.slice(rangeStart, rangeEnd))
//     setDataRange(mainDataPoint.slice(rangeStart, rangeEnd))

//     // rangeStart = rangeStart -7
//     // rangeEnd = rangeEnd -7
//     console.log(rangeStart, rangeEnd)
    
    
//   }
//   else {
//     setrangeEnd(rangeEnd +7)
//     setrangeStart(rangeStart +7)

//     setDateRange(DataPointDate.slice(rangeStart, rangeEnd))
//     setDataRange(mainDataPoint.slice(rangeStart, rangeEnd))

//     // rangeStart = rangeStart +7
//     // rangeEnd = rangeEnd +7
//     console.log(rangeStart, rangeEnd)

//   }

// }



const handleRangeButtonPress = (increment) => {
  const newIndex = currentIndex + increment;
  
  console.log(newIndex, currentIndex);
  
  if (newIndex < 0) {
    // console.log('setting newIndex to 0');
    setCurrentIndex(0);
  } else if (newIndex > mainDataPoint.length - itemsPerPage) {
    // console.log('setting newIndex to max');
    setCurrentIndex(mainDataPoint.length - itemsPerPage);
  } else {
    setCurrentIndex(newIndex);
  }
};

const isFirstPage = currentIndex === 0;
const isLastPage = currentIndex === mainDataPoint.length - itemsPerPage;


const displayedItems = mainDataPoint.slice(currentIndex, currentIndex + itemsPerPage);
const displayedItems2 = DataPointDate.slice(currentIndex, currentIndex + itemsPerPage);

// console.log(displayedItems)


function handleAddWeight(){
    currentDate = new Date()
    setDataPointDate([...DataPointDate, currentDate.toLocaleDateString()])
    setMainDataPoint([...mainDataPoint, parseFloat(inputWeight)])

//Set the currently shown datapoints to show the new data
    const newIndex = currentIndex + 1;
    setCurrentIndex(mainDataPoint.length - itemsPerPage + 1);
    console.log("adsasdasdasd    ", newIndex, currentIndex);

  
    // if(mainDataPoint.length > 3) {
    //     setGraphWidth(graphWidth + 100)
    // }
  }

function handleInputChange(inputValue) {
  // const newValue = inputValue.replace(/[^0-9.]/g, '');
  setInputWeight(inputValue);
}


  if (mainDataPoint.length == 0){
    return (
      <View style={styles.graphContainer}>
        <Text style={styles.graphName}>No data</Text>
        <TextInput
          style={styles.graphInput}
          value={inputWeight.toString()}
          onChangeText={value => setInputWeight(value)}
          placeholder="Input your weight"
          keyboardType="numeric"/>
          <Pressable onPress={handleAddWeight}>
              <Ionicons name="add-circle-sharp" size={54} color="white" />
          </Pressable>
      </View>
    )
  }

    return (
        <View style={styles.graphContainer}>
            <Text style={styles.graphName}>{GraphName}</Text>
            <View style={{flexDirection: "row", width: Dimensions.get("window").width - 30, justifyContent: "space-between", alignItems: "flex-start"}}>
                <Text style={styles.graphInfoText}>{SelectedDataPoint}</Text>
                <Text style={styles.graphInfoText}>{SelctedDataPointDate}</Text>
            </View>
           <ScrollView
            style={styles.graphScrollContainer}
            horizontal={true}
            // The graph will be scrolled to the end on load
            contentOffset={{ x: mainDataPoint.length * 200, y: 0 }}
            showsHorizontalScrollIndicator={false}
            // Auto scroll to end when new measurement is added
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
                  <LineChart
                    data={{
                    labels: displayedItems2,
                    datasets: [
                        {
                        data: displayedItems
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix={DataUnitsType}
                    yAxisInterval={1}
                    chartConfig={{
                    backgroundColor: "#020887",
                    backgroundGradientFrom: "#222222",
                    backgroundGradientTo: "#020887",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForVerticalLabels:{
                      // fontSize: "14",
                      rotation: 25,
                      // alignmentBaseline: "ideographic"
                      // disabled: "true"

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
                    
                    onDataPointClick={({value, index, getColor}) => {
                    // console.log("Weight: " + value + "kg" + " Date: " + DataPointDate[index])
                    setSelectedDataPoint(value + DataUnitsType)
                    setSelctedDataPointDate(DataPointDate[index])
                    }}/>
                </ScrollView>
                <View style={{flexDirection: "row", width: Dimensions.get("window").width - 30, justifyContent: "space-between", alignItems: "flex-start"}}>


                  <Pressable onPress={() => handleRangeButtonPress(-itemsPerPage)}>
                    <AntDesign name="arrowleft" size={54} color={isFirstPage ? "gray" : "white"} />
                  </Pressable>

                  <TextInput
              style={styles.graphInput}
              // value={inputWeight.toFixed(1)}
              keyboardType="numeric"
              decimalSeparator="."
              value={inputWeight.toString()}
              onChangeText={handleInputChange} />


                <Pressable onPress={() => handleRangeButtonPress(itemsPerPage)}>
                  <AntDesign name="arrowright" size={54} color={isLastPage ? "gray" : "white"} />
                </Pressable> 
              </View>

              <View style={{flexDirection: "row", justifyContent: "space-between", width: Dimensions.get("window").width - 30}}>

                <Pressable onPress={() => setInputWeight(parseFloat(inputWeight - 1))}>
                  <Text style={styles.graphButton}>-1</Text>
                </Pressable>
                <Pressable onPress={() =>  setInputWeight(parseFloat(inputWeight - 0.5))}>
                  <Text style={styles.graphButton}>-0.5</Text>
                </Pressable>
                <Pressable onPress={() =>  setInputWeight(parseFloat(inputWeight - 0.1).toFixed(1))}>
                  <Text style={styles.graphButton}>-0.1</Text>
                </Pressable>


                <Pressable onPress={() => {
                  newValue = parseFloat(inputWeight) + 0.1
                  console.log("inputWeight: ", inputWeight)
                  console.log("newValue: ", newValue)
                  setInputWeight(parseFloat(newValue).toFixed(1))  
                }
                } >
                {/* <Pressable onPress={() => setInputWeight(parseFloat(inputWeight + 0.1).toFixed(1))}> */}
                  <Text style={styles.graphButton}>+0.1</Text>
                </Pressable>
                <Pressable onPress={() => setInputWeight(parseFloat(inputWeight + 0.5))}>
                  <Text style={styles.graphButton}>+0.5</Text>
                </Pressable>
                <Pressable onPress={() => setInputWeight(parseFloat(inputWeight + 1))}>
                  <Text style={styles.graphButton}>+1</Text>
                </Pressable>

              </View>


            <Pressable onPress={handleAddWeight}>
              <Ionicons name="add-circle-sharp" size={54} color="white" />
            </Pressable>
    </View>
  )
}