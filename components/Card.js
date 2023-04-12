import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function Card({ navigation, cardText, destination, icon }) {
    return(
        <TouchableOpacity style={{flexDirection: "row",  backgroundColor: '#334195', borderRadius: 25, height: 130, width: 155, alignItems: "center", justifyContent: "space-evenly"}}  onPress={() => navigation.navigate(destination)}>
          <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>{cardText}</Text>
        	<Entypo name={icon} size={48} color="white" />
        </TouchableOpacity>
    )
}