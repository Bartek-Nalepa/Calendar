import React, {Component} from 'react';
import {Alert, Picker, Button, TouchableOpacity, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {styles} from './Style'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Navigation} from "react-native-navigation";

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'DataBase.db', createFromLocation: 1});

export default class Calendar extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            foo: 9000, // power level over 9000!!!
            itsOver9000: 9000,
            count: 0,
            gestureName: '',
            PickerSelectedVal: 'asd',
            currentDate: new Date(),
            currentMonth: (new Date()).getMonth(),
            currentYear: (new Date()).getFullYear(),
            monthsArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        };
    };

    renderYears = () => { // PICKER
        var arr = [];
        var year = (new Date()).getFullYear() - 5;
        for (let i = 0; i <= 10; i++) {
            arr[i] = year.toString();
            year++;
        }
        return arr.map((a, index) => {
            return <Picker.Item label={`${a}`} value={`${a}`}/>
        })

    };

    componentDidMount = () => {
        SplashScreen.hide();
        this.createTable()
    };

    createTable() {
        const query = 'CREATE TABLE `calendar` (`day` INTEGER, `month` INTEGER, `year` INTEGER,`time` TEXT, `note` TEXT, `notifications` BOOLEAN, `notifications_id` INTEGER)';
        // const query = 'CREATE TABLE `devices` ( `name` TEXT, `place` TEXT,`command` TEXT)';
        // const query = 'INSERT INTO `tests` (`id`, `json`, `data`) VALUES (5,`caly`,`dzis`)';
        // const query = 'ALTER TABLE tests ADD data TEXT';
        return db.executeSql(query);
    };

    renderFirstWeek = () => {
        let monthNumber = this.state.currentMonth;
        let firstDayOfMonth = (new Date(`${monthNumber + 1}'.01.'${this.state.currentYear}`)).getDay();
        console.log(firstDayOfMonth);
        let howManyDaysInFirstWeekArr = [];
        let i = firstDayOfMonth;
        let j = 0;
        if (firstDayOfMonth !== 0) {
            while (i <= 7) {
                howManyDaysInFirstWeekArr[j] = j + 1;
                i++;
                j++;
            }
        } else {
            howManyDaysInFirstWeekArr[j] = j + 1
        }
        return howManyDaysInFirstWeekArr.map((dayItem, index) => {
            return <TouchableOpacity
                style={this.state.itsOver9000 === index ? styles.daySquareChanged : styles.daySquare} onPress={() => {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'DaySelected',
                        passProps: {day: dayItem, month: this.state.currentMonth, year: this.state.currentYear}
                    }
                });
                this.setState({itsOver9000: index, foo: 9000})
            }}><Text
                style={this.state.itsOver9000 === index ? {color: 'white'} : null}>{dayItem}</Text></TouchableOpacity>
        });
    };

    renderMiddleWeeks = () => {
        let monthNumber = this.state.currentMonth;
        let firstDayOfMonth = (new Date(`${monthNumber + 1}'.01.'${this.state.currentYear}`)).getDay();
        let howManyDaysInFirstWeek = 0;
        if (firstDayOfMonth !== 0) {
            for (let i = firstDayOfMonth; i <= 7; i++) {
                howManyDaysInFirstWeek = howManyDaysInFirstWeek + 1;
            }
        } else {
            howManyDaysInFirstWeek = 1
        }

        let howManyDaysInMiddleArr = [];
        let j = 0;
        while (howManyDaysInFirstWeek < this.state.monthsArr[monthNumber]) {
            if (this.state.currentYear % 4 === 0) {
                this.state.monthsArr[1] = 29;
            } else {
                this.state.monthsArr[1] = 28;
            }
            howManyDaysInMiddleArr[j] = howManyDaysInFirstWeek + 1;
            howManyDaysInFirstWeek++;
            j++;
        }
        return howManyDaysInMiddleArr.map((item, index) => {

            return <TouchableOpacity style={this.state.foo === index ? styles.daySquareChanged : styles.daySquare}
                                     onPress={() => {
                                         Navigation.push(this.props.componentId, {
                                             component: {
                                                 name: 'DaySelected',
                                                 passProps: {
                                                     day: item,
                                                     month: this.state.currentMonth,
                                                     year: this.state.currentYear
                                                 }
                                             }

                                         });
                                         this.setState({foo: index, itsOver9000: 9000})
                                     }}><Text
                style={this.state.foo === index ? {color: 'white'} : null}>{item}</Text></TouchableOpacity>
        })
    };

    displayMonth = (number) => {
        switch (number) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
        }
    };

    onSwipeMonths(gestureName, gestureState) {
        const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN, SWIPE_UP, SWIPE_UP_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
            case SWIPE_LEFT:
                if (this.state.currentMonth !== 0) {
                    this.setState({currentMonth: this.state.currentMonth - 1, foo: 9000, itsOver9000: 9000});
                } else {
                    this.setState({
                        currentMonth: 11,
                        currentYear: this.state.currentYear - 1,
                        foo: 9000,
                        itsOver9000: 9000
                    });
                }
                break;
            case SWIPE_DOWN:
                if (this.state.currentMonth !== 0) {
                    this.setState({currentMonth: this.state.currentMonth - 1, foo: 9000, itsOver9000: 9000});
                } else {
                    this.setState({
                        currentMonth: 11,
                        currentYear: this.state.currentYear - 1,
                        foo: 9000,
                        itsOver9000: 9000
                    });
                }
                break;
            case SWIPE_UP:
                if (this.state.currentMonth !== 11) {
                    this.setState({currentMonth: this.state.currentMonth + 1, foo: 9000, itsOver9000: 9000});
                } else {
                    this.setState({
                        currentMonth: 0,
                        currentYear: this.state.currentYear + 1,
                        foo: 9000,
                        itsOver9000: 9000
                    });
                }
                break;

            case SWIPE_UP_RIGHT:
                console.log(gestureName);
                if (this.state.currentMonth !== 11) {
                    this.setState({currentMonth: this.state.currentMonth + 1, foo: 9000, itsOver9000: 9000});
                } else {
                    this.setState({
                        currentMonth: 0,
                        currentYear: this.state.currentYear + 1,
                        foo: 9000,
                        itsOver9000: 9000
                    });
                }
                break;
            case SWIPE_RIGHT:
                console.log(gestureName);
                if (this.state.currentMonth !== 11) {
                    this.setState({currentMonth: this.state.currentMonth + 1, foo: 9000, itsOver9000: 9000});
                } else {
                    this.setState({
                        currentMonth: 0,
                        currentYear: this.state.currentYear + 1,
                        foo: 9000,
                        itsOver9000: 9000
                    });
                }
                break;
        }
    }

    onSwipeYears(gestureName, gestureState) {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gesutreName: gestureName});
        switch (gestureName) {
            case SWIPE_LEFT:
                this.setState({currentYear: this.state.currentYear - 1, foo: 9000, itsOver9000: 9000});
                break;
            case SWIPE_RIGHT:
                this.setState({currentYear: this.state.currentYear + 1, foo: 9000, itsOver9000: 9000});
                break;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipeMonths(direction, state)}>
                    <View style={styles.monthAndYearContainer}>
                        <TouchableOpacity style={styles.selectMonth}>
                            <Text style={{color: 'black'}}>{this.displayMonth(this.state.currentMonth)}</Text>
                        </TouchableOpacity>

                        <Picker
                            selectedValue={this.state.currentYear}
                            style={styles.selectYear}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({currentYear: itemValue})}>
                        <Picker.Item label={`${this.state.currentYear}`} value={`${this.state.currentYear}`}/>
                            {this.renderYears()}
                        </Picker>
                    </View>
                    <View style={styles.weekDayContainer}>

                        <View style={styles.weekDaySquareContainer}>
                            <Text> Mo.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> Tu.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> We.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> Th.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> Fr.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> Sa.</Text>
                        </View>
                        <View style={styles.weekDaySquareContainer}>
                            <Text> Su.</Text>
                        </View>
                    </View>
                    <View style={styles.firstWeekContainer}>
                        {this.renderFirstWeek()}
                    </View>
                    <View style={styles.middleWeekContainer}>
                        {this.renderMiddleWeeks()}
                    </View>

                </GestureRecognizer>
            </View>
        );
    }
}

