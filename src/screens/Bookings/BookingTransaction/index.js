import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Transaction from '../../../components/UI/Transaction';
import * as transactionAction from '../../../redux/actions/transactionAction';
import {useDispatch, useSelector} from 'react-redux';
import Booking from '../../../components/UI/Booking';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const item = props.route.params;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchTransactions(item.id);
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchTransactions = async bookingId => {
    setIsLoading(true);
    await dispatch(transactionAction.fetchAllTransaction(bookingId));
    setIsLoading(false);
  };

  const transactionData = useSelector(
    state => state.transaction.transactionData,
  );
  console.log('Transaction', transactionData);

  return (
    <View style={styles.container}>
      {transactionData?.length > 0 ? (
        <FlatList
          data={transactionData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <Transaction props={props} item={item} index={index} />;
          }}
          style={{width: '90%'}}
        />
      ) : (
        <Text>No Transactions Found</Text>
      )}

      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddTransactionScreen', item)}
        style={styles.addBookingButton}>
        <Ionicons name={'add'} size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
