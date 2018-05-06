import { StyleSheet } from 'react-native';


const GLOBAL_COLOR = require('../../constants/Colors');

export default SelectStayDateStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GLOBAL_COLOR.BACKGROUND,
    },
    selectedDateDisplayContainer: {
        height: 50,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    calenderImage: {
        height: 25,
        width: 25
    },
    selectedDateText: {
        paddingLeft: 10,
        fontSize: 15
    }
});