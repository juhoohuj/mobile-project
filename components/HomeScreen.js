import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage";
import { TextInput } from "react-native";
import { Button } from "react-native";

const STORAGE_KEY = '@exe-Key';

const HomeScreen = () => {
    const [exes, setExes] = useState([]);
    //const [value, setValue] = useState("");
    
    const [text, setText] = useState("");
    /*const [todos, setTodos] = useState(
        Array(20).fill('').map((_,i) => (`Test ${i}`))
    );*/
    

      const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            //await AsyncStorage.setItem('key',JSON.stringify(value));
        } catch (e){
            console.log(e);
        }
      }

            //****getData vanhoja juttuja****
            //const savedValue = await AsyncStorage.getItem('key');
            //const curValue = JSON.parse(savedValue);
            //setText(curValue);

    const getData = async() => {
        try {
            return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = [];
                }
                setExes(json);
            })
            .catch (error => console.log(error));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (text) {
            const newKey = exes.lenght + 1;
            const newExe = {key: newKey.toString(), description: text};
            const newExes = [...exes, newExe];

            storeData(newExes);
        }
        getData();
    }, [text])

    function buttonPressed() {
        storeData(text);
        getData();  
        setText("");
    }


    return (
        <View>
            <Text>Test</Text>

            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => setText(text)}
            />

            <Button title="Test" onPress={() => {buttonPressed()}}/>
            
            {
                exes.map((text) => (
                    <View key={text.key}>
                        <Text>{text.description}</Text>
                    </View>
                ))
            }
            
        </View>
    )
}

 export {HomeScreen}