import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import colors from '../../../constants/colors';
import {Formik} from 'formik';
import {Button, TextInput} from 'react-native-paper';
import * as agentAction from '../../../redux/actions/agentAction';
import {useDispatch} from 'react-redux';

const Index = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onAddAgent = async data => {
    try {
      const agentData = {
        ...data,
      };
      await dispatch(agentAction.addAgent(agentData));
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
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
              }}
              onSubmit={async values => {
                setIsLoading(true);
                await onAddAgent(values);
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
                  <View style={styles.nameContainer}>
                    <TextInput
                      label={'Enter Name'}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
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
                  <View style={styles.nameContainer}>
                    <TextInput
                      label={'Enter Phone Number'}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      mode={'outlined'}
                      keyboardType={'phone-pad'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.phone && errors.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
                      label={'Enter Address'}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      mode={'outlined'}
                      multiline={true}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.address && errors.address && (
                      <Text style={styles.errorText}>{errors.address}</Text>
                    )}
                  </View>
                  <View style={styles.nameContainer}>
                    <TextInput
                      label={'Enter City'}
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                      mode={'outlined'}
                      outlineColor={colors.PRIMARY}
                      style={styles.textInput}
                      theme={{
                        colors: {
                          primary: colors.PRIMARY,
                        },
                      }}
                    />
                    {touched.city && errors.city && (
                      <Text style={styles.errorText}>{errors.city}</Text>
                    )}
                  </View>
                  <Button
                    style={styles.buttonContainer}
                    mode={'contained'}
                    loading={isLoading}
                    color={colors.PRIMARY}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Add Agent</Text>
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
