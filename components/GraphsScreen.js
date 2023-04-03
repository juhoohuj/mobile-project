import React from "react";
import { ScrollView } from "react-native";
import ScrollGraphProps from "../components/ScrollGraphProps"

const GraphsScreen = () => {
    return (
        <ScrollView>
            <ScrollGraphProps GraphName={"Weight"} DataUnitsType="kg" dataPointDates={[]} mainDataPoints={[]}/>
            <ScrollGraphProps GraphName={"Joku1"} DataUnitsType="cm" dataPointDates={["30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023",]} mainDataPoints={[60, 61, 62, 60, 60, 61, 62, 60, 60, 61, 62, 60, ]}/>
            <ScrollGraphProps GraphName={"Joku2"} DataUnitsType="kg" dataPointDates={["30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023",]} mainDataPoints={[60, 61, 62, 60, 60, 61, 62, 60, 60, 61, 62, 60, ]}/>
        </ScrollView>
    )
 }

export {GraphsScreen}