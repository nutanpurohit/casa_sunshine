import {useCallback} from 'react';
import {Linking} from 'react-native';
import moment from 'moment';

export const greetings = () => {
  const d = new Date();
  const time = d.getHours();
  if (time < 12) {
    return 'morning';
  } else if (time < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export const handleURL = async url => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    alert(`alert ${url}`);
  }
};

export const numberFormat = value => {
  const amount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
  return amount;
};

export const dayCount = (checkInDate, checkOutDate) => {
  console.log('Datessss', new Date(checkInDate), new Date(checkOutDate));
  // const startDate = moment(new Date(checkInDate)).format('MM-DD-YYYY');
  // const endDate = moment(new Date(checkOutDate)).format('MM-DD-YYYY');
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return parseInt(Difference_In_Days.toString());
};

const addDays = function (current, days) {
  let date = new Date(current);
  date.setDate(date.getDate() + days);
  return date;
};

export const getDaysArray = function (start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let dateArray = [];
  let currentDate = startDate;
  const stopDate = endDate;

  while (currentDate <= stopDate) {
    dateArray.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
};

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
