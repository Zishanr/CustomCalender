import React, { Component } from 'react';
import { View, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalenderStyle from '../SelectDate/CalenderStyle';


let startDate = new Date();
let dd = (startDate.getDate() < 10 ? '0' : '') + startDate.getDate();
let MM = ((startDate.getMonth() + 1) < 10 ? '0' : '') + (startDate.getMonth() + 1);
let year = startDate.getFullYear();


let endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 1)
let enddd = (endDate.getDate() < 10 ? '0' : '') + endDate.getDate();
let endMM = ((endDate.getMonth() + 1) < 10 ? '0' : '') + (endDate.getMonth() + 1);
let endyear = endDate.getFullYear();

let userGesture = 0;
let checkInDate;


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
                            this._onCalenderDayPressed(day);
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

    _onCalenderDayPressed = (day) => {
        if (userGesture === 0) {
            userGesture = userGesture + 1;
            checkInDate = new Date(day.timestamp);
            let secondDate = new Date(checkInDate);
            secondDate.setDate(checkInDate.getDate() + 1);
            this._getHighlightedDate(new Date(day.timestamp), secondDate, userGesture);

            this.setState({
                disableDate: day.dateString,
                intialDate: {
                    intialStartDate: checkInDate,
                    intialEndDate: secondDate
                },
                checkInHighlighted: false
            });
        } else if (this.state.checkInHighlighted && userGesture > 0) {

            if (this.state.intialDate.intialStartDate > new Date(day.timestamp)) {
                checkInDate = new Date(day.timestamp);
                userGesture = 2;
                this.setState({
                    intialDate: {
                        intialStartDate: new Date(day.timestamp),
                        intialEndDate: this.state.intialDate.intialEndDate
                    }
                });
                this._getHighlightedDate(new Date(day.timestamp), this.state.intialDate.intialEndDate, userGesture);
            } else {
                userGesture = 1;
                let date = new Date(day.timestamp);
                let nextDate = new Date();
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
                this._getHighlightedDate(date, nextDate, userGesture);
            }
        } else {
            userGesture = 2;
            this.setState({
                intialDate: {
                    intialStartDate: checkInDate,
                    intialEndDate: new Date(day.timestamp)
                }
            });
            this._getHighlightedDate(checkInDate, new Date(day.timestamp), userGesture);
        }
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
            userGesture = 0;
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

    _getHighlightedDate = (startDate, endDate, userGesture) => {
        let hdate = {}
        let swapvar;

        if (startDate > endDate) {
            swapvar = startDate;
            startDate = endDate;
            endDate = swapvar;
        }

        if (userGesture === 1) {
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
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

            let inBetweenDates = new Date(startDate);
            inBetweenDates.setDate(inBetweenDates.getDate() + 1);
            for (let d = inBetweenDates; d < endDate; d.setDate(d.getDate() + 1)) {
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
        let hDD = (selectedDate.getDate() < 10 ? '0' : '') + selectedDate.getDate();
        let hMM = ((selectedDate.getMonth() + 1) < 10 ? '0' : '') + (selectedDate.getMonth() + 1);
        let hYY = selectedDate.getFullYear();

        return (hYY + '-' + hMM + '-' + hDD);
    }

}

export default CalenderModel;