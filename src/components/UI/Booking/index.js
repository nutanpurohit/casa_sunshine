import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import moment from 'moment';
import {dayCount, numberFormat} from '../../../constants/commonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import * as transactionAction from '../../../redux/actions/transactionAction';
import {
  COMPLETED,
  FREE,
  NOT_COMPLETED,
  PENDING,
} from '../../../constants/constants';

const Index = ({props, item, index}) => {
  const dispatch = useDispatch();
  const [statusIcon, setStatusIcon] = useState('');
  const [statusColor, setStatusColor] = useState();
  const [statusMessage, setStatusMessage] = useState('');
  let amount = 0;

  const fetchAllTransactions = async () => {
    await dispatch(transactionAction.allTransactions());
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

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

  if (transactionData) {
    transactionData?.map(item1 => {
      if (item1.bookingId === item.id) {
        amount = amount + item1.amount;
      }
    });
  }

  const getStatus = (totalAmount, paidAmount) => {
    console.log('Transactionsssssssss', totalAmount, paidAmount);
    if (totalAmount === 0 || totalAmount === null) {
      setStatusIcon('checkmark-done-circle');
      setStatusMessage(FREE);
      setStatusColor(colors.SECONDARY);
    } else {
      if (totalAmount === paidAmount) {
        setStatusIcon('checkmark-circle');
        setStatusMessage(COMPLETED);
        setStatusColor(colors.GREEN_1);
      } else if (totalAmount > paidAmount) {
        setStatusIcon('ellipsis-horizontal-circle-sharp');
        setStatusMessage(PENDING);
        setStatusColor(colors.YELLOW);
      } else {
        setStatusIcon('alert-circle');
        setStatusMessage(NOT_COMPLETED);
        setStatusColor(colors.RED);
      }
    }
  };

  useEffect(() => {
    getStatus(item?.totalAmount, amount);
  }, [props.navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('BookingDetailsScreen', {
          props,
          item,
          index,
        })
      }>
      <View style={styles.titleContainer}>
        <Text
          style={
            styles.titleText
          }>{`${item?.firstName} ${item?.lastName}`}</Text>
        <Text style={styles.titleText}>4 Days 3 Nights</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Check in: {moment(item?.checkInDate).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.dateText}>
          Check out: {moment(item?.checkOutDate).format('DD-MM-YYYY')}
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>
          Total Amount:{' '}
          {item?.totalAmount >= 0
            ? numberFormat(item?.totalAmount)
            : numberFormat(0)}
        </Text>
        <View style={styles.statusContainer}>
          <Ionicons name={statusIcon} color={statusColor} size={25} />
          <Text
            style={[styles.paymentText, {color: statusColor, marginLeft: 10}]}>
            {statusMessage}
          </Text>
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>
          Paid:{' '}
          {amount === item?.totalAmount
            ? numberFormat(item?.totalAmount)
            : numberFormat(amount)}
        </Text>
        <Text style={styles.paymentText}>
          Remaining: {numberFormat(item?.totalAmount - amount)}
        </Text>
      </View>
      <View style={styles.moreInfoContainer}>
        <Ionicons name={'add-circle'} color={colors.PRIMARY} size={30} />
        <Text style={styles.moreInfoText}>More Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Index;
