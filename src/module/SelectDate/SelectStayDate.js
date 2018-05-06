import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SelectStayDateStyle from '../SelectDate/SelectStayDateStyle';
import { AppBar } from '../../common/AppBar';
import CalenderModel from './CalenderModel';
import { connect } from 'react-redux';

const GLOBAL_STRING = require('../../constants/String');

class SelectStayDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false, checkInCheckoutDateDisplay: 'Enter Travel Dates',
            dateTextStyle: SelectStayDateStyle.selectedDateText
        };
    }

    render() {
        return (
            <View style={SelectStayDateStyle.container}>

                <AppBar
                    headerText={'New Delhi'}></AppBar>


                <TouchableOpacity style={SelectStayDateStyle.selectedDateDisplayContainer}
                    onPress={this._showCalenderModel}>

                    <Image
                        style={SelectStayDateStyle.calenderImage}
                        source={require('../../../asests/calendar.png')} />

                    <Text style={this.state.dateTextStyle}>
                        {this.state.checkInCheckoutDateDisplay}
                    </Text>
                </TouchableOpacity>

                <CalenderModel
                    modalVisible={this.state.showModal}
                    showCalenderModel={this._showCalenderModel}
                    selectedDates={this._selectedDate} />

            </View>
        )
    }

    _showCalenderModel = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    _selectedDate = (checkInDate, checkOutDate) => {
        this.setState({ dateTextStyle : [this.state.dateTextStyle, {color : 'black'}], checkInCheckoutDateDisplay: new Date(checkInDate).toGMTString().slice(0, 12) + new Date(checkOutDate).toGMTString().slice(0, 12) });
    }
}

_mapStateToProps = ({ selectDateReducer }) => {
    const { date } = selectDateReducer;
    return { date };
}

export default connect(_mapStateToProps, {})(SelectStayDate);