import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import {Button, TextInput} from 'react-native-paper';
import * as userAction from '../../redux/actions/userAction';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  // const textInput = useRef();
  // useEffect(() => textInput.current.clear(), [textInput]);

  const handleLogin = async (email, password) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      await dispatch(userAction.login(email, password));
      setIsLoading(false);
      setShowPassword(false);
    } catch (e) {
      setIsLoading(false);
      setShowPassword(false);
      setError(e.message);
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
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Casa Sunshine</Text>
            </View>

            <Formik
              validationSchema={validationSchema}
              initialValues={{email: '', password: ''}}
              onSubmit={async values => {
                setIsLoading(true);
                await handleLogin(values.email, values.password);
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
                  <View style={styles.emailContainer}>
                    <TextInput
                      // ref={textInput}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      label={'Enter Email'}
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
                  <View style={styles.passwordContainer}>
                    <TextInput
                      // ref={textInput}
                      returnKeyType={'done'}
                      label={'Enter Password'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                      value={values.password}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      right={
                        <TextInput.Icon
                          onPress={() => setShowPassword(!showPassword)}
                          name={showPassword ? 'eye-off' : 'eye'}
                          color={colors.PRIMARY}
                        />
                      }
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                      onSubmitEditing={() => {
                        handleSubmit();
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
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
                      <Text style={styles.buttonText}>Login</Text>
                    )}
                  </Button>
                  <View style={styles.forgetContainer}>
                    <Text
                      style={styles.forgetText}
                      onPress={() => props.navigation.navigate('SignupScreen')}>
                      Forgot password
                    </Text>
                  </View>
                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                      Don't have an account ?{' '}
                    </Text>
                    <Text
                      style={[styles.signupText, {color: colors.SECONDARY}]}
                      onPress={() => props.navigation.navigate('SignupScreen')}>
                      Sign up
                    </Text>
                  </View>
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
