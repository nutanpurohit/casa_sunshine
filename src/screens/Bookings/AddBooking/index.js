import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Picker,
} from 'react-native';
import styles from './styles';
import colors from '../../../constants/colors';
import {Button, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import {AGENT, DIRECT, OTHER} from '../../../constants/constants';
import * as bookingAction from '../../../redux/actions/bookingAction';
import moment from 'moment';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [selectedAgentType, setSelectedAgentType] = useState('');
  const [open, setOpen] = useState(false);
  const agentType = [{type: AGENT}, {type: DIRECT}, {type: OTHER}];

  const dateSplit = date => {
    const dateArray = date.split('-');
    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];

    const newDate = `${year}-${month}-${day}`;
    return new Date(newDate).toISOString();
  };

  const onAddBooking = async (data, type, checkInDate, checkOutDate) => {
    try {
      const bookingData = {
        ...data,
        agentType: type,
        numberAdults: parseInt(data.numberAdults),
        numberKids: parseInt(data.numberKids),
        totalAmount: parseFloat(data.totalAmount),
        deposit: parseFloat(data.deposit),
        checkInDate,
        checkOutDate,
      };
      await dispatch(bookingAction.addBooking(bookingData));
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: colors.WHITE}}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Formik
              // validationSchema={validationSchema}
              initialValues={{
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                checkInDate: '',
                checkOutDate: '',
                specialInstructions: '',
                numberAdults: '',
                numberKids: '',
                totalAmount: '',
                deposit: '',
                agentName: '',
                agentEmail: '',
              }}
              onSubmit={async values => {
                setIsLoading(true);
                await onAddBooking(
                  values,
                  selectedAgentType,
                  checkInDate,
                  checkOutDate,
                );
              }}>
              {({
                handleChange,
                handleBlur,
                errors,
                setFieldTouched,
                touched,
                handleSubmit,
                values,
              }) => (
                <View style={styles.formContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Booking Details</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
                      autoCorrect={false}
                      label={'Enter First Name'}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
                      autoCorrect={false}
                      label={'Enter Last Name'}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                  <View style={styles.phoneNumberContainer}>
                    <TextInput
                      label={'Enter Phone Number'}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType={'phone-pad'}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    )}
                  </View>
                  <View style={styles.emailContainer}>
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      label={'Enter Email Address'}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.dateContainer}>
                    <DatePicker
                      style={styles.datePickerButton}
                      date={moment(checkInDate).format('DD-MM-YYYY')}
                      mode="date"
                      placeholder="Check-in Date"
                      format="DD-MM-YYYY"
                      // minDate={new Date()}
                      // maxDate="2016-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                        },
                        dateInput: styles.dateTextInput,
                      }}
                      onDateChange={date => {
                        const newDate = dateSplit(date);
                        setCheckInDate(newDate);
                      }}
                    />
                    <DatePicker
                      style={styles.datePickerButton}
                      date={moment(checkOutDate).format('DD-MM-YYYY')}
                      mode="date"
                      placeholder="Check-out Date"
                      format="DD-MM-YYYY"
                      // minDate={new Date()}
                      // maxDate="2016-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: styles.dateTextInput,
                      }}
                      onDateChange={date => {
                        const newDate = dateSplit(date);
                        setCheckOutDate(newDate);
                      }}
                    />
                  </View>
                  <View style={styles.numberGuestContainer}>
                    <TextInput
                      label={'Adults'}
                      onChangeText={handleChange('numberAdults')}
                      onBlur={handleBlur('numberAdults')}
                      value={values.numberAdults}
                      mode={'outlined'}
                      keyboardType={'number-pad'}
                      outlineColor={colors.PRIMARY}
                      style={styles.guestTextInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    <TextInput
                      label={'Kids'}
                      onChangeText={handleChange('numberKids')}
                      onBlur={handleBlur('numberKids')}
                      value={values.numberKids}
                      mode={'outlined'}
                      keyboardType={'number-pad'}
                      outlineColor={colors.PRIMARY}
                      style={styles.guestTextInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                  </View>
                  <View style={styles.totalAmountContainer}>
                    <TextInput
                      label={'Enter Total Amount'}
                      onChangeText={handleChange('totalAmount')}
                      onBlur={handleBlur('totalAmount')}
                      value={values.totalAmount}
                      mode={'outlined'}
                      keyboardType={'decimal-pad'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.totalAmount && errors.totalAmount && (
                      <Text style={styles.errorText}>{errors.totalAmount}</Text>
                    )}
                  </View>
                  <View style={styles.depositContainer}>
                    <TextInput
                      label={'Enter Deposit Amount'}
                      onChangeText={handleChange('deposit')}
                      onBlur={handleBlur('deposit')}
                      value={values.deposit}
                      mode={'outlined'}
                      keyboardType={'decimal-pad'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.deposit && errors.deposit && (
                      <Text style={styles.errorText}>{errors.deposit}</Text>
                    )}
                  </View>
                  <View style={styles.specialInstructionsContainer}>
                    <TextInput
                      label={'Enter Special Instructions'}
                      onChangeText={handleChange('specialInstructions')}
                      onBlur={handleBlur('specialInstructions')}
                      value={values.specialInstructions}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      multiline={true}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.specialInstructions &&
                      errors.specialInstructions && (
                        <Text style={styles.errorText}>
                          {errors.specialInstructions}
                        </Text>
                      )}
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Agent Details</Text>
                  </View>
                  <View style={styles.typeContainer}>
                    <Picker
                      name={agentType}
                      selectedValue={selectedAgentType}
                      style={styles.picker}
                      mode={'modal'}
                      onValueChange={itemValue => {
                        setSelectedAgentType(itemValue);
                      }}>
                      {agentType.map((s, i) => {
                        return (
                          <Picker.Item value={s.type} label={s.type} key={i} />
                        );
                      })}
                    </Picker>
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
                      autoCorrect={false}
                      label={'Enter Agent Name'}
                      onChangeText={handleChange('agentName')}
                      onBlur={handleBlur('agentName')}
                      value={values.agentName}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.agentName && errors.agentName && (
                      <Text style={styles.errorText}>{errors.agentName}</Text>
                    )}
                  </View>
                  <View style={styles.emailContainer}>
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      label={'Enter Agent Email Address'}
                      onChangeText={handleChange('agentEmail')}
                      onBlur={handleBlur('agentEmail')}
                      value={values.agentEmail}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.agentEmail && errors.agentEmail && (
                      <Text style={styles.errorText}>{errors.agentEmail}</Text>
                    )}
                  </View>
                  <Button
                    style={styles.buttonContainer}
                    mode={'contained'}
                    loading={isLoading}
                    color={colors.PRIMARY}
                    onPress={() => handleSubmit()}>
                    {isLoading ? (
                      <ActivityIndicator color={colors.WHITE} size={'small'} />
                    ) : (
                      <Text style={styles.buttonText}>Add Booking</Text>
                    )}
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
