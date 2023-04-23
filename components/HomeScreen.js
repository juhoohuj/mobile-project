import { View, Text } from "react-native";
import WorkoutTimer from "./StartWorkout";
import { useSafeAreaInsets,} from 'react-native-safe-area-context';


 const HomeScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{paddingTop: insets.top, }}>
            <WorkoutTimer/>
        </View>
    )
 }


 export {HomeScreen}