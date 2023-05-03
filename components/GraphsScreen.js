import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView} from "react-native";
import ScrollGraphProps from "../components/ScrollGraphProps"
import styles from "../styles/Styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const GraphsScreen = () => {
    const [data, setData] = useState(null);
    const insets = useSafeAreaInsets();

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
        <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
            <ScrollView style={styles.container}>
                <ScrollGraphProps data={[{ graphName, graphUnits }]} graphIndex={0}/>
                {data &&
                    data.map((graph, index) => (
                    <ScrollGraphProps key={index} data={data} graphIndex={index} />
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export {GraphsScreen};