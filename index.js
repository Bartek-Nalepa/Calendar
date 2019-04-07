import App from './App';
import {Navigation} from "react-native-navigation";
var React = require('react-native');
var SQLite = require('react-native-sqlite-storage')
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: "navigation.playground.WelcomeScreen"
            }
        }
    });
});