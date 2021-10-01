import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import * as bookingAction from '../../redux/actions/bookingAction';
import * as transactionAction from '../../redux/actions/transactionAction';
import Transaction from '../../components/UI/Transaction';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllTransactions = async () => {
    await dispatch(transactionAction.allTransactions());
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchAllTransactions();
    });
    return unsubscribe;
  }, [props.navigation]);

  const transactionData = useSelector(
    state => state.transaction?.allTransactionData,
  );
  console.log('Transaction Data', transactionData);

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
    </View>
  );
};

export default Index;
