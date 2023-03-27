import { View, Text, ScrollView, useState } from "react-native";
<<<<<<< Updated upstream

const [workOut, setWorkOuts] = useState(Array(20).fill('').map((_,i) => ('Test ${i}')));
=======
import React from 'react';
>>>>>>> Stashed changes

 const HomeScreen = () => {

    
    const [workOuts, setWorkOuts] = useState(
        Array(20).fill('').map((_,i) => ('Test ${i}')));

    return (
        <View>
            <ScrollView>
                {
<<<<<<< Updated upstream
                workOut.map((workOut,index) => (
                    <View key={index} style={StyleSheet.rowContainer}>
                        <Text style={StyleSheet.rowText}>{workOut}</Text>
=======
                workOuts.map((workOut,index) => (
                    <View key={index}>
                        <Text>{workOut}</Text>
>>>>>>> Stashed changes
                    </View>
                ))
                }
            </ScrollView>
        </View>
    )
}

 export {HomeScreen}