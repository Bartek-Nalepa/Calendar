import React, {Component} from 'react';
import {Alert, TouchableHighlight,Modal, Text, View} from 'react-native';
import {styles} from './Style'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Settings extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            listEmpty: true,
            modalVisible: false,
            list: [0]
        };
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

