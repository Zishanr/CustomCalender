import React, { Component } from 'react';
import { View, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { userSelectedDate } from './selectDate.actions/SelectDateAction';


var startDate = new Date();
var dd = (startDate.getDate() < 10 ? '0' : '') + startDate.getDate();
var MM = ((startDate.getMonth() + 1) < 10 ? '0' : '') + (startDate.getMonth() + 1);
var year = startDate.getFullYear();


var endDate = new Date(startDate);
//var endDate = new Date();
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
                        container: {
                            backgroundColor: '#EB9572',
                        },
                        text: {
                            color: 'white',
                        },
                    },
                },
                [endyear + '-' + endMM + '-' + enddd]: {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: {
                            backgroundColor: '#EB9572',
                        },
                        text: {
                            color: 'white',
                        },
                    },
                }
            },

            userSelectedDateForFirstTime: false,

            disableDate: year + '-' + MM + '-' + dd
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
                                container: {
                                    backgroundColor: '#EB9572',
                                },
                                text: {
                                    color: 'white',
                                },
                            },
                        },
                        [endyear + '-' + endMM + '-' + enddd]: {
                            selected: true, disableTouchEvent: true, customStyles: {
                                container: {
                                    backgroundColor: '#EB9572',
                                },
                                text: {
                                    color: 'white',
                                },
                            },
                        }
                    });
                    this.props.showCalenderModel();
                }}
            >

                <View style={{
                    flex: 1, backgroundColor: '#252525CC', justifyContent: 'center',
                }}>


                    <Calendar

                        // Specify style for calendar container element. Default = {}
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            marginHorizontal: 40,
                            height: 410,
                        }}
                        markingType={'custom'}
                        // Specify theme properties to override specific styles for calendar parts. Default = {}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: 'white',
                            todayTextColor: 'black',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            arrowColor: 'black',
                            monthTextColor: '#797979',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'bold',
                            textDayHeaderFontFamily: 'monospace',
                            textMonthFontWeight: 'bold',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}

                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={this.state.disableDate}

                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={(year + 1) + '-' + MM + '-' + dd}

                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {

                            if (userClicks === 0) {
                                userClicks = userClicks + 1;
                                checkInDate = new Date(day.timestamp);
                                var secondDate = new Date(checkInDate);
                                secondDate.setDate(checkInDate.getDate() + 1);
                                this._getHighlightedDate(new Date(day.timestamp), secondDate, userClicks);

                                this.setState({ disableDate: day.dateString });
                            } else {
                                userClicks = 2;
                                this._getHighlightedDate(checkInDate, new Date(day.timestamp), userClicks);
                            }

                            this.setState({
                                intialDate: {
                                    intialStartDate: checkInDate,
                                    intialEndDate: new Date(day.timestamp)
                                }
                            });

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
                    />

                </View>

            </Modal>
        );
    }

    _onCancel() {
        if (!this.state.userSelectedDateForFirstTime) {
            this.setState({
                [year + '-' + MM + '-' + dd]: {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: {
                            backgroundColor: '#EB9572',
                        },
                        text: {
                            color: 'white',
                        },
                    },
                },
                [endyear + '-' + endMM + '-' + enddd]: {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: {
                            backgroundColor: '#EB9572',
                        },
                        text: {
                            color: 'white',
                        },
                    },
                }
            });
        }
        this.props.showCalenderModel();
    }

    _onDone = () => {
        this.setState({ userSelectedDateForFirstTime: true })
        this.props.showCalenderModel();
        this.props.userSelectedDate();
    }

    _getHighlightedDate = (startDate, endDate, userClicks) => {
        var hdate = {}
        if (userClicks === 1) {
            for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                hdate[[this._getSelectedDateFormatString(d)]] = {
                    selected: true, disableTouchEvent: true, customStyles: {
                        container: {
                            backgroundColor: '#EB9572',
                        },
                        text: {
                            color: 'white',
                        },
                    },
                }
            }
        } else {
            hdate[[this._getSelectedDateFormatString(startDate)]] = {
                selected: true, disableTouchEvent: true, customStyles: {
                    container: {
                        backgroundColor: '#EB9572',
                    },
                    text: {
                        color: 'white',
                    },
                },
            }
            hdate[[this._getSelectedDateFormatString(endDate)]] = {
                selected: true, disableTouchEvent: true, customStyles: {
                    container: {
                        backgroundColor: '#EB9572',
                    },
                    text: {
                        color: 'white',
                    },
                },
            }

            var inBetweenDates = new Date(startDate);
            inBetweenDates.setDate(inBetweenDates.getDate() + 1);
            for (var d = inBetweenDates; d < endDate; d.setDate(d.getDate() + 1)) {
                hdate[[this._getSelectedDateFormatString(d)]] = {
                    customStyles: {
                        text: {
                            color: '#EB9572',
                        },
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