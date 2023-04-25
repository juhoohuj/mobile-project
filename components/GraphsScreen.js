import React from "react";
import { ScrollView } from "react-native";
import ScrollGraphProps from "../components/ScrollGraphProps"
import Styles from "../styles/Styles"
import AsyncStorage from '@react-native-async-storage/async-storage';



const GraphsScreen = () => {

    return (
        <ScrollView style={Styles.container}>
            <ScrollGraphProps GraphName={"Weight"} DataUnitsType="kg"/>
        </ScrollView>
    )
 }

export {GraphsScreen}