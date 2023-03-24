import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import BottomNav from './components/BottomNav';
import styles from './styles/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <BottomNav />
    </View>
  );
}


