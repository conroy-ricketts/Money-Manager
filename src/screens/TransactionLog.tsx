import React, { useState }  from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TransactionCard, { Transaction } from '../components/TransactionCards';
import { Picker } from '@react-native-picker/picker';
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
      top: 20,
      left: 40,
      position: 'absolute',
    },
    viewToggle:
    {
      top: 20,
      right: 32,
      position: 'absolute',
    },
    scrollView:
    {
      marginVertical: 80,
    },
});

function TransactionLog() : JSX.Element {

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("daily");
  const [selectedView, setSelectedView] = useState("all");

  //we should render the most recent transactions by default
  let currentDay = testTransactionsAsJSON[0].day;
  let currentMonth = testTransactionsAsJSON[0].month;
  let currentYear = testTransactionsAsJSON[0].year;

  return (
    <View style = {styles.screen}>
      
      {/*Render the running total*/}
      <RunningTotal/>

      {/*Render the time toggle button*/}
      <View style = {styles.timeToggle}> 

        <Picker
          selectedValue = {selectedTimePeriod}
          style = {{ height: 50, width: 150 }}
          onValueChange = {(itemValue) => {

            setSelectedTimePeriod(itemValue);

            if(itemValue == "daily")
            {
              currentDay = testTransactionsAsJSON[0].day;
            }
            else if(itemValue == "weekly")
            {
              currentDay = testTransactionsAsJSON[0].day;
            }
            else if(itemValue == "monthly")
            {
              currentMonth = testTransactionsAsJSON[0].month;
            }
            else if(itemValue == "yearly")
            {
              currentYear = testTransactionsAsJSON[0].year;
            }
          }}
        >      

          {/*list options for time toggle*/}
          <Picker.Item label = "Daily" value = "daily" />
          <Picker.Item label = "Weekly" value = "weekly" />
          <Picker.Item label = "Monthly" value = "monthly" />
          <Picker.Item label = "Yearly" value = "yearly" />

        </Picker>     

      </View>    

      {/*Render the view toggle button*/}
      <View style = {styles.viewToggle}> 

        <Picker
          selectedValue = {selectedView}
          style = {{ height: 50, width: 150 }}
          onValueChange = {(itemValue) => setSelectedView(itemValue)}
        >      

          {/*list options for view toggle*/}
          <Picker.Item label = "All Types" value = "all" />
          <Picker.Item label = "Income" value = "income" />
          <Picker.Item label = "Expenses" value = "expense" />
          <Picker.Item label = "Transfers" value = "transfer" />

        </Picker>     

      </View>       

      {/*Pad the top of the scroll view so that it does not get overlapped*/}
      <View style = {{height: 10}}/>

      {/*Render the transaction cards*/}
      <ScrollView style = {styles.scrollView}>

        {/*Map an array of our test transactions to transaction cards to be rendered*/}
        {testTransactionsAsJSON.map((transactionData) => (

          //Only render a transaction if the user selected it's type in the view toggle
          //AND if the user selected it's time period
          (transactionData.type == selectedView || selectedView == "all") &&
          (
            (selectedTimePeriod == "daily" && transactionData.day == currentDay) ||
            (selectedTimePeriod == "weekly" && transactionData.day <= currentDay && 
            transactionData.day > currentDay - 7 &&
            transactionData.month == currentMonth && 
            transactionData.year == currentYear) ||
            (selectedTimePeriod == "monthly" && transactionData.month == currentMonth) ||
            (selectedTimePeriod == "yearly" && transactionData.year == currentYear)
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
    type: 'income',
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
    type: 'income',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'transfer',
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
    type: 'expense',
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
    type: 'income',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
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
    type: 'expense',
    amount: 214,
  },
];