import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Index = props => {
  const item = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.agentContainer}>
        <Text style={styles.agentText}>{item?.name}</Text>
      </View>
      <View style={styles.agentContactContainer}>
        <Text style={styles.agentContactText}>Email: {item?.email}</Text>
        <Text style={styles.agentContactText}>Phone: {item?.phone}</Text>
      </View>
      <View style={styles.agentAddressContainer}>
        <Text style={styles.agentAddressText}>{item?.address}</Text>
        <Text style={[styles.agentAddressText, {fontWeight: 'bold'}]}>
          {item?.city}
        </Text>
      </View>
    </View>
  );
};

export default Index;
