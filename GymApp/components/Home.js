import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';


export default class FlexDirectionBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Hi user</Text>
        <View style={[{flex: 1}, styles.elementsContainer]}>
          <View style={{flex: 2, backgroundColor: '#647AA3', borderRadius: 25 }} />
          <View style={{flex: 2, backgroundColor: '#334195', borderRadius: 25}} />
          <View style={{flex: 2, backgroundColor: '#020887', borderRadius: 25}} />
        </View>
      </View>
    );
  }
}

