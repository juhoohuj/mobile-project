import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button, ScrollView} from "react-native";
import WeightGraph from "./WeightGraph";
import ScrollableGraph from "./ScrollableGraph";
 const ProfileScreen = () => {
    return (
        <View>
            {/* <WeightGraph /> */}
            <ScrollableGraph />
        </View>
    )
 }


 export {ProfileScreen}