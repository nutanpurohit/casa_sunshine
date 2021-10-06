import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from '../../constants/colors';
import Booking from '../../components/UI/Booking';
import * as bookingAction from '../../redux/actions/bookingAction';
import * as transactionAction from '../../redux/actions/transactionAction';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [navBarTab, setNavBarTab] = useState('All');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchBookings();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchAllTransactions();
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchBookings = async () => {
    setIsLoading(true);
    await dispatch(bookingAction.fetchAllBookings());
    setIsLoading(false);
  };

  const fetchAllTransactions = async () => {
    setIsLoading(true);
    await dispatch(transactionAction.allTransactions());
    setIsLoading(false);
  };

  const bookingData = useSelector(state => state.booking?.bookingData);
  const currentBookingData = useSelector(
    state => state.booking?.currentBookingData,
  );
  const upcomingBookingData = useSelector(
    state => state.booking?.upcomingBookingData,
  );
  const pastBookingData = useSelector(state => state.booking?.pastBookingData);
  console.log('Booking', bookingData);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.navBarContainer}>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={() => setNavBarTab('All')}>
            <Text style={styles.navBarButtonText}>{'All'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={() => setNavBarTab('Current')}>
            <Text style={styles.navBarButtonText}>{'Current'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={() => setNavBarTab('Upcoming')}>
            <Text style={styles.navBarButtonText}>{'Upcoming'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={() => setNavBarTab('Past')}>
            <Text style={styles.navBarButtonText}>{'Past'}</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator color={colors.PRIMARY} size={'large'} />
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.currentBookingsContainer}>
                {navBarTab === 'All' && bookingData ? (
                  <FlatList
                    refreshControl={
                      <RefreshControl
                        refreshing={isLoading}
                        onRefresh={fetchBookings}
                      />
                    }
                    keyExtractor={item => item.id}
                    data={bookingData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <Booking
                          props={props}
                          item={item}
                          index={index}
                          // status={status}
                        />
                      );
                    }}
                    style={{width: '100%'}}
                  />
                ) : navBarTab === 'Current' && currentBookingData ? (
                  <FlatList
                    keyExtractor={item => item.id}
                    data={currentBookingData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <Booking props={props} item={item} index={index} />
                      );
                    }}
                    style={{width: '100%'}}
                  />
                ) : navBarTab === 'Upcoming' && upcomingBookingData ? (
                  <FlatList
                    keyExtractor={item => item.id}
                    data={upcomingBookingData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <Booking props={props} item={item} index={index} />
                      );
                    }}
                    style={{width: '100%'}}
                  />
                ) : navBarTab === 'Past' && pastBookingData ? (
                  <FlatList
                    keyExtractor={item => item.id}
                    data={pastBookingData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <Booking props={props} item={item} index={index} />
                      );
                    }}
                    style={{width: '100%'}}
                  />
                ) : null}
              </View>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('AddBookingScreen')}
        style={styles.addBookingButton}>
        <Ionicons name={'add'} size={35} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
