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
} from 'react-native';
import styles from './styles';
import {Button, Card, List, Paragraph, Title} from 'react-native-paper';
import moment from 'moment';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ABOUT_US,
  COVID_SAFETY,
  FACEBOOK_FOLLOW,
  INSTAGRAM_FOLLOW,
} from '../../api/apiConstants';
import {handleURL} from '../../constants/commonFunctions';
import * as userAction from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';

const Index = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

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
              title={user.name}
              subtitle={`Joined on ${moment(user.createdAt).format(
                'DD-MM-YYYY',
              )}`}
            />
            <Card.Content>
              <Title>{user.email}</Title>
            </Card.Content>
            <Card.Actions>
              <Button color={colors.PRIMARY} onPress={() => alert('Update')}>
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
            />
            <List.Item
              title="Bookings"
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item
              title="Transactions"
              left={props => <List.Icon {...props} icon="credit-card" />}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
