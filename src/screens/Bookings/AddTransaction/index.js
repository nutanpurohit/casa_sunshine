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
import {
  ACCOUNT1,
  ACCOUNT2,
  ACCOUNT3,
  ACCOUNT4,
  ACCOUNT5,
  AGENT,
  DIRECT,
  OTHER,
} from '../../../constants/constants';
import * as transactionAction from '../../../redux/actions/transactionAction';
import moment from 'moment';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const accountType = [
    {type: ACCOUNT1},
    {type: ACCOUNT2},
    {type: ACCOUNT3},
    {type: ACCOUNT4},
    {type: ACCOUNT5},
  ];
  const [selectedAccountType, setSelectedAccountType] = useState(
    accountType[0].type,
  );
  const item = props.route.params;
  console.log('Item', item);
  const bookingId = item.id;

  const checkTransaction = async (bookingId, data, selectedAccountType) => {
    if (item.totalAmount === item.amount) {
      alert('Payment is already completed!');
    } else {
      await onAddTransaction(bookingId, data, selectedAccountType);
    }
  };

  const onAddTransaction = async (bookingId, data, selectedAccountType) => {
    try {
      const transactionData = {
        ...data,
        bookingId: bookingId,
        account: selectedAccountType,
      };
      await dispatch(transactionAction.addTransaction(transactionData));
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false);
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
                amount: '',
                description: '',
              }}
              onSubmit={async values => {
                setIsLoading(true);
                await checkTransaction(bookingId, values, selectedAccountType);
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
                  <View style={styles.totalAmountContainer}>
                    <TextInput
                      label={'Enter Amount'}
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      value={values.amount}
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
                    {touched.amount && errors.amount && (
                      <Text style={styles.errorText}>{errors.amount}</Text>
                    )}
                  </View>
                  <View style={styles.descriptionContainer}>
                    <TextInput
                      label={'Enter Description'}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
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
                    {touched.description && errors.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}
                  </View>
                  <View style={styles.accountContainer}>
                    <Picker
                      name={accountType}
                      selectedValue={selectedAccountType}
                      style={styles.picker}
                      mode={'modal'}
                      onValueChange={itemValue => {
                        setSelectedAccountType(itemValue);
                      }}>
                      {accountType.map((s, i) => {
                        return (
                          <Picker.Item value={s.type} label={s.type} key={i} />
                        );
                      })}
                    </Picker>
                  </View>
                  <Button
                    style={styles.buttonContainer}
                    mode={'contained'}
                    loading={isLoading}
                    color={colors.PRIMARY}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Add Transaction</Text>
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
