import { View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { Header } from "@react-navigation/elements";
import {SafeAreaProvider, useSafeAreaInsets,} from 'react-native-safe-area-context';



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


    const insets = useSafeAreaInsets();

    return (
    
        <ScrollView style={{paddingTop: insets.top,}}>
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
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}/>
                <Text>ADD EXERCISE</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}/>
                <Text>ADD EXERCISE</Text>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}/>
            </View>
        </ScrollView>
    )
 }


 export {AddScreen}