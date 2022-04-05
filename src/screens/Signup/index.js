import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import logo from '../../assets/images/logo.png';
import * as Yup from 'yup';
import * as userAction from '../../redux/actions/userAction';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!').label('Name'),
  email: Yup.string()
    .required('Email Address is required!')
    .email()
    .label('Email'),
  password: Yup.string()
    .required('Password is required!')
    .min(6)
    .label('Password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required!')
    .min(6)
    .label('Password'),
});

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleSignup = async (name, email, password) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      await dispatch(userAction.signup(name, email, password));
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
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={async values => {
                if (values.password === values.confirmPassword) {
                  await handleSignup(
                    values.name,
                    values.email,
                    values.password,
                  );
                } else {
                  alert('Password does not match!');
                }
              }}>
              {({
                handleChange,
                handleBlur,
                errors,
                touched,
                handleSubmit,
                values,
              }) => (
                <View style={styles.formContainer}>
                  <View style={styles.nameContainer}>
                    <TextInput
                      label={'Enter Name'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{colors: {primary: colors.PRIMARY}}}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={styles.emailContainer}>
                    <TextInput
                      label={'Enter Email'}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{colors: {primary: colors.PRIMARY}}}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      label={'Enter Password'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={true}
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
                      theme={{colors: {primary: colors.PRIMARY}}}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      returnKeyType={'done'}
                      label={'Confirm Password'}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry={true}
                      value={values.confirmPassword}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          name={showConfirmPassword ? 'eye-off' : 'eye'}
                          color={colors.PRIMARY}
                        />
                      }
                      theme={{colors: {primary: colors.PRIMARY}}}
                      onSubmitEditing={() => handleSubmit()}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                  <View style={styles.termsContainer}>
                    <Checkbox.Android
                      status={checked ? 'checked' : 'unchecked'}
                      color={colors.PRIMARY}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                    <Text style={styles.termsText}>Accept </Text>
                    <Text style={[styles.termsText, {color: colors.SECONDARY}]}>
                      terms and conditions
                    </Text>
                  </View>
                  <Button
                    style={styles.buttonContainer}
                    mode={'contained'}
                    color={colors.PRIMARY}
                    onPress={() => {
                      if (checked) {
                        handleSubmit();
                      } else {
                        alert('Please accept terms and conditions');
                      }
                    }}>
                    <Text style={styles.buttonText}>Signup</Text>
                  </Button>
                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Already have an account ?{' '}
                    </Text>
                    <Text
                      style={[styles.loginText, {color: colors.SECONDARY}]}
                      onPress={() => props.navigation.navigate('LoginScreen')}>
                      Sign in
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
