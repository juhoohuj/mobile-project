import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";
import Card from "../components/Card";


const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <Text style={styles.headerStyle}>Profile</Text>  
            <View style={{flexDirection: "row", justifyContent: "space-around", padding: 2, flexWrap: "wrap", rowGap: 5}}>
              <Card navigation={navigation} cardText={"Graphs"} icon={"line-graph"}  destination={'Graphs'} />
              <Card navigation={navigation} cardText={"Other"} icon={"code"}  destination={'Home'}/>
            </View>
        </View>
    )
 }
export {ProfileScreen}