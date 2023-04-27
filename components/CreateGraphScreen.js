import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateGraphScreen = () => {
  const [graphName, setGraphName] = useState('')
  const [graphUnits, setUnits] = useState('')

  const [graphs, setGraphs] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('@graphStructure');
        console.log(retrievedData);
        setGraphs(JSON.parse(retrievedData));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  function createGraph() {
    const newGraph = {
      graphName: graphName.trim(),
      graphUnits: graphUnits.trim(),
    }
    if(graphName !== '' && graphUnits !== '' ) {
      try {
        AsyncStorage.getItem('@graphStructure').then((storedData) => {
          let graphData = [];
          if (storedData !== null) {
            graphData = JSON.parse(storedData);
          }

          const existingGraph = graphData.find((graph) => graph.graphName === newGraph.graphName);
          if (existingGraph) {
            Alert.alert('Error', 'A graph with the same name already exists. Please choose a different name.')
            return;
          }

          console.log("-------------------", newGraph)
          console.log("++++++++----", graphData)
          graphData.push(newGraph);
          console.log("++++++++", graphData)
          setGraphs(graphData)
  
          AsyncStorage.setItem('@graphStructure', JSON.stringify(graphData));
          console.log('Graph saved successfully');
          Alert.alert('Graph saved successfully');
          setGraphName('');
          setUnits('')
          // Keyboard.dismiss();
  
        });
      } catch (e) {
        console.log(e);
        Alert.alert('Error saving graph');
      }
      } else {
        Alert.alert('Please enter a graph name and units')
      }
    }
   

    function deleteGraph(graph) {
      Alert.alert(
        'Delete Graph',
        `Are you sure you want to delete the graph "${graph.graphName}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            onPress: () => {
              const newGraphs = graphs.filter(item => item.graphName !== graph.graphName);
              setGraphs(newGraphs);
              AsyncStorage.setItem('@graphStructure', JSON.stringify(newGraphs));
            },
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Graph name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Graph name"
        placeholderTextColor="#d3d9ce"
        onChangeText={(text) => setGraphName(text)}
        defaultValue={graphName}
      />
      <Text style={styles.label}>Graph units:</Text>
      <TextInput
        style={styles.input}
        placeholder="Graph units"
        placeholderTextColor="#d3d9ce"
        onChangeText={(text) => setUnits(text)}
        defaultValue={graphUnits}
      />
      <Button
        style={styles.button}
        title="Create Graph"
        onPress={createGraph}
      />
      {graphs.map((graph) => {
        return (
          <View style={styles.graphContainer} key={graph.graphName+graph.graphUnits}>
            <Text style={styles.graphName}>{graph.graphName}</Text>
            <Text style={styles.graphUnits}>{graph.graphUnits}</Text>
            <Button
              style={styles.deleteButton}
              title="Delete Graph"
              onPress={() => {
                deleteGraph(graph);
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#191D32",
    height: "100%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    color: "#fff",
    
  },
  button: {
    marginTop: 10,
  },
  graphContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  graphName: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#d3d9ce",
  },
  graphUnits: {
    marginBottom: 5,
    color: "#d3d9ce",
  },
  deleteButton: {
    marginTop: 5,
  },
});

export { CreateGraphScreen };

  





