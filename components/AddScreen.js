import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";



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
        <View>
            <View>
                <Text>MORO</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setValue(text)}
                    value={value}
                />
                <Button title="Save" onPress={() => {buttonPressed()}}/>
                <Text>{text}</Text>
            </View>
            <View>
                <Text>ADD EXERCISE</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}/>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}/>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}/>
            </View>
        </View>
    )
 }


 export {AddScreen}