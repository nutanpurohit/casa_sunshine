import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {Card, Title} from 'react-native-paper';
import colors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {getDaysArray, numberFormat} from '../../../constants/commonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import * as agentAction from '../../../redux/actions/agentAction';
import * as transactionAction from '../../../redux/actions/transactionAction';
import {
  COMPLETED,
  FREE,
  NOT_COMPLETED,
  PENDING,
} from '../../../constants/constants';
import * as bookingAction from '../../../redux/actions/bookingAction';

const Index = props => {
  const dispatch = useDispatch();
  const navigation = props.route.params.navigation;
  const item = props.route.params.item;
  const bookingId = item?.id;
  const agentId = item?.agentId;
  const status = props.route.params.status;
  const [isLoading, setIsLoading] = useState(false);
  const [stayStatus, setStayStatus] = useState('');
  const [stayStatusColor, setStayStatusColor] = useState('');
  // const [status, setStatus] = useState('');
  const [showAgent, setShowAgent] = useState(false);
  let amount = 0;
  let agentData;

  console.log('Props', props.route.params.status);

  const fetchBookingById = async bookingId => {
    setIsLoading(true);
    await dispatch(bookingAction.fetchBookingById(bookingId));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookingById(bookingId);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchBookingById(bookingId);
    });
    return unsubscribe;
  }, [props.navigation]);

  const bookingData = useSelector(state => state.booking?.bookingDataById);
  console.log('Booking', bookingData);

  const getAgentDetails = async agentId => {
    setIsLoading(true);
    await dispatch(agentAction.fetchAgentById(agentId));
    setIsLoading(false);
  };

  useEffect(() => {
    if (agentId !== null) {
      getAgentDetails(agentId);
      setShowAgent(true);
    } else {
      setShowAgent(false);
    }
  }, []);

  agentData = useSelector(state => state.agent?.agentData);
  console.log('Agent', agentData);

  const fetchTransactions = async bookingId => {
    setIsLoading(true);
    await dispatch(transactionAction.fetchAllTransaction(bookingId));
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchTransactions(bookingId);
    });
    return unsubscribe;
  }, [props.navigation]);

  const transactionData = useSelector(
    state => state.transaction?.transactionData,
  );

  if (transactionData) {
    if (transactionData?.length > 0) {
      transactionData?.map(item => {
        amount = amount + item.amount;
      });
    }
  }

  const statusOfStay = (checkInDate, checkOutDate) => {
    const dateArray = getDaysArray(checkInDate, checkOutDate);
    const currentDate = new Date(moment(new Date()).format('MM-DD-YYYY 05:30'));
    console.log('Dates', dateArray, currentDate);

    dateArray.map(item => {
      if (item === currentDate) {
        console.log('Current');
        setStayStatus('Enjoying the Stay');
        setStayStatusColor(colors.GREEN_1);
      } else if (currentDate < item) {
        console.log('Upcoming', typeof item, typeof currentDate);
        setStayStatus('Upcoming');
        setStayStatusColor(colors.YELLOW);
      } else {
        console.log('Previous');
        setStayStatus('Previous');
        setStayStatusColor(colors.RED);
      }
    });
  };

  useEffect(() => {
    statusOfStay(bookingData?.checkInDate, bookingData?.checkOutDate);
  }, []);

  const onDeleteBooking = bookingId => {
    Alert.alert('Delete Booking', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await dispatch(bookingAction.deleteBooking(bookingId));
        },
      },
    ]);
  };

  const onGenerateBookingReport = async bookingId => {
    await dispatch(bookingAction.generateBookingReport(bookingId));
    props.navigation.navigate('BookingReportScreen');
  };

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.PRIMARY} size={'large'} />
    </View>
  ) : (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <Card.Title
            title="Guest Details"
            subtitle={`Status of Stay: ${stayStatus}`}
            left={() => (
              <Ionicons
                name={'person-outline'}
                color={colors.PRIMARY}
                size={30}
              />
            )}
            titleStyle={{
              color: colors.PRIMARY,
              fontSize: 24,
              fontWeight: 'bold',
            }}
            subTitleStyle={{
              color: stayStatusColor,
              fontSize: 24,
              fontWeight: 'bold',
            }}
          />
          <Card.Content>
            <Title>{`${bookingData?.firstName} ${bookingData?.lastName}`}</Title>
            {bookingData?.email ? (
              <Title>Email: {bookingData?.email}</Title>
            ) : null}
            {bookingData?.phoneNumber ? (
              <Title>Phone: {bookingData?.phoneNumber}</Title>
            ) : null}
          </Card.Content>
        </Card>
        <Card style={styles.cardContainer} elevation={10}>
          <Card.Title
            title="Booking Details"
            left={() => (
              <Ionicons
                name={'calendar-outline'}
                color={colors.PRIMARY}
                size={30}
              />
            )}
            titleStyle={{
              color: colors.PRIMARY,
              fontSize: 24,
            }}
          />
          <Card.Content>
            <Title>
              Check-in Date:{' '}
              {moment(bookingData?.checkInDate).format('DD-MM-YYYY')}
            </Title>
            <Title>
              Check-out Date:{' '}
              {moment(bookingData?.checkOutDate).format('DD-MM-YYYY')}
            </Title>
            <Title>
              Number of Pax:{' '}
              {bookingData?.numberAdults >= 0
                ? bookingData?.numberAdults
                : '--'}
            </Title>
            <Title>
              Number of Kids:{' '}
              {bookingData?.numberKids >= 0 ? bookingData?.numberKids : '--'}
            </Title>
          </Card.Content>
        </Card>
        {bookingData?.specialInstructions ? (
          <Card style={styles.cardContainer} elevation={10}>
            <Card.Title
              title="Special Instructions"
              left={() => (
                <Ionicons
                  name={'star-outline'}
                  color={colors.PRIMARY}
                  size={30}
                />
              )}
              titleStyle={{
                color: colors.PRIMARY,
                fontSize: 24,
              }}
            />
            <Card.Content>
              <Title>{bookingData?.specialInstructions}</Title>
            </Card.Content>
          </Card>
        ) : null}
        <Card style={styles.cardContainer} elevation={10}>
          <Card.Title
            title="Payment Details"
            left={() => (
              <Ionicons
                name={'card-outline'}
                color={colors.PRIMARY}
                size={30}
              />
            )}
            titleStyle={{
              color: colors.PRIMARY,
              fontSize: 24,
            }}
          />
          <Card.Content>
            <Title>
              Total Amount:{' '}
              {bookingData?.totalAmount
                ? numberFormat(bookingData?.totalAmount)
                : numberFormat(0)}
            </Title>
            <Title>
              Deposit:{' '}
              {bookingData?.deposit
                ? numberFormat(bookingData?.deposit)
                : numberFormat(0)}
            </Title>
            <Title>Status of Payment: {status}</Title>
            <Title style={{color: colors.GREEN_3}}>
              Paid: {numberFormat(amount)}
            </Title>
            <Title style={{color: colors.RED}}>
              Pending: {numberFormat(bookingData?.totalAmount - amount)}
            </Title>
            <View style={styles.transactionContainer}>
              <Title
                style={styles.viewTransactionsButton}
                onPress={() =>
                  props.navigation.navigate('AddTransactionScreen', {
                    ...bookingData,
                    amount,
                  })
                }>
                Add
              </Title>
              <Title
                style={styles.viewTransactionsButton}
                onPress={() =>
                  props.navigation.navigate(
                    'BookingTransactionScreen',
                    bookingData,
                  )
                }>
                View
              </Title>
            </View>
          </Card.Content>
        </Card>
        {showAgent ? (
          <Card style={styles.cardContainer} elevation={10}>
            <Card.Title
              title="Agent Details"
              left={() => (
                <Ionicons
                  name={'person-outline'}
                  color={colors.PRIMARY}
                  size={30}
                />
              )}
              titleStyle={{
                color: colors.PRIMARY,
                fontSize: 24,
              }}
            />
            <Card.Content>
              <Title>Name: {agentData?.name}</Title>
              <Title>Email: {agentData?.email}</Title>
              <Title>Phone: {agentData?.phone}</Title>
              <Title>Type: {agentData?.type}</Title>
              <Title>City: {agentData?.city}</Title>
              <Title>Address: {agentData?.address}</Title>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.cardContainer} elevation={10}>
            <Card.Title
              title="Direct Booking"
              titleStyle={{
                color: colors.PRIMARY,
                fontSize: 24,
              }}
            />
          </Card>
        )}

        <TouchableOpacity
          style={styles.bookingHistoryContainer}
          onPress={() =>
            props.navigation.navigate('BookingHistoryScreen', bookingId)
          }>
          <Text style={styles.bookingHistoryText}>Booking History</Text>
          <Ionicons
            name={'arrow-forward-circle'}
            color={colors.WHITE}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() =>
              props.navigation.navigate('UpdateBookingScreen', item)
            }>
            <Text style={styles.bookingHistoryText}>Update</Text>
            <Ionicons name={'pencil-sharp'} color={colors.WHITE} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomButton, {backgroundColor: colors.RED}]}
            onPress={() => onDeleteBooking(bookingId)}>
            <Text style={styles.bookingHistoryText}>Delete</Text>
            <Ionicons name={'close-circle'} color={colors.WHITE} size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.bookingHistoryContainer}
          onPress={() => onGenerateBookingReport(bookingId)}>
          <Text style={styles.bookingHistoryText}>Generate Report</Text>
          <Ionicons name={'arrow-down-circle'} color={colors.WHITE} size={25} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Index;
