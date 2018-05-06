import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AppBarStyle from '../common/AppBarStyle';


const AppBar = ({ headerText }) => {
    return (
        <View style={AppBarStyle.appBarContainer}>

            <Text style={AppBarStyle.headerText}> {headerText} </Text>

        </View>
    );
}
export { AppBar };