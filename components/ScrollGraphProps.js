import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView, Pressable } from "react-native";
import styles from "../styles/Styles";
import { useState } from 'react';
import { LineChart } from "react-native-chart-kit";
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function ScrollGraphProps({dataPointDates, DataUnitsType, mainDataPoints, GraphName}){

const [inputWeight, setInputWeight] = useState(0)
const [SelectedDataPoint, setSelectedDataPoint] = useState("--")
const [SelctedDataPointDate, setSelctedDataPointDate] = useState("--.--.----")


const [DataPointDate, setDataPointDate] = useState([...dataPointDates])
const [mainDataPoint, setMainDataPoint] = useState([...mainDataPoints])


const itemsPerPage = 7;
const [currentIndex, setCurrentIndex] = useState(mainDataPoint.length - itemsPerPage);


// let mainDataPoint = mainDataPoints
// let DataPointDate = dataPointDates

// let rangeStart = -14
// let rangeEnd = -7

const [graphWidth, setGraphWidth] = useState(mainDataPoint.length > 3 ? Dimensions.get("window").width - 20 + (100 * mainDataPoint.length) - 400: Dimensions.get("window").width - 20)

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
    console.log('setting newIndex to 0');
    setCurrentIndex(0);
  } else if (newIndex > mainDataPoint.length - itemsPerPage) {
    console.log('setting newIndex to max');
    setCurrentIndex(mainDataPoint.length - itemsPerPage);
  } else {
    setCurrentIndex(newIndex);
  }
};

const isFirstPage = currentIndex === 0;
const isLastPage = currentIndex === mainDataPoint.length - itemsPerPage;


const displayedItems = mainDataPoint.slice(currentIndex, currentIndex + itemsPerPage);
const displayedItems2 = DataPointDate.slice(currentIndex, currentIndex + itemsPerPage);

console.log(displayedItems)


function handleAddWeight(){
    currentDate = new Date()
    setDataPointDate([...DataPointDate, currentDate.toLocaleDateString()])
    setMainDataPoint([...mainDataPoint, parseFloat(inputWeight)])

  
    if(mainDataPoint.length > 3) {
        setGraphWidth(graphWidth + 100)
    }
  }


  // if (mainDataPoint.length == 0){
  //   return (
  //     <View style={styles.graphContainer}>
  //       <Text style={styles.graphName}>No data</Text>
  //       <TextInput
  //         style={styles.graphInput}
  //         value={inputWeight.toString()}
  //         onChangeText={value => setInputWeight(value)}
  //         placeholder="Input your weight"
  //         keyboardType="numeric"/>
  //         <Pressable onPress={handleAddWeight}>
  //             <Ionicons name="add-circle-sharp" size={54} color="white" />
  //         </Pressable>
  //     </View>
  //   )
  // }

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
                    decimalPlaces: 2, // optional, defaults to 2dp
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
                    console.log("Weight: " + value + "kg" + " Date: " + DataPointDate[index])
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
              value={inputWeight.toString()}
              onChangeText={value => setInputWeight(value)}
              placeholder="Input your weight"
              keyboardType="numeric"/>



                <Pressable onPress={() => handleRangeButtonPress(itemsPerPage)}>
                  <AntDesign name="arrowright" size={54} color={isLastPage ? "gray" : "white"} />
                </Pressable> 
                </View>


            <Pressable onPress={handleAddWeight}>
              <Ionicons style={styles.graphButton} name="add-circle-sharp" size={54} color="white" />
            </Pressable>
    </View>
  )
}

// const styles = StyleSheet.create({
//     containerW: {
//       // backgroundColor: '#fff',
//       alignItems: 'center',
//     },
//     input: {
//       backgroundColor: '#f3f3f3',
//       fontSize: 18,
//       textAlign: "center"
//     },
//     graphScrollContainer: {
//       marginLeft: 10,
//       marginRight: 10
//     }
//   });