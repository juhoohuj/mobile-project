import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView, Pressable } from "react-native";
import styles from "../styles/Styles";
import { useState, useEffect } from 'react';
import { LineChart } from "react-native-chart-kit";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@savedGraphData"


export default function ScrollGraphProps({dataPointDates, DataUnitsType, mainDataPoints, GraphName}){
const [SelectedDataPoint, setSelectedDataPoint] = useState("--")
const [SelctedDataPointDate, setSelctedDataPointDate] = useState("--.--.----")

// console.log(typeof(mainDataPoints[mainDataPoints.length - 1]))
// console.log(mainDataPoints[mainDataPoints.length - 1])

// const [DataPointDate, setDataPointDate] = useState([...dataPointDates])
// const [mainDataPoint, setMainDataPoint] = useState([...mainDataPoints])

// log last element from array MainDataPoints

// console.log(mainDataPoints[])

const itemsPerPage = 7;
// const [currentIndex, setCurrentIndex] = useState(mainDataPoint.length - itemsPerPage);
const [currentIndex, setCurrentIndex] = useState(0);



const [DataPointDate, setDataPointDate] = useState([]);
const [mainDataPoint, setMainDataPoint] = useState([]);

const [inputWeight, setInputWeight] = useState(12)


useEffect(() => {
  async function getData() {
    try {



      const dataPointDateValue = await AsyncStorage.getItem('@dataPointDate');
      const mainDataPointValue = await AsyncStorage.getItem('@mainDataPoint');
      let dataPointDateValueParsed = JSON.parse(dataPointDateValue)
      let mainDataPointValueParsed = JSON.parse(mainDataPointValue)
      // console.log("dataPointDateValueParsed ", dataPointDateValueParsed)
      // console.log("mainDataPointValueParsed ", mainDataPointValueParsed)

      if (dataPointDateValueParsed.length <= 0 || mainDataPointValue === null) {
        setDataPointDate([
          '1.1.2022',
          '2.1.2022',
          '3.1.2022',
          '4.1.2022',
          '5.1.2022',
          '6.1.2022',
          '7.1.2022',
          '8.1.2022',
          '9.1.2022',
          '10.1.2022',
          '11.1.2022',
          '12.1.2022',
          '13.1.2022',
          '14.1.2022',
          '15.1.2022',
          '16.1.2022',
          '17.1.2022',
          '18.1.2022'
        ]);
        // setMainDataPoint([150, 148, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136, 135, 134, 133, 132, 131]);
        setMainDataPoint(Array.from({length: 15}, () => (Math.random() * (92 - 80) + 80).toFixed(1)));
        setCurrentIndex(18 - itemsPerPage)
        setInputWeight(70);
        console.log("---------------- ", currentIndex)

      } else {
        setDataPointDate(dataPointDateValueParsed.length > 0 ? dataPointDateValueParsed : []);
        setMainDataPoint(mainDataPointValueParsed.length > 0 ? mainDataPointValueParsed : []);
        setCurrentIndex(dataPointDateValueParsed.length - itemsPerPage > itemsPerPage ? dataPointDateValueParsed.length - itemsPerPage : 0)
        console.log("++++++++++++++++ ", dataPointDateValueParsed.length - itemsPerPage > 0 ? dataPointDateValueParsed.length - itemsPerPage : 0)
        setInputWeight(mainDataPointValueParsed[mainDataPointValueParsed.length - 1]);
      }

      // setDataPointDate(dataPointDateValueParsed.length > 0 ? dataPointDateValueParsed : []);
      // setMainDataPoint(mainDataPointValueParsed.length > 0 ? mainDataPointValueParsed : []);
      // setCurrentIndex(mainDataPoint.length - itemsPerPage > 0 ? mainDataPoint.length - itemsPerPage : 0)
      // setInputWeight(mainDataPointValueParsed[mainDataPointValueParsed.length - 1]);



      // setInputWeight(mainDataPointValue[mainDataPointValue.length - 1])
      // console.log("ppppppppppppppppppppppp ", mainDataPointValue)
      // // setCurrentIndex(mainDataPoint.length - itemsPerPage)
    } catch (e) {
      console.error(e);
    }
  }
  getData();
}, []);

useEffect(() => {
  async function setData() {
    try {
      await AsyncStorage.setItem('@dataPointDate', JSON.stringify(DataPointDate));
      await AsyncStorage.setItem('@mainDataPoint', JSON.stringify(mainDataPoint));
    } catch (e) {
      console.error(e);
    }
  }
  setData();
}, [DataPointDate, mainDataPoint]);



// Delete data from local storage
const deleteData = async () => {
  try {
    await AsyncStorage.removeItem('@dataPointDate')
    await AsyncStorage.removeItem('@mainDataPoint')
    setDataPointDate([])
    setMainDataPoint([])
    setCurrentIndex(0)
    setInputWeight(12)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}
// deleteData()




//get data from local storage
// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
//     console.log("Haettu2: ", jsonValue)
//     setMainDataPoint(...[jsonValue])
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     // error reading value
//   }
// }
// getData()


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
  
  // console.log(newIndex, currentIndex);
  
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


// Check if the current index is the first page
const isFirstPage = currentIndex <= 0;
// Check if the current index is the last page, first page can also be last page
const isLastPage = currentIndex >= mainDataPoint.length - itemsPerPage;



const displayedItems = mainDataPoint.slice(currentIndex, currentIndex + itemsPerPage);
const displayedItems2 = DataPointDate.slice(currentIndex, currentIndex + itemsPerPage);


// Will be rendered on graph to buffer the data, making the graph look cleaner
const minBuffer = Math.min(...displayedItems) - 5;
const maxBuffer = Math.max(...displayedItems) + 5;

console.log(minBuffer, maxBuffer)

// console.log(displayedItems)

// function handleAddWeight(){
//   const currentDate = new Date().toLocaleDateString();


//   const existingIndex = DataPointDate.indexOf(currentDate);
//   if (existingIndex !== -1) {
//       // Replace the existing weight value with the new one
//       const newMainDataPoint = [...mainDataPoint];
//       newMainDataPoint[existingIndex] = parseFloat(inputWeight);
//       setMainDataPoint(newMainDataPoint);
//   } else {
//       // Add the new weight value and date to the arrays
//       setDataPointDate([...DataPointDate, currentDate]);
//       setMainDataPoint([...mainDataPoint, parseFloat(inputWeight)]);
//   }
  
//   // Set the currently shown data points to show the new data
//   const newIndex = currentIndex + 1;
//   setCurrentIndex(mainDataPoint.length - itemsPerPage + 1);
// }


function handleAddWeight(){
    currentDate = new Date()
    setDataPointDate([...DataPointDate, currentDate.toLocaleDateString()])
    setMainDataPoint([...mainDataPoint, parseFloat(inputWeight)])

//Set the currently shown datapoints to show the new data
    const newIndex = currentIndex + 1;
    
    // Set current index to the last page but only if length is greater than items per page
    if (mainDataPoint.length > itemsPerPage) {
      setCurrentIndex(mainDataPoint.length - itemsPerPage + 1);
    }

    // setCurrentIndex(mainDataPoint.length - itemsPerPage + 1);

  
//     // if(mainDataPoint.length > 3) {
//     //     setGraphWidth(graphWidth + 100)
//     // }


  }

function handleInputChange(inputValue) {
  // const newValue = inputValue.replace(/[^0-9.]/g, '');
  
  setInputWeight(inputValue);
}

function handleInputButtonChange(inputValue) {
  newValue = parseFloat(inputWeight) + inputValue

  console.log("inputValue: ", inputValue)
  console.log("newValue: ", newValue)
  setInputWeight(parseFloat(newValue).toFixed(1))  
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
           <View
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
                        },
                        {
                          data: [minBuffer],
                          withDots: false
                        },
                        {
                          data: [maxBuffer],
                          withDots: false
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
                        borderRadius: 16,
                    },
                    propsForVerticalLabels:{
                      // fontSize: "100",
                      rotation: 25,
                      // Add space between graph and labels
                      dy: "5",

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
                    
                    onDataPointClick={({value, index}) => {
                    setSelectedDataPoint(value + DataUnitsType)
                    setSelctedDataPointDate(displayedItems2[index])
                    }}
                    
                    />
                </View>
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

                <Pressable onPress={() => handleInputButtonChange(-1)}>
                  <Text style={styles.graphButton}>-1</Text>
                </Pressable>
                <Pressable onPress={() =>  handleInputButtonChange(-0.5)}>
                  <Text style={styles.graphButton}>-0.5</Text>
                </Pressable>
                <Pressable onPress={() =>  handleInputButtonChange(-0.1)}>
                  <Text style={styles.graphButton}>-0.1</Text>
                </Pressable>


                <Pressable onPress={() => handleInputButtonChange(0.1)} >
                  <Text style={styles.graphButton}>+0.1</Text>
                </Pressable>
                <Pressable onPress={() => handleInputButtonChange(0.5)}>
                  <Text style={styles.graphButton}>+0.5</Text>
                </Pressable>
                <Pressable onPress={() => handleInputButtonChange(1)}>
                  <Text style={styles.graphButton}>+1</Text>
                </Pressable>
              </View>

            <Pressable style={{marginBottom: 20}} onPress={handleAddWeight}>
              <Ionicons name="add-circle-sharp" size={54} color="white" />
            </Pressable>

            <Pressable style={{marginBottom: 20}} onPress={deleteData}>
              <Ionicons name="remove-circle" size={54} color="white" />
            </Pressable>
    </View>
  )
}