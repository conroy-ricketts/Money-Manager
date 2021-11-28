import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { testTransactionsAsJSON } from './TransactionLog';

const Statistics = () => {

    //0 for daily, 1 for weekly, 2 for monthly, 3 for yearly
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(0);
    const timeTitles: Array<string> = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

    //0 for income, 1 for expenses
    const [selectedView, setSelectedView] = useState(0);
    const viewTitles: Array<string> = ['Income', 'Expenses'];

    const [currentDay, setCurrentDay] = useState(testTransactionsAsJSON[0].day);
    const [currentMonth, setCurrentMonth] = useState(testTransactionsAsJSON[0].month);
    const [currentYear, setCurrentYear] = useState(testTransactionsAsJSON[0].year);

    return (
        <View style={styles.container}>

            {/*Render the previos button*/}
            <TouchableOpacity style = {styles.previousButton} onPress = {() => {
                if(selectedTimePeriod == 0)
                {
                setCurrentDay(currentDay - 1);

                if(currentDay < 1)
                {
                    setCurrentDay(31);
                    setCurrentMonth(currentMonth - 1);

                    if(currentMonth < 1)
                    {
                    setCurrentMonth(12);
                    setCurrentYear(currentYear - 1);
                    }
                }
                }
                else if(selectedTimePeriod == 1)
                {
                setCurrentDay(currentDay - 7);

                if(currentDay < 1)
                {
                    setCurrentDay(31);
                    setCurrentMonth(currentMonth - 1);

                    if(currentMonth < 1)
                    {
                    setCurrentMonth(12);
                    setCurrentYear(currentYear - 1);
                    }
                }
                }
                else if(selectedTimePeriod == 2)
                {
                setCurrentMonth(currentMonth - 1);

                if(currentMonth < 1)
                {
                    setCurrentMonth(12);
                    setCurrentYear(currentYear - 1);
                }
                }
                else if(selectedTimePeriod == 3)
                {
                setCurrentYear(currentYear - 1);
                }
            }}>
                <Text style = {{fontSize: 30}}>{'<'}</Text>
            </TouchableOpacity>

            {/*Render the next button*/}
            <TouchableOpacity style = {styles.nextButton} onPress = {() => {
                if(selectedTimePeriod == 0)
                {
                setCurrentDay(currentDay + 1);

                if(currentDay > 31)
                {
                    setCurrentDay(1);
                    setCurrentMonth(currentMonth + 1);

                    if(currentMonth > 12)
                    {
                    setCurrentMonth(1);
                    setCurrentYear(currentYear + 1);
                    }
                }
                }
                else if(selectedTimePeriod == 1)
                {
                setCurrentDay(currentDay + 7);

                if(currentDay > 31)
                {
                    setCurrentDay(1);
                    setCurrentMonth(currentMonth + 1);

                    if(currentMonth > 12)
                    {
                    setCurrentMonth(1);
                    setCurrentYear(currentYear + 1);
                    }
                }
                }
                else if(selectedTimePeriod == 2)
                {
                setCurrentMonth(currentMonth + 1);

                if(currentMonth > 12)
                {
                    setCurrentMonth(1);
                    setCurrentYear(currentYear + 1);
                }
                }
                else if(selectedTimePeriod == 3)
                {
                setCurrentYear(currentYear + 1);
                }}}>
                <Text style = {{fontSize: 30}}>{'>'}</Text>
            </TouchableOpacity>

            {/*Render the time toggle button*/}
            <TouchableOpacity style = {styles.timeToggle} onPress = {() => setSelectedTimePeriod((selectedTimePeriod + 1) % 4)}>
                <Text style = {styles.timeToggleText}>{timeTitles[selectedTimePeriod]}</Text>
            </TouchableOpacity>

            {/*Render the view toggle button*/}
            <TouchableOpacity style = {styles.viewToggle} onPress = {() => setSelectedView((selectedView + 1) % 2)}>
                <Text style = {styles.viewToggleText}>{viewTitles[selectedView]}</Text>
            </TouchableOpacity>
  
        </View>
    );
}

export default Statistics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBDBD9'
    },
    text: {
        color: '#131313',
        fontWeight: 'bold',
        fontSize: 30,
    },
    timeToggle:
    {
      width: 100,
      height: 35,
      position: 'absolute',
      top: 30,
      left: 60,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    timeToggleText:
    {
      color: 'black',
      fontSize: 14,
    },
    viewToggle:
    {
      width: 100,
      height: 35,
      position: 'absolute',
      top: 30,
      right: 60,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    viewToggleText:
    {
      color: 'black',
      fontSize: 14,
    },
    previousButton:
    {
      width: 35,
      height: 35,
      position: 'absolute',
      top: 27,
      left: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextButton:
    {
      width: 35,
      height: 35,
      position: 'absolute',
      top: 27,
      right: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
});