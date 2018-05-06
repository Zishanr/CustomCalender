import { StyleSheet } from 'react-native';


const GLOBAL_COLORS = require('../constants/Colors');

export default AppBarStyle = StyleSheet.create({
    appBarContainer: {
        height: 50,
        backgroundColor: GLOBAL_COLORS.BACKGROUND,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 10,
    },
    headerText: {
        fontSize: 18,
        color: 'white'
    }

});