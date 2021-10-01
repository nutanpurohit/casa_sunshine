import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {numberFormat} from '../../../constants/commonFunctions';
import moment from 'moment';

const Index = props => {
  const item = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          Amount: {numberFormat(item.amount)}
        </Text>
        <Text style={styles.accountText}>Account Name: {item.account}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitleText}>Description</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Transaction Date:{' '}
          {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
        </Text>
      </View>
    </View>
  );
};

export default Index;
