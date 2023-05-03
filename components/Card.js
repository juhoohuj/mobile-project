import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons';
import styles from "../styles/Styles";

export default function Card({ navigation, cardText, destination, icon }) {
    return(
        <TouchableOpacity style={{flexDirection: "row",  backgroundColor: '#0d2863', borderRadius: 25, borderColor: '#334195', borderWidth: 2, height: 150, width: 190, alignItems: "center", justifyContent: "space-evenly",  marginBottom: 5, marginTop: 15}}  onPress={() => navigation.navigate(destination)}>
          <Text style={styles.profileText}>{cardText}</Text>
        	<Entypo name={icon} size={48} color="white" />
        </TouchableOpacity>
    )
}