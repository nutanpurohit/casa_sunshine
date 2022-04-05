import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Index = props => {
  const source = require('../../../data/uploads/1710c3b3-9263-4296-b404-e117b97e8674.pdf');
  console.log('Source', source);
  return (
    <View style={styles.container}>
      <Text>PDF</Text>
    </View>
  );
};

export default Index;
