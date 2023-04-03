import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage";
import { TextInput } from "react-native";
import { Button } from "react-native";

const STORAGE_KEY = '@todo-Key';

const HomeScreen = (navigation, route) => {
    
    const [todos, setTodos] = useState([]);
    
    /*const [todos, setTodos] = useState(
        Array(20).fill('').map((_,i) => (`Test ${i}`))
    );*/
    
    const getMyStringValue = async () => {
        try {
          return await AsyncStorage.getItem('@key')
        } catch(e) {
            console.log(e)
        }
      
        console.log('Done.')
      }

      const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
        } catch (e){
            console.log(e);
        }
      }

    const getData = async() => {
        try {
            return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = [];
                }
                setTodos(json);
            })
            .catch (error => console.log(error));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (route.params?.todo) {
            const newKey = todos.length + 1;
            const newTodo = {key: newKey.toString(), description: route.params.todo};
            const newTodos = [...todos,newTodo];
            storeData(newTodos);
        }
        getData();
    }, [route.params?.todo])


    return (
        <View>

            <TextInput onChangeText={text => storeData(text)} ></TextInput>
            
            {
                todos.map((todo) => (
                    <View key={todo.key}>
                        <Text>{todo.description}</Text>
                    </View>
                ))
            }
        </View>
    )
}

 export {HomeScreen}