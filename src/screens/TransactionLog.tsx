import React, { useState }  from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import TransactionCard, { Transaction } from '../components/TransactionCards';
import RunningTotal from '../components/RunningTotal';

const styles = StyleSheet.create
({
    screen:
    {
      flex: 1,
      backgroundColor: '#DBDBD9',
      alignItems: 'center',
    },
    cards: 
    {
      alignItems: 'center',
      top: 20,
      padding: 3,
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
    scrollView:
    {
      marginVertical: 80,
    },
});

function TransactionLog() : JSX.Element {

  //0 for daily, 1 for weekly, 2 for monthly, 3 for yearly
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(0);
  const timeTitles: Array<string> = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  //0 for all, 1 for income, 2 for expenses, 3 for transfers
  const [selectedView, setSelectedView] = useState(0);
  const viewTitles: Array<string> = ['All', 'Income', 'Expenses', 'Transfers'];

  //we should render the most recent transactions by default
  let currentDay = testTransactionsAsJSON[0].day;
  let currentMonth = testTransactionsAsJSON[0].month;
  let currentYear = testTransactionsAsJSON[0].year;

  return (
    <View style = {styles.screen}>
      
      {/*Render the running total*/}
      <RunningTotal/>

      {/*Render the time toggle button*/}
      <TouchableOpacity style = {styles.timeToggle} onPress = {() => setSelectedTimePeriod((selectedTimePeriod + 1) % 4)}>
        <Text style = {styles.timeToggleText}>{timeTitles[selectedTimePeriod]}</Text>
      </TouchableOpacity>

      {/*Render the view toggle button*/}
      <TouchableOpacity style = {styles.viewToggle} onPress = {() => setSelectedView((selectedView + 1) % 4)}>
          <Text style = {styles.viewToggleText}>{viewTitles[selectedView]}</Text>
      </TouchableOpacity>

      {/*Pad the top of the scroll view so that it does not get overlapped*/}
      <View style = {{height: 10}}/>

      {/*Render the transaction cards*/}
      <ScrollView style = {styles.scrollView}>

        {/*Map an array of our test transactions to transaction cards to be rendered*/}
        {testTransactionsAsJSON.map((transactionData) => (

          //Only render a transaction if the user selected it's type in the view toggle
          //AND if the user selected it's time period
          (transactionData.type == selectedView || selectedView == 0) &&
          (
            (selectedTimePeriod == 0 && transactionData.day == currentDay) ||
            (selectedTimePeriod == 1 && transactionData.day <= currentDay && 
            transactionData.day > currentDay - 7 &&
            transactionData.month == currentMonth && 
            transactionData.year == currentYear) ||
            (selectedTimePeriod == 2 && transactionData.month == currentMonth) ||
            (selectedTimePeriod == 3 && transactionData.year == currentYear)
          ) ?
          (
            <View style = {styles.cards}>
              <TransactionCard transaction = {transactionData}/>
            </View>
          )
          : null

        ))}

        {/*Pad the bottom of the scroll view so that we can see the last card!*/}
        <View style = {{height: 300}}/>

      </ScrollView>

    </View>
  );
}

export default TransactionLog;

//The following JSON is temporary!
//The most recent transaction goes to the top of this array.
export const testTransactionsAsJSON: Transaction[] = [
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'A Really Really Long Category Name',
    subCategory: '',
    account: 'A Really Really Long Account Name',
    type: 1,
    amount: 100000,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Dogecoin Returns',
    subCategory: '',
    account: 'Crypto Wallet',
    type: 1,
    amount: 100000,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 24.12,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 14.15,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 54.20,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 20.12,
  },
  {
    date: 'Sept. 24, 2021 (Friday)',
    month: 9,
    day: 24,
    year: 2021,
    category: 'Transfer',
    subCategory: '',
    account: 'Checking Account -> Savings Account',
    type: 3,
    amount: 100,
  },
  {
    date: 'Sept. 24, 2021 (Friday)',
    month: 9,
    day: 24,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 54.12,
  },
  {
    date: 'Sept. 23, 2021 (Thursday)',
    month: 9,
    day: 23,
    year: 2021,
    category: 'Salary',
    subCategory: '',
    account: 'Checking Account',
    type: 1,
    amount: 5652.40,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Haircut',
    subCategory: '',
    account: 'Credit Card',
    type: 2,
    amount: 30,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 54.12,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
  {
    date: 'Oct. 22, 2021 (Wednesday)',
    month: 10,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Oct. 22, 2021 (Wednesday)',
    month: 10,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
  {
    date: 'Jan. 22, 2022 (Wednesday)',
    month: 1,
    day: 22,
    year: 2022,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Jan. 22, 2022 (Wednesday)',
    month: 1,
    day: 22,
    year: 2022,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
];