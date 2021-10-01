import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {greetings, handleURL} from '../../constants/commonFunctions';
import morning from '../../assets/images/dawn.png';
import afternoon from '../../assets/images/cloud.png';
import evening from '../../assets/images/sunsets.png';
import night from '../../assets/images/night.png';
import {COVID_SAFETY, WEATHER_API} from '../../api/apiConstants';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';

const Index = props => {
  const [showCovidStatus, setShowCovidStatus] = useState(true);
  const [greetingText, setGreetingText] = useState('');
  const [greetingIcon, setGreetingIcon] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    console.log('API Call: ', WEATHER_API);
    axios
      .get(WEATHER_API)
      .then(response => {
        console.log('Weather response: ', response);
        setWeather(response.data);
      })
      .catch(error => {
        console.log('Weather error: ', error);
      });
  };

  useEffect(() => {
    // getWeather().then(r => console.log('Res', r));
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
  });

  return (
    <View style={styles.container}>
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
            {/*{Math.round(weather.main?.temp)} {'\xB0'}C*/}
            {Math.round(25.75)} {'\xB0'}C
          </Text>
        </View>
        {/*<Ionicons name={'location'} color={colors.PRIMARY} size={25} />*/}
      </View>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>Current Bookings</Text>
        <Calendar
          markingType={'period'}
          markedDates={{
            '2021-09-22': {startingDay: true, color: colors.SECONDARY},
            '2021-09-23': {color: colors.SECONDARY},
            '2021-09-24': {color: colors.SECONDARY},
            '2021-09-25': {
              color: colors.SECONDARY,
              endingDay: true,
            },
          }}
          // style={{backgroundColor: 'red'}}
        />
      </View>
    </View>
  );
};

export default Index;
