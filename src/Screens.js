import {Navigation} from "react-native-navigation";
import Settings from './Settings';
import Calendar from './Calendar';
import DaySelected from "./DaySelected";

export function registerScreens() {

    Navigation.registerComponent('Calendar', () => Calendar);
    Navigation.registerComponent('DaySelected', () => DaySelected);
    Navigation.registerComponent('Settings', () => Settings);
}