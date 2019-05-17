import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginLeft: '2.5%',
        marginRight: '2.5%'
    },
    weekDayContainer: {
        flexDirection: 'row'
    },
    weekDaySquareContainer: {
        width: '14.28%',
        // backgroundColor: '#b3d9ff',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthAndYearContainer: {
        backgroundColor: '#e0e0eb',
        marginHorizontal: 50,
        marginVertical: 15,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    selectMonth: {
        width: 160,
        height: 35,
        backgroundColor: '#e0e0eb',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectYear: {
        width: 110,
        height: 35,
        borderRadius: 50,
        fontWeight: "700",
        alignItems: 'center',
        justifyContent: 'center',
    },

    daySquare: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '14.28%',
        height: 60,
    },
    daySquareChanged: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '14.28%',
        height: 60,
        borderRadius: 100,
        backgroundColor: 'red',

    },
    firstWeekContainer: {
        width: '99.99%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    middleWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: "wrap",
    }
});

