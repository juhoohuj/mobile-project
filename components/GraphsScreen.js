import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import ScrollGraphProps from "../components/ScrollGraphProps"
import Styles from "../styles/Styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const GraphsScreen = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const retrievedData = await AsyncStorage.getItem('@graphStructure');
            const parsedData = JSON.parse(retrievedData);
            setData(parsedData);
        };
  
        getData();
    }, []);
  
    const graphName = "Weight";
    const graphUnits = "Kg";

    return (
        <ScrollView style={Styles.container}>
            <ScrollGraphProps data={[{ graphName, graphUnits }]} graphIndex={0}/>
            {data &&
                data.map((graph, index) => (
                <ScrollGraphProps key={index} data={data} graphIndex={index} />
                ))}
        </ScrollView>
    );
}

export {GraphsScreen};