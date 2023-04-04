import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import styles from "../styles/Styles";



 const AddScreen = () => {
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const saveData = async (value) => {
        try {
            await AsyncStorage.setItem("test", JSON.stringify(value));
            alert("Data successfully saved")
          } catch (error) {
            console.log(error);
            alert("Something went wrong")
          }
        };

    const getData = async () => {
        try {
            const savedData = await AsyncStorage.getItem("test");
            const currentData = JSON.parse(savedData);
            console.log(currentData);
            setText(currentData);

        } catch (error) {
            console.log(error);
        }
        };

    function buttonPressed() {
        saveData(value);
        getData();  
    }


    

    return (
        <View style={styles.AddScreenContainer}>
             <Text style={styles.headerStyle}>ADD EXERCISE</Text>
            <View>
                <TextInput
                    style={styles.TextInput} textAlign={'center'} placeholder="#"  
                    onChangeText={text => setValue(text)}
                    value={value}
                />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                <TextInput style={styles.TextInput} textAlign={'center'} placeholder="#"  />
                
                <Button title="Save" onPress={() => {buttonPressed()}}/>
                <Text style={styles.savedText}>{text}</Text>
            </View>

        </View>
    )
 }


 export {AddScreen}