import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {
  getDaysArray,
  greetings,
  handleURL,
  numberFormat,
  wait,
} from '../../constants/commonFunctions';
import morning from '../../assets/images/dawn.png';
import afternoon from '../../assets/images/cloud.png';
import evening from '../../assets/images/sunsets.png';
import {COVID_SAFETY, WEATHER_API} from '../../api/apiConstants';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import * as bookingAction from '../../redux/actions/bookingAction';
import moment from 'moment';
import * as transactionAction from '../../redux/actions/transactionAction';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showCovidStatus, setShowCovidStatus] = useState(true);
  const [greetingText, setGreetingText] = useState('');
  const [greetingIcon, setGreetingIcon] = useState('');
  const [currentMarkedDates, setCurrentMarkedDates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchBookings();
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchBookings = async () => {
    setIsLoading(true);
    await dispatch(bookingAction.fetchAllBookings());
    setIsLoading(false);
  };

  const bookingData = useSelector(state => state.booking?.bookingData);
  const currentBookingData = useSelector(
    state => state.booking?.currentBookingData,
  );

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchAllTransactions();
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchAllTransactions = async () => {
    setIsLoading(true);
    await dispatch(transactionAction.allTransactions());
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentBookingData !== null) {
      let obj2 = {};
      const dateArray = getDaysArray(
        currentBookingData[0]?.checkInDate,
        currentBookingData[0]?.checkOutDate,
      );
      dateArray.map((item, index) => {
        dateArray[index] = moment(item).format('YYYY-MM-DD');
      });

      dateArray.map((item, index) => {
        if (index === 0) {
          obj2[item] = {startingDay: true, color: colors.SECONDARY};
        } else if (index === dateArray.length - 1) {
          obj2[item] = {endingDay: true, color: colors.SECONDARY};
        } else {
          obj2[item] = {color: colors.SECONDARY};
        }
      });
      setCurrentMarkedDates(obj2);
    }
  }, []);

  const getWeather = async () => {
    console.log('API Call: ', WEATHER_API);
    axios
      .get(WEATHER_API)
      .then(response => {
        console.log('Weather response: ', response);
        setWeather(response?.data);
      })
      .catch(error => {
        console.log('Weather error: ', error);
      });
  };

  useEffect(() => {
    getWeather();
    const greeting = greetings();
    if (greeting === 'morning') {
      setGreetingText('Good Morning');
      setGreetingIcon(morning);
    } else if (greeting === 'afternoon') {
      setGreetingText('Good Afternoon');
      setGreetingIcon(afternoon);
    } else {
      setGreetingText('Good Evening');
      setGreetingIcon(evening);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showCovidStatus ? (
        <View style={styles.covidStatusContainer}>
          <Text
            style={styles.covidStatusText}
            onPress={() => handleURL(COVID_SAFETY)}>
            Covid-19 Safety Measures
          </Text>
          <Ionicons
            name={'close'}
            size={20}
            color={colors.WHITE}
            onPress={() => setShowCovidStatus(false)}
          />
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.titleContainer}>
          <View style={styles.titleLeftContainer}>
            <Text style={styles.titleLocationText}>Goa</Text>
            <View style={styles.titleGreetingContainer}>
              <Image source={greetingIcon} style={{width: 30, height: 30}} />
              {/*<Image*/}
              {/*  source={{uri: `${WEATHER_API_ICON}/${weather}`}}*/}
              {/*  style={{width: 30, height: 30}}*/}
              {/*/>*/}
              <Text style={styles.titleGreetingText}>{greetingText}</Text>
            </View>
          </View>
          <View style={styles.titleRightContainer}>
            <Text style={styles.weatherText}>
              {weather?.main?.temp
                ? `${Math.round(weather?.main?.temp)} \xB0C`
                : null}
            </Text>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <Text style={styles.calendarText}>Current Bookings</Text>
          <Calendar markingType={'period'} markedDates={currentMarkedDates} />
        </View>
        <View style={styles.bookingContainer}>
          {/*<Text>{`${currentBookingData[0]?.firstName} ${currentBookingData[0]?.lastName}`}</Text>*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.container}*/}
          {/*  onPress={() =>*/}
          {/*    props.navigation.navigate('BookingDetailsScreen', {*/}
          {/*      props,*/}
          {/*      currentBookingData,*/}
          {/*    })*/}
          {/*  }>*/}
          {/*  <View style={styles.titleContainer}>*/}
          {/*    <Text*/}
          {/*      style={*/}
          {/*        styles.titleText*/}
          {/*      }>{`${currentBookingData[0]?.firstName} ${currentBookingData[0]?.lastName}`}</Text>*/}
          {/*    <Text style={styles.titleText}>4 Days 3 Nights</Text>*/}
          {/*  </View>*/}
          {/*  <View style={styles.dateContainer}>*/}
          {/*    <Text style={styles.dateText}>*/}
          {/*      Check in:{' '}*/}
          {/*      {moment(currentBookingData[0]?.checkInDate).format('DD-MM-YYYY')}*/}
          {/*    </Text>*/}
          {/*    <Text style={styles.dateText}>*/}
          {/*      Check out:{' '}*/}
          {/*      {moment(currentBookingData[0]?.checkOutDate).format('DD-MM-YYYY')}*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*  <View style={styles.paymentContainer}>*/}
          {/*    <Text style={styles.paymentText}>*/}
          {/*      Total Amount:{' '}*/}
          {/*      {currentBookingData[0]?.totalAmount >= 0*/}
          {/*        ? numberFormat(currentBookingData[0]?.totalAmount)*/}
          {/*        : numberFormat(0)}*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*  <View style={styles.moreInfoContainer}>*/}
          {/*    <Ionicons name={'add-circle'} color={colors.PRIMARY} size={30} />*/}
          {/*    <Text style={styles.moreInfoText}>More Info</Text>*/}
          {/*  </View>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
