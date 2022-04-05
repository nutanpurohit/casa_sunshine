import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Bookings from '../screens/Bookings';
import BookingDetails from '../screens/Bookings/BookingDetails';
import BookingHistory from '../screens/Bookings/BookingHistory';
import BookingHistoryDetails from '../screens/Bookings/BookingHistoryDetails';
import AddBooking from '../screens/Bookings/AddBooking';
import UpdateBooking from '../screens/Bookings/UpdateBooking';
import BookingTransaction from '../screens/Bookings/BookingTransaction';
import AddTransaction from '../screens/Bookings/AddTransaction';
import BookingReport from '../screens/Bookings/BookingReport';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const BookingsNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.PRIMARY,
      }}>
      <Stack.Screen
        name="BookingsScreen"
        component={Bookings}
        options={{
          headerTitle: 'Bookings',
        }}
      />
      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetails}
        options={{
          headerTitle: 'Booking Details',
        }}
      />
      <Stack.Screen
        name="BookingHistoryScreen"
        component={BookingHistory}
        options={{
          headerTitle: 'Booking History',
        }}
      />
      <Stack.Screen
        name="BookingHistoryDetailsScreen"
        component={BookingHistoryDetails}
        options={{
          headerTitle: 'Booking History Details',
        }}
      />
      <Stack.Screen
        name="AddBookingScreen"
        component={AddBooking}
        options={{
          headerTitle: 'Add Booking',
        }}
      />
      <Stack.Screen
        name="UpdateBookingScreen"
        component={UpdateBooking}
        options={{
          headerTitle: 'Update Transaction',
        }}
      />
      <Stack.Screen
        name="BookingTransactionScreen"
        component={BookingTransaction}
        options={{
          headerTitle: 'View Transactions',
        }}
      />
      <Stack.Screen
        name="AddTransactionScreen"
        component={AddTransaction}
        options={{
          headerTitle: 'Add Transaction',
        }}
      />
      <Stack.Screen
        name="BookingReportScreen"
        component={BookingReport}
        options={{
          headerTitle: 'Booking Report',
        }}
      />
    </Stack.Navigator>
  );
};

export default BookingsNavigator;
