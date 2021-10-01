import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';
import moment from 'moment';
import {dayCount, numberFormat} from '../../../constants/commonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import * as transactionAction from '../../../redux/actions/transactionAction';
import {COMPLETED, NOT_COMPLETED, PENDING} from '../../../constants/constants';

const Index = ({props, item, index}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusIcon, setStatusIcon] = useState('');
  const [statusColor, setStatusColor] = useState();
  const [statusMessage, setStatusMessage] = useState('');
  let amount = 0;

  const fetchAllTransactions = async bookingId => {
    setIsLoading(true);
    await dispatch(transactionAction.allTransactions());
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchAllTransactions();
    });
    return unsubscribe;
  }, [props.navigation]);

  const transactionData = useSelector(
    state => state.transaction.allTransactionData,
  );

  if (transactionData) {
    transactionData.map(item1 => {
      if (item1.bookingId === item?.bookingHistory?.id) {
        amount = amount + item1.amount;
      }
    });
  }

  const getStatus = (totalAmount, paidAmount) => {
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
  };

  useEffect(() => {
    getStatus(item?.bookingHistory?.totalAmount, amount);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('BookingHistoryDetailsScreen', {
          props,
          item: item.bookingHistory,
          index,
        })
      }>
      <View style={styles.titleContainer}>
        <Text
          style={
            styles.titleText
          }>{`${item?.bookingHistory?.firstName} ${item?.bookingHistory?.lastName}`}</Text>
        <Text style={styles.titleText}>4 Days 3 Nights</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Check in:{' '}
          {moment(item?.bookingHistory?.checkInDate).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.dateText}>
          Check out:{' '}
          {moment(item?.bookingHistory?.checkOutDate).format('DD-MM-YYYY')}
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>
          Total Amount:{' '}
          {item?.bookingHistory?.totalAmount >= 0
            ? numberFormat(item?.bookingHistory?.totalAmount)
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
        <Text style={styles.paymentText}>Paid: {numberFormat(amount)}</Text>
        <Text style={styles.paymentText}>
          Remaining: {numberFormat(item?.bookingHistory?.totalAmount - amount)}
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
