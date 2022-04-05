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
import {Card, FAB, Paragraph, Title} from 'react-native-paper';
import colors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {getDaysArray, numberFormat} from '../../../constants/commonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import * as agentAction from '../../../redux/actions/agentAction';
import * as transactionAction from '../../../redux/actions/transactionAction';
import {COMPLETED, NOT_COMPLETED, PENDING} from '../../../constants/constants';
import * as bookingAction from '../../../redux/actions/bookingAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = props => {
  const dispatch = useDispatch();
  const navigation = props.route.params.navigation;
  const item = props.route.params.item;
  const bookingId = item.id;
  const agentId = item.agentId;
  const [isLoading, setIsLoading] = useState(false);
  const [stayStatus, setStayStatus] = useState('');
  const [stayStatusColor, setStayStatusColor] = useState('');
  const [status, setStatus] = useState('');
  const [showAgent, setShowAgent] = useState(false);
  let amount = 0;
  let agentData;

  const getAgentDetails = async agentId => {
    setIsLoading(true);
    await dispatch(agentAction.fetchAgentById(agentId));
    setIsLoading(false);
  };

  useEffect(() => {
    if (agentId !== null) {
      getAgentDetails(agentId).then(() => {});
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
    if (transactionData.length > 0) {
      transactionData.map(item => {
        amount = amount + item.amount;
      });
    }
  }

  const getStatus = (totalAmount, paidAmount) => {
    if (totalAmount === paidAmount) {
      setStatus(COMPLETED);
    } else if (totalAmount > paidAmount) {
      setStatus(PENDING);
    } else {
      setStatus(NOT_COMPLETED);
    }
  };

  useEffect(() => {
    getStatus(item.totalAmount, amount);
  }, []);

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.PRIMARY} size={'large'} />
    </View>
  ) : (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <Card.Title
            title="History Details"
            left={() => (
              <MaterialCommunityIcons
                name={'history'}
                color={colors.PRIMARY}
                size={30}
              />
            )}
            titleStyle={{
              color: colors.PRIMARY,
              fontSize: 24,
              fontWeight: 'bold',
            }}
          />
          <Card.Content>
            <Paragraph>{`Updated on: ${new Date(item?.updatedAt)}`}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.cardContainer}>
          <Card.Title
            title="Guest Details"
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
          />
          <Card.Content>
            <Title>{`${item?.firstName} ${item?.lastName}`}</Title>
            {item?.email ? <Title>Email: {item?.email}</Title> : null}
            {item?.phoneNumber ? (
              <Title>Phone: {item?.phoneNumber}</Title>
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
              Check-in Date: {moment(item?.checkInDate).format('DD-MM-YYYY')}
            </Title>
            <Title>
              Check-out Date: {moment(item?.checkOutDate).format('DD-MM-YYYY')}
            </Title>
            <Title>
              Number of Pax:{' '}
              {item?.numberAdults >= 0 ? item?.numberAdults : '--'}
            </Title>
            <Title>
              Number of Kids: {item?.numberKids >= 0 ? item?.numberKids : '--'}
            </Title>
          </Card.Content>
        </Card>
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
            <Title>{item?.specialInstructions}</Title>
          </Card.Content>
        </Card>
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
              {item?.totalAmount
                ? numberFormat(item?.totalAmount)
                : numberFormat(0)}
            </Title>
            <Title>
              Deposit:{' '}
              {item?.deposit ? numberFormat(item?.deposit) : numberFormat(0)}
            </Title>
            <Title>Status of Payment: {status}</Title>
            <Title style={{color: colors.GREEN_3}}>
              Paid: {numberFormat(amount)}
            </Title>
            <Title style={{color: colors.RED}}>
              Pending: {numberFormat(item?.totalAmount - amount)}
            </Title>
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
      </View>
    </ScrollView>
  );
};

export default Index;
