import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Index = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPressEvent}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Index;
