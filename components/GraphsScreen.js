import React from "react";
import { ScrollView } from "react-native";
import ScrollGraphProps from "../components/ScrollGraphProps"

const GraphsScreen = () => {


// let filledArray2 = new Array(400).fill(70);

const n = 71;
let filledArray = new Array(n).fill("30.3.2023");
const arrayN = Array(n).fill('n').map((v,i)=>i+1);
console.log(arrayN)


console.log(arrayN.length)
console.log(filledArray.length)
// console.log(filledArray)
// console.log(filledArray2)
    return (
        <ScrollView>
            <ScrollGraphProps GraphName={"Weight"} DataUnitsType="kg" dataPointDates={filledArray} mainDataPoints={arrayN}/>
            {/* <ScrollGraphProps GraphName={"Weight"} DataUnitsType="kg" dataPointDates={["30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023","30.3.2023","30.3.2023",]} mainDataPoints={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ]}/> */}
            {/* <ScrollGraphProps GraphName={"Joku1"} DataUnitsType="cm" dataPointDates={["30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023",]} mainDataPoints={[60, 61, 62, 60, 60, 61, 62, 60, 60, 61, 62, 60, ]}/> */}
            {/* <ScrollGraphProps GraphName={"Joku2"} DataUnitsType="kg" dataPointDates={["30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023","30.3.2023", "30.3.2023", "30.3.2023", "30.3.2023",]} mainDataPoints={[60, 61, 62, 60, 60, 61, 62, 60, 60, 61, 62, 60, ]}/> */}
        </ScrollView>
    )
 }

export {GraphsScreen}