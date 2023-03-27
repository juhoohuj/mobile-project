import { View, Text, ScrollView, useState } from "react-native";

const [workOut, setWorkOuts] = useState(Array(20).fill('').map((_,i) => ('Test ${i}')));

 const HomeScreen = () => {
    return (
        <View>
            <ScrollView>
                {
                workOut.map((workOut,index) => (
                    <View key={index} style={StyleSheet.rowContainer}>
                        <Text style={StyleSheet.rowText}>{workOut}</Text>
                    </View>
                ))
                }
            </ScrollView>
        </View>
    )
 }


 export {HomeScreen}