import React, {Component} from 'react';
import {Button, Picker, TouchableHighlight, Modal, Text, View} from 'react-native';
import {styles} from './Style'
import SplashScreen from "react-native-splash-screen";

var PushNotification = require('react-native-push-notification');
export default class Settings extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5
        };
    };

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={{marginTop: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Choose when notificasions need to shopw up</Text>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.seconds}
                    onValueChange={(item, index) => {
                        this.setState({seconds: item})
                    }}>
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="10" value={10}/>
                    <Picker.Item label="15" value={15}/>
                </Picker>
                <Button
                    title={"Button"}
                    onPress={() => {
                        PushNotification.localNotificationSchedule({
                            //... You can use all the options from localNotifications
                            title: "dupa salata",
                            message: "My Notification Message", // (required)
                            date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
                        });
                    }}>
                </Button>



                <Button
                    title={"ege"}
                    onPress={()=>{
                        let cos = Date.now();
                        let czas = new Date(2019,4,8,15,13);
                        let sum2 = czas - Date.now();
                       let sum =  new Date(cos+czas);
                        console.log(new Date(Date.now() + sum2))
                }}>
                </Button>
            </View>
        );
    }
}

