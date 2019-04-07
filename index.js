import { Navigation } from "react-native-navigation";
import {registerScreens} from "./src/Screens"
registerScreens();



Navigation.events().registerAppLaunchedListener(() => {

    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
            // drawBehind: true,
            animate: true,
            buttonColor: 'black',
            title: {
                color: 'blue',
                alignment: 'flex-start',

            },
            background: {
                color: 'white'
            }
        },
    });

    Navigation.setRoot({
        root: {
            sideMenu: {
                topBar:{

                },
                center: {
                    stack: {
                        id: 'MAIN_STACK',
                        children: [
                            {
                                component: {
                                    name: 'Calendar',
                                    // name: 'DaySelected'
                                    // name: 'Settings'
                                }
                            }]
                    }
                },
            }
        }
    })
});