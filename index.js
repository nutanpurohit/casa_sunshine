/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {LogBox} from 'react-native';

import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();
