import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import styles from './styles';
import {Button, Card, List, Paragraph, Title} from 'react-native-paper';
import moment from 'moment';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  ABOUT_US,
  AIRBNB_FOLLOW,
  COVID_SAFETY,
  FACEBOOK_FOLLOW,
  INSTAGRAM_FOLLOW,
  MAKE_RESERVATION,
} from '../../api/apiConstants';
import {handleURL} from '../../constants/commonFunctions';
import * as userAction from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';

const Index = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('Props', props);
  console.log('user', user);
  const onDeleteUser = async () => {
    Alert.alert('Delete Profile', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => await dispatch(userAction.deleteProfile()),
      },
    ]);
  };

  const onEditUser = () => {
    setModalVisible(true);
  };

  const onCloseClick = () => {
    setModalVisible(false);
  };

  const updateUser = async email => {
    console.log('update user', email);
    await dispatch(userAction.updateProfile(email));
    setModalVisible(false);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', onPress: async () => await dispatch(userAction.logout())},
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}} alwaysBounceVertical={true}>
        <View style={styles.profileContainer}>
          <Card elevation={10}>
            <Card.Content>
              <Title style={{color: colors.PRIMARY}}>Profile Details</Title>
            </Card.Content>
            <Card.Title
              title={user?.name}
              subtitle={`Joined on ${moment(user?.createdAt).format(
                'DD-MM-YYYY',
              )}`}
            />
            <Card.Content>
              <Title>{email}</Title>
            </Card.Content>
            <Card.Actions>
              <Button color={colors.PRIMARY} onPress={() => onEditUser()}>
                Update
              </Button>
              <Button color={colors.PRIMARY} onPress={() => onDeleteUser()}>
                Delete Account
              </Button>
            </Card.Actions>
          </Card>
        </View>
        <View style={styles.listContainer}>
          <Card elevation={10}>
            <List.Item
              title="COVID-19 Safety Measures"
              left={props => (
                <List.Icon {...props} icon="alert" color={colors.RED} />
              )}
              titleStyle={{color: colors.RED}}
              onPress={() => handleURL(COVID_SAFETY)}
            />
            <List.Item
              title="Home"
              left={props => <List.Icon {...props} icon="home" />}
              onPress={() => props.navigation.navigate('HomeScreen')}
            />
            <List.Item
              title="Bookings"
              left={props => <List.Icon {...props} icon="calendar" />}
              onPress={() => props.navigation.navigate('BookingsScreen')}
            />
            <List.Item
              title="Transactions"
              left={props => <List.Icon {...props} icon="credit-card" />}
              onPress={() => props.navigation.navigate('TransactionScreen')}
            />
            <List.Item
              title="Reports"
              left={props => <List.Icon {...props} icon="file-document" />}
            />
            <List.Item
              title="Settings"
              left={props => <List.Icon {...props} icon="cog" />}
            />
            <List.Item
              title="Make a Reservation"
              left={props => <List.Icon {...props} icon="bookmark" />}
              onPress={() => handleURL(MAKE_RESERVATION)}
            />
            <List.Item
              title="Contact Us"
              left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="About Us"
              left={props => <List.Icon {...props} icon="information" />}
              onPress={() => handleURL(ABOUT_US)}
            />
            <List.Item
              title="Logout"
              left={props => (
                <List.Icon {...props} icon="logout" color={colors.RED} />
              )}
              titleStyle={{color: colors.RED}}
              onPress={() => {
                handleLogout();
              }}
            />
          </Card>
        </View>
        <View style={styles.followContainer}>
          <Text style={styles.followText}>Follow Us</Text>
          <Ionicons
            name={'logo-facebook'}
            color={colors.FACEBOOK}
            size={30}
            onPress={() => handleURL(FACEBOOK_FOLLOW)}
          />
          <TouchableOpacity onPress={() => handleURL(INSTAGRAM_FOLLOW)}>
            <Image
              source={require('../../assets/images/instagram.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <FontAwesome5
            name={'airbnb'}
            color={colors.AIRBNB}
            size={30}
            onPress={() => handleURL(AIRBNB_FOLLOW)}
          />
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible && !isLoading}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.editView}>
            <Text style={styles.updateTitle}>{'Update Email!'}</Text>
            <TextInput
              value={email}
              style={styles.textField}
              returnKeyType={'done'}
              // maxLength={14}
              onChangeText={text => {
                console.log('email update', text);
                setEmail(text);
              }}
            />
            <TouchableOpacity style={styles.crossButton} onPress={onCloseClick}>
              <Text style={styles.crossButtonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                updateUser(email);
              }}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Index;
