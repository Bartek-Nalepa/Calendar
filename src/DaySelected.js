import React, {Component} from 'react';
import {FlatList, StyleSheet, Animated, Slider, Text, TextInput, View, Modal, TouchableOpacity} from 'react-native';
import {styles} from './Style'
import {Button, CheckBox, Header} from 'react-native-elements';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'DataBase.db', createFromLocation: 1});
export default class DaySelected extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            gestureName: '',
            modalVisible: false,
            editModalVisible: false,
            note: '',
            checked: false,
            time: '',
            timeInHours: (new Date()).getHours(),
            timeInMinutes: (new Date()).getMinutes(),
            day: props.day,
            month: props.month,
            year: props.year,
        };
    };

    makeInitialStates(){
        this.setState({note: '',
            checked: false,
            timeInHours: (new Date()).getHours(),
            timeInMinutes: (new Date()).getMinutes()})
    }
    readDb() {
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM calendar WHERE day = ${this.state.day} AND month = ${this.state.month} AND year = ${this.state.year} ORDER BY time`, [], (tx, results) => {
                var len = results.rows.length;
                var tab = [];
                for (let i = 0; i < len; i++) {
                    tab[i] = results.rows.item(i);
                }
                this.setState({list: tab});
            });
        });
    }

    componentDidMount = () => {
        this.readDb()
    };

    renderActivity = ({item, index}) => {
        return <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipeLeft(direction, state, item.day, item.month, item.year, item.time, item.note, index)}>
            <TouchableOpacity onPress={() => {
                var hours = parseFloat(item.time.slice(0, 2));
                var minutes = parseFloat(item.time.slice(3, 5));
                this.setState({
                    note: item.note,
                    checked: item.notifications,
                    time: item.item,
                    timeInHours: hours,
                    timeInMinutes: minutes
                });
                this.setEditModalVisible(true)
            }}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <View style={{
                        width: '15%',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5,
                        borderBottomWidth: 0.2,
                    }}>
                        <Text style={{textAlign: 'center'}}>{item.time}</Text>
                    </View>
                    <View style={{
                        width: '85%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderBottomWidth: 0.2,
                        marginRight: 5
                    }}>
                        <Text style={{textAlign: 'center'}}>{item.note}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </GestureRecognizer>
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible,});
    }

    setEditModalVisible(visible) {
        this.setState({editModalVisible: visible})
    };

    addToListAndDb() {
        let list = this.state.list;
        let list2 = [];
        list2 = list;
        var minutes = this.state.timeInMinutes;
        if (this.state.timeInMinutes < 10) {
            minutes = "0" + this.state.timeInMinutes;

        }
        list2.push({
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            time: `${this.state.timeInHours}:${minutes}`,
            note: this.state.note,
            notifications: this.state.checked,
        });
        console.log(minutes);
        let query = `INSERT INTO calendar (day, month, year,time, note, notifications) values (${this.state.day}, ${this.state.month}, ${this.state.year},'${this.state.timeInHours}:${minutes}', '${this.state.note}', '${this.state.checked}')`;
        this.setState({list: list2,});
        this.makeInitialStates();
        return db.executeSql(query);
    };

    editListAndDb() {
        let minutes = this.state.timeInMinutes;
        if (this.state.timeInMinutes < 10) {
            minutes = "0" + this.state.timeInMinutes;
        }
        const query = `UPDATE calendar SET note = '${this.state.note}', time = '${this.state.timeInHours}:${minutes}', notifications = '${this.state.checked}' WHERE day = ${this.state.day} AND month = ${this.state.month} AND year = ${this.state.year} AND notifications = '${this.state.checked}'`;
        return db.executeSql(query);
    };

    deleteFromDb(day, month, year, time, note) {
        const query = `DELETE FROM calendar WHERE day = ${day} AND month = ${month} AND year = ${year} AND time = '${time}' AND note = '${note}'`;
        return db.executeSql(query)
    }

    onSwipeLeft(gestureName, gestureState, day, month, year, time, note, index) {
        const {SWIPE_LEFT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_LEFT:
                this.deleteFromDb(day, month, year, time, note);
                this.readDb();
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>

                        <View>
                            <Header
                                leftComponent={<Button style={{width: 10}}
                                                       icon={<Icon name="arrow-left" size={15} color="white"/>}
                                                       iconLeft
                                                       onPress={() => {
                                                           this.setModalVisible(false)
                                                       }}
                                />}
                                centerComponent={{text: 'Add activity', style: {color: '#fff'}}}
                                rightComponent={<Button title={"Done"} onPress={() => {
                                    this.addToListAndDb();
                                    this.setModalVisible(false)
                                }}/>}
                            />

                            <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <TextInput
                                    style={{textAlignVertical: 'top', width: '90%', height: 250, borderWidth: 0.5}}
                                    multiline={true}
                                    numberOfLines={20}
                                    onChangeText={(text) => this.setState({note: text})}
                                    value={this.state.note}>
                                </TextInput>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Slider
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={23}
                                    value={this.state.timeInHours}
                                    onValueChange={(value) => {
                                        this.setState({timeInHours: value})
                                    }}
                                />
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 20
                                }}>at {this.state.timeInHours < 10 ? '0' : null}{this.state.timeInHours}:{this.state.timeInMinutes < 10 ? '0' : null}{this.state.timeInMinutes}</Text>
                                <Slider
                                    step={1}
                                    minimumValue={0}
                                    maximumValue={59}
                                    value={this.state.timeInMinutes}
                                    onValueChange={(value) => {
                                        this.setState({timeInMinutes: value})
                                    }}
                                />
                            </View>
                            <View style={{marginTop: 5}}>
                                <CheckBox title={'Set reminder?'}
                                          checked={this.state.checked}
                                          onPress={() => {
                                              this.setState({checked: !this.state.checked})
                                          }}
                                />
                            </View>

                        </View>
                    </Modal>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.editModalVisible}>
                    <View>
                        <Header
                            leftComponent={<Button style={{width: 10}}
                                                   icon={<Icon name="arrow-left" size={15} color="white"/>}
                                                   iconLeft
                                                   onPress={() => {
                                                       this.setEditModalVisible(false)
                                                   }}
                            />}
                            centerComponent={{text: 'Edit', style: {color: '#fff'}}}
                            rightComponent={<Button title={"Done"} onPress={() => {
                                this.editListAndDb();
                                this.setEditModalVisible(false);
                                this.readDb();
                            }}/>}
                        />

                        <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput
                                style={{textAlignVertical: 'top', width: '90%', height: 250, borderWidth: 0.5}}
                                multiline={true}
                                numberOfLines={20}
                                onChangeText={(text) => this.setState({note: text})}
                                value={this.state.note}>
                            </TextInput>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Slider
                                step={1}
                                minimumValue={0}
                                maximumValue={23}
                                value={this.state.timeInHours}
                                onValueChange={(value) => {
                                    this.setState({timeInHours: value})
                                }}
                            />
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20
                            }}>at {this.state.timeInHours < 10 ? '0' : null}{this.state.timeInHours}:{this.state.timeInMinutes < 10 ? '0' : null}{this.state.timeInMinutes}</Text>
                            <Slider
                                step={1}
                                minimumValue={0}
                                maximumValue={59}
                                value={this.state.timeInMinutes}
                                onValueChange={(value) => {
                                    this.setState({timeInMinutes: value})
                                }}
                            />
                        </View>
                        <View style={{marginTop: 5}}>
                            <CheckBox title={'Set reminder?'}
                                      checked={this.state.checked}
                                      onPress={() => {
                                          this.setState({checked: !this.state.checked})
                                      }}
                            />
                        </View>
                    </View>
                </Modal>


                {this.state.list.length <= 0 ?
                    <View>
                        <View style={{marginTop: 150}}>
                            <Text style={{fontSize: 25}}>No planned activities during day</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                            <Button style={{width: 125}} icon={<Icon name="arrow-right" size={15} color="white"/>}
                                    iconRight
                                    onPress={() => {
                                        this.setModalVisible(true);
                                        this.makeInitialStates();
                                    }}
                                    title="Add activity"
                            />
                        </View>
                    </View>
                    :
                    <View style={{marginTop: 10}}>
                        <Button style={{width: 125}} icon={<Icon name="arrow-right" size={15} color="white"/>}
                                iconRight
                                onPress={() => {
                                    this.setModalVisible(true);
                                    this.makeInitialStates();
                                }}
                                title="Add activity"/>
                        <FlatList
                            data={this.state.list}
                            extraData={this.state}
                            renderItem={this.renderActivity}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                }

            </View>
        );
    }
}

