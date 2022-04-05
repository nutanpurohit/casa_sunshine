import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Picker} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import * as bookingAction from '../../redux/actions/bookingAction';
import * as transactionAction from '../../redux/actions/transactionAction';
import Transaction from '../../components/UI/Transaction';
import Modal from 'react-native-modal';
import {Paragraph, Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {
  ACCOUNT1,
  ACCOUNT2,
  ACCOUNT3,
  ACCOUNT4,
  ACCOUNT5,
} from '../../constants/constants';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const accountType = [
    {type: ACCOUNT1},
    {type: ACCOUNT2},
    {type: ACCOUNT3},
    {type: ACCOUNT4},
    {type: ACCOUNT5},
  ];

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

  const applyFilter = type => {
    const data = transactionData?.filter(item => item.account !== type);
    console.log('Filter Data', data);
    setFilter(true);
    setFilterData(data);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <Title>Filters</Title>
          <Paragraph>Select Account</Paragraph>
          <Picker
            style={{width: '50%'}}
            name={accountType}
            selectedValue={selectedAccountType}
            mode={'model'}
            onValueChange={itemValue => {
              setSelectedAccountType(itemValue);
            }}>
            {accountType.map((s, i) => {
              return <Picker.Item value={s.type} label={s.type} key={i} />;
            })}
          </Picker>
          <TouchableOpacity
            style={[styles.modalButton, {padding: '4%'}]}
            onPress={() => {
              setShowModal(false);
              applyFilter(selectedAccountType);
            }}>
            <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, {padding: '4%'}]}
            onPress={() => {
              setShowModal(false);
              setFilter(false);
            }}>
            <Text style={styles.applyFilterButtonText}>Clear Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              {padding: '4%', backgroundColor: colors.RED},
            ]}
            onPress={() => setShowModal(false)}>
            <Text style={styles.applyFilterButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.applyFilterButton}
        onPress={() => setShowModal(true)}>
        <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
        <Ionicons name={'filter'} color={colors.WHITE} size={25} />
      </TouchableOpacity>
      {transactionData?.length > 0 ? (
        filter ? (
          <FlatList
            data={filterData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <Transaction props={props} item={item} index={index} />;
            }}
            style={{width: '90%'}}
          />
        ) : (
          <FlatList
            data={transactionData}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <Transaction props={props} item={item} index={index} />;
            }}
            style={{width: '90%'}}
          />
        )
      ) : (
        <Text>No Transactions Found</Text>
      )}
    </View>
  );
};

export default Index;
