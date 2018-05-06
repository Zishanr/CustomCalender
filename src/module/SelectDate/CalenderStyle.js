import { StyleSheet } from 'react-native';

const GLOBAL_COLOR = require('../../constants/Colors');

export default CalenderStyle = StyleSheet.create({
    calenderModelContainer: {
        flex: 1,
        backgroundColor: '#252525CC',
        justifyContent: 'center',
    },
    calenderStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 40,
        height: 410,
    },

    container: {
        backgroundColor: '#EB9572',
    },

    whiteText: {
        color: 'white',
    },
    coloredText: {
        color: '#EB9572',
    }

});