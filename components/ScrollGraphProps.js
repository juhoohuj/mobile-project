import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, TextInput, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/Styles";



export default function ScrollGraphProps({ data, graphIndex }){

  console.log("Whole data:", graphIndex, data)
  
  if (!data) {
    return null;
  }

console.log(graphIndex)

const graphName = data[graphIndex].graphName
const graphUnits = data[graphIndex].graphUnits

const STORAGE_KEY = "@savedGraphData" + graphName
// console.log(STORAGE_KEY)
const [DataPointDate, setDataPointDate] = useState([]);
const [mainDataPoint, setMainDataPoint] = useState([]);
const [inputWeight, setInputWeight] = useState(70)

const [SelectedDataPoint, setSelectedDataPoint] = useState("--")
const [SelctedDataPointDate, setSelctedDataPointDate] = useState("--.--.----")

const itemsPerPage = 7;
const [currentIndex, setCurrentIndex] = useState(0);

// Use effect to get data from local storage 
useEffect(() => {
  async function getData() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data !== null) {
        const { DataPointDate, mainDataPoint } = JSON.parse(data);
        //console.log(data)
        setDataPointDate(DataPointDate);
        setMainDataPoint(mainDataPoint);
        setCurrentIndex(
          DataPointDate.length - itemsPerPage > itemsPerPage
            ? DataPointDate.length - itemsPerPage
            : 0
        );
      } else {
        console.log("no data");
      }
    } catch (e) {
      console.error(e);
    }
  }
  if(data !== null) {
    getData();
  }
}, []);

// Use effect to save data to local storage
useEffect(() => {
  async function setData() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ DataPointDate, mainDataPoint })
      );
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
    setInputWeight(70)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}
// deleteData()





// Check if the current index is the first page
const isFirstPage = currentIndex <= 0;
// Check if the current index is the last page
const isLastPage = currentIndex >= mainDataPoint.length - itemsPerPage;

// Get the displayed items from the main data array based on the current index and the items per page value
const displayedItems = mainDataPoint.slice(currentIndex, currentIndex + itemsPerPage);
const displayedItems2 = DataPointDate.slice(currentIndex, currentIndex + itemsPerPage);

// Buffers will be rendered but not visible to the user, makes the graph look better
const minBuffer = Math.min(...displayedItems) - 5;
const maxBuffer = Math.max(...displayedItems) + 5;


function handleAddWeight(){
    currentDate = new Date()
    console.log(currentDate.toLocaleDateString())
    setDataPointDate([...DataPointDate, currentDate.toLocaleDateString()])
    setMainDataPoint([...mainDataPoint, parseFloat(inputWeight)])

    //Set the currently shown datapoints to show the new data
    const newIndex = currentIndex + 1;
    
    // Set current index to the last page but only if length is greater than items per page
    if (mainDataPoint.length > itemsPerPage) {
      setCurrentIndex(mainDataPoint.length - itemsPerPage + 1);
    }

  }

function handleRangeButtonPress(increment) {
  const newIndex = currentIndex + increment;

  // Check if the new index is out of bounds
  if (newIndex < 0) {
      setCurrentIndex(0);

    // Check if the new index is out of bounds
  } else if (newIndex > mainDataPoint.length - itemsPerPage) {
      setCurrentIndex(mainDataPoint.length - itemsPerPage);
  } else { 
    setCurrentIndex(newIndex); // If the new index is in bounds, set it as the current index
  }
};
  // const newValue = inputValue.replace(/[^0-9.]/g, '');
  
function handleInputChange(inputValue) {
  setInputWeight(inputValue);
}


function handleInputButtonChange(inputValue) {
  newValue = parseFloat(inputWeight) + inputValue
  setInputWeight(parseFloat(newValue).toFixed(1))  
}


  if (mainDataPoint.length == 0){
    return (
      <View style={styles.graphContainer}>
        <Text style={styles.graphName}>{graphName}</Text>
            <View style={{flexDirection: "row", width: Dimensions.get("window").width - 30, justifyContent: "space-between", alignItems: "flex-start"}}>
                <Text style={styles.graphInfoText}>{SelectedDataPoint}</Text>
                <Text style={styles.graphInfoText}>{SelctedDataPointDate}</Text>
            </View>
        <View style={styles.graphSkeleton}>
          <Text style={{color: "#000"}}>No data</Text>
        </View>
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
            <Text style={styles.graphName}>{graphName}</Text>
            <View style={{flexDirection: "row", width: Dimensions.get("window").width - 30, justifyContent: "space-between", alignItems: "flex-start"}}>
                <Text style={styles.graphInfoText}>{SelectedDataPoint}</Text>
                <Text style={styles.graphInfoText}>{SelctedDataPointDate}</Text>
            </View>
           <View>
            {/* // style={styles.graphScrollContainer}
            // horizontal={true}
            // // The graph will be scrolled to the end on load
            // contentOffset={{ x: mainDataPoint.length * 200, y: 0 }}
            // showsHorizontalScrollIndicator={false}
            // // Auto scroll to end when new measurement is added
            // ref={ref => {this.scrollView = ref}}
            // onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} */}
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
                    yAxisSuffix={graphUnits}
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
                    setSelectedDataPoint(value + graphUnits)
                    console.log(displayedItems2)
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