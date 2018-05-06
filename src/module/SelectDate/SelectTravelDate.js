import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SelectTravelDateStyle from '../SelectDate/SelectTravelDateStyle';
import { AppBar } from '../../common/AppBar';
import CalenderModel from './CalenderModel';
import { connect } from 'react-redux';

const GLOBAL_STRING = require('../../constants/String');

class SelectTravelDate extends Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false, };
    }

    render() {
        return (
            <View style={SelectTravelDateStyle.container}>

                <AppBar
                    headerText={'New Delhi'}></AppBar>


                <TouchableOpacity style={{
                    height: 50, backgroundColor: 'white', margin: 15, borderRadius: 5, flexDirection: 'row', alignItems: 'center', padding: 10
                }}
                    onPress={this._showCalenderModel}>

                    <Image
                        style={{ height: 25, width: 25 }}
                        source={require('../../../asests/calendar.png')} />

                    <Text style={{ paddingLeft: 10, fontSize: 15 }}>
                        Enter Travel Dates
                        </Text>
                </TouchableOpacity>

                <CalenderModel
                    modalVisible={this.state.showModal}
                    showCalenderModel={this._showCalenderModel}
                    selectedDate={this._selectedDate} />

            </View>
        )
    }

    _showCalenderModel = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    _selectedDate = (stringdata) => {
        // console.log(stringdata);
    }
}

_mapStateToProps = ({ selectDateReducer }) => {
    const { date } = selectDateReducer;
    return { date };
}

export default connect(_mapStateToProps, {})(SelectTravelDate);