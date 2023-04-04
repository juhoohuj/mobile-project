import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage";
import { TextInput } from "react-native";
import { Button } from "react-native";

const STORAGE_KEY = '@exe-Key';

const HomeScreen = () => {
    const [exes, setExes] = useState([]);
    const [value, setValue] = useState("");
    
    const [text, setText] = useState("");
    /*const [todos, setTodos] = useState(
        Array(20).fill('').map((_,i) => (`Test ${i}`))
    );*/
    

      const storeData = async (value) => {
        console.log(value, "valueeeeee");
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            //await AsyncStorage.setItem('key',JSON.stringify(value));
        } catch (e){
            console.log("store", e);
        }
      }
        /*return AsyncStorage.getItem(STORAGE_KEY)
                    .then (req => JSON.parse(req))
                    .then (json => {
                        console.log(req);
                        if (json === null) {
                            json = [];
                            
                        }
                        setExes(json);
                    })
                    .catch (error => console.log("get1",error));*/
            //****getData vanhoja juttuja****
            //const savedValue = await AsyncStorage.getItem('key');
            //const curValue = JSON.parse(savedValue);
            //setText(curValue);

    const getData = async() => {
        
        try {
            const savedValue = await AsyncStorage.getItem(STORAGE_KEY);
            const curValue = JSON.parse(savedValue);
            setValue(curValue);
        } catch (e) {
            console.log("get", e);
        }
    }

    useEffect(() => {
        console.log(text);
        
        /*if (text === "") {
            console.log("ifi sisäl");
            const newKey = exes.lenght + 1;
            const newExe = {key: newKey.toString(), description: text};
            const newExes = [...exes, newExe];

            storeData(newExes);
        }*/
        
    })

    function buttonPressed() {

        
        console.log("ifi sisäl");
        /*const newKey = exes.lenght + 1;
        const newExe = {key: newKey.toString(), description: text};
        const newExes = [...exes, newExe];*/

        console.log("ene storee");
        storeData(text);
        console.log("jälkee storee");

        getData();
    }


    return (
        <View>
            <Text>Test</Text>

            <TextInput style={{ height: 40, borderColor: 'black', borderWidth: 1 }} onChangeText={setText} value={text}
            />

            <Button title="Test" onPress={() => {buttonPressed()}}/>
            
            <Text>{value}</Text>
            
        </View>
    )
}

 export {HomeScreen}