import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import StoreConfig from './src/redux/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
// import messaging from '@react-native-firebase/messaging';
// import {Alert, AsyncStorage} from 'react-native';
// import firebase from 'react-native-firebase';

const App = () => {
  // async function checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }
  //
  // //3
  // async function getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       // user has a device token
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  // }
  //
  // //2
  // async function requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }
  //
  // async function createNotificationListeners() {
  //   /*
  //    * Triggered when a particular notification has been received in foreground
  //    * */
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       const {title, body} = notification;
  //       this.showAlert(title, body);
  //     });
  //
  //   /*
  //    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //    * */
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       const {title, body} = notificationOpen.notification;
  //       this.showAlert(title, body);
  //     });
  //
  //   /*
  //    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //    * */
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     const {title, body} = notificationOpen.notification;
  //     showAlert(title, body);
  //   }
  //   /*
  //    * Triggered for data only payload in foreground
  //    * */
  //   this.messageListener = firebase.messaging().onMessage(message => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });
  // }
  //
  // function showAlert(title, body) {
  //   Alert.alert(
  //     title,
  //     body,
  //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //     {cancelable: false},
  //   );
  // }
  //
  // useEffect(() => {
  //   checkPermission();
  //   createNotificationListeners();
  // });

  return (
    <Provider store={StoreConfig().store}>
      <PersistGate loading={null} persistor={StoreConfig().persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
