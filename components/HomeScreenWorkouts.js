import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from '../styles/Styles';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreenWorkouts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('workouts');
      if (jsonValue != null) {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpanded = (id) => {
    console.log(id)
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

console.log(expandedIds)

  const RenderItem = ({ index, id, name, moves }) => (
    <View style={{
        borderBottomColor: "#fff", 
        borderBottomWidth: 2,
        marginBottom: 6,
        }}>
      <TouchableOpacity onPress={() => toggleExpanded(index)} style={Styles.homeScreenItem}>
        <Text style={{fontSize: 24, color: "#FFF"}}>{name}</Text>
        <MaterialIcons name="expand-more" size={24} color="white" />
      </TouchableOpacity>
      {expandedIds.includes(index) &&
        moves.map(({ name: moveName, sets }) => (
          <View key={`${moveName}-${id}`}  style={{alignItems: 'center'}}>
            <Text style={{color: "#fff", fontSize: 22, marginBottom: 6}}>{moveName}</Text>
            {sets.map(({ weight, reps }, index) => (
              <View key={`${weight}-${reps}-${index}`}>
                <Text style={{color: "#fff", fontSize: 16}} >Weight: {weight}</Text>
                <Text style={{color: "#fff", fontSize: 16, marginBottom: 6}} >Reps: {reps}</Text>
              </View>
            ))}
          </View>
        ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <RenderItem id={item.id} name={item.name} moves={item.moves} index={index} />
  );

  const keyExtractor = (item, index) => item.id?.toString() || index.toString();

  return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />;
};

export default HomeScreenWorkouts;