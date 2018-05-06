import React, { Component } from 'react';
import { View, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { userSelectedDate } from './selectDate.actions/SelectDateAction';
import CalenderStyle from '../SelectDate/CalenderStyle';


var startDate = new Date();
var dd = (startDate.getDate() < 10 ? '0' : '') + startDate.getDate();
var MM = ((startDate.getMonth() + 1) < 10 ? '0' : '') + (startDate.getMonth() + 1);
var year = startDate.getFullYear();


var endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 1)
var enddd = (endDate.getDate() < 10 ? '0' : '') + endDate.getDate();
var endMM = ((endDate.getMonth() + 1) < 10 ? '0' : '') + (endDate.getMonth() + 1);
var endyear = endDate.getFullYear();

var userClicks = 0;
var checkInDate;


class CalenderModel extends Component {

    constructor(props) {
        super(props);
        this.state = {

            intialDate: {
                intialStartDate: startDate,
                intialEndDate: endDate
            },

            highligtedDate: {
                [year + '-' + MM + '-' + dd]: {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: CalenderStyle.container,
                        text: CalenderStyle.whiteText
                    },
                },
                [endyear + '-' + endMM + '-' + enddd]: {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: CalenderStyle.container,
                        text: CalenderStyle.whiteText
                    },
                }
            },
            userSelectedDateForFirstTime: false,
            disableDate: year + '-' + MM + '-' + dd,
            checkInHighlighted: true
        };
    }

    render() {
        return (
            <Modal
                visible={this.props.modalVisible}
                transparent={true}
                animationType={'slide'}
                onRequestClose={() => {
                    this.setState({
                        [year + '-' + MM + '-' + dd]: {
                            selected: true, disableTouchEvent: true, customStyles: {
                                container: CalenderStyle.container,
                                text: CalenderStyle.whiteText
                            },
                        },
                        [endyear + '-' + endMM + '-' + enddd]: {
                            selected: true, disableTouchEvent: true, customStyles: {
                                container: CalenderStyle.container,
                                text: CalenderStyle.whiteText
                            },
                        }
                    });
                    this.props.showCalenderModel();
                }}>

                <View style={CalenderStyle.calenderModelContainer}>


                    <Calendar
                        style={CalenderStyle.calenderStyle}
                        markingType={'custom'}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#828282',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: 'white',
                            todayTextColor: 'black',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            arrowColor: 'black',
                            monthTextColor: '#797979',
                            textDayFontFamily: 'bold',
                            textMonthFontFamily: 'bold',
                            textDayHeaderFontFamily: 'bold',
                            textMonthFontWeight: 'bold',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                        minDate={this.state.disableDate}
                        maxDate={(year + 1) + '-' + MM + '-' + dd}

                        onDayPress={(day) => {

                            if (userClicks === 0) {
                                userClicks = userClicks + 1;
                                checkInDate = new Date(day.timestamp);
                                var secondDate = new Date(checkInDate);
                                secondDate.setDate(checkInDate.getDate() + 1);
                                this._getHighlightedDate(new Date(day.timestamp), secondDate, userClicks);

                                this.setState({
                                    disableDate: day.dateString,
                                    intialDate: {
                                        intialStartDate: checkInDate,
                                        intialEndDate: secondDate
                                    },
                                    checkInHighlighted: false
                                });
                            } else if (this.state.checkInHighlighted && userClicks > 0) {

                                if (this.state.intialDate.intialStartDate > new Date(day.timestamp)) {
                                    checkInDate = new Date(day.timestamp);
                                    userClicks = 2;
                                    this.setState({
                                        intialDate: {
                                            intialStartDate: new Date(day.timestamp),
                                            intialEndDate: this.state.intialDate.intialEndDate
                                        }
                                    });
                                    this._getHighlightedDate(new Date(day.timestamp), this.state.intialDate.intialEndDate, userClicks);
                                } else {
                                    userClicks = 1;
                                    var date = new Date(day.timestamp);
                                    var nextDate = new Date();
                                    nextDate.setDate(date.getDate() + 1);
                                    checkInDate = new Date(date);
                                    this.setState({
                                        checkInHighlighted: false,
                                        intialDate: {
                                            intialStartDate: new Date(day.timestamp),
                                            intialEndDate: nextDate,
                                        },
                                        disableDate: date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate()
                                    });
                                    this._getHighlightedDate(date, nextDate, userClicks);
                                }
                            } else {
                                userClicks = 2;
                                this.setState({
                                    intialDate: {
                                        intialStartDate: checkInDate,
                                        intialEndDate: new Date(day.timestamp)
                                    }
                                });
                                this._getHighlightedDate(checkInDate, new Date(day.timestamp), userClicks);
                            }
                        }}

                        startDateToShow={this.state.intialDate.intialStartDate}
                        endDateToShow={this.state.intialDate.intialEndDate}
                        markedDates={
                            this.state.highligtedDate
                        }
                        onCancel={() => this._onCancel()}
                        onDone={() => this._onDone()}
                        monthFormat={'MMM yyyy '}
                        firstDay={0}
                        onCheckInHeaderDateClicked={this._onCheckInHeaderDateClicked}
                        onCheckOutHeaderDateClicked={this._onCheckOutHeaderDateClicked}
                    />
                </View>
            </Modal>
        );
    }

    _onCheckInHeaderDateClicked = () => {
        this.setState({
            checkInHighlighted: true,
            disableDate: year + '-' + MM + '-' + dd
        })
    }

    _onCheckOutHeaderDateClicked = () => {

    }

    _onCancel() {
        if (!this.state.userSelectedDateForFirstTime) {
            userClicks = 0;
            this.setState({
                highligtedDate: {
                    [year + '-' + MM + '-' + dd]: {
                        selected: true, disableTouchEvent: true, customStyles: {
                            container: CalenderStyle.container,
                            text: CalenderStyle.whiteText
                        },
                    },
                    [endyear + '-' + endMM + '-' + enddd]: {
                        selected: true, disableTouchEvent: true, customStyles: {
                            container: CalenderStyle.container,
                            text: CalenderStyle.whiteText
                        },
                    }
                },
                disableDate: year + '-' + MM + '-' + dd
            });
        }
        this.props.showCalenderModel();
    }

    _onDone = () => {
        this.setState({ userSelectedDateForFirstTime: true })
        this.props.showCalenderModel();
        this.props.selectedDates(this.state.intialDate.intialStartDate, this.state.intialDate.intialEndDate);
    }

    _getHighlightedDate = (startDate, endDate, userClicks) => {
        var hdate = {}
        let swapvar;

        if (startDate > endDate) {
            swapvar = startDate;
            startDate = endDate;
            endDate = swapvar;
        }

        if (userClicks === 1) {
            for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                console.log('checkindate', checkInDate);
                hdate[[this._getSelectedDateFormatString(d)]] = {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: CalenderStyle.container,
                        text: CalenderStyle.whiteText
                    },
                }
            }
        } else {
            hdate[[this._getSelectedDateFormatString(startDate)]] = {
                selected: true, disableTouchEvent: true, customStyles: {
                    container: CalenderStyle.container,
                    text: CalenderStyle.whiteText
                },
            }
            hdate[[this._getSelectedDateFormatString(endDate)]] = {
                selected: true, disableTouchEvent: true, customStyles: {
                    container: CalenderStyle.container,
                    text: CalenderStyle.whiteText
                },
            }

            var inBetweenDates = new Date(startDate);
            inBetweenDates.setDate(inBetweenDates.getDate() + 1);
            for (var d = inBetweenDates; d < endDate; d.setDate(d.getDate() + 1)) {
                hdate[[this._getSelectedDateFormatString(d)]] = {
                    customStyles: {
                        text: CalenderStyle.coloredText
                    },
                }
            }
        }

        this.setState({ highligtedDate: hdate });
    }

    _getSelectedDateFormatString = (selectedDate) => {
        var hDD = (selectedDate.getDate() < 10 ? '0' : '') + selectedDate.getDate();
        var hMM = ((selectedDate.getMonth() + 1) < 10 ? '0' : '') + (selectedDate.getMonth() + 1);
        var hYY = selectedDate.getFullYear();

        return (hYY + '-' + hMM + '-' + hDD);
    }

}

export default connect(null, { userSelectedDate })(CalenderModel);