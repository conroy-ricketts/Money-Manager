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
    },
    cards: 
    {
      alignItems: 'center',
      top: 20,
      padding: 3,
    },
    viewToggle:
    {
      paddingTop: 10,
      paddingLeft: 170,
    },
});

function TransactionLog() : JSX.Element {

  const [selectedView, setSelectedView] = useState("all");

  return (
    <View style = {styles.screen}>
      
      {/*Render the running total*/}
      <RunningTotal/>

      {/*Render the view toggle button*/}
      <View style = {styles.viewToggle}> 

        <Picker
          selectedValue = {selectedView}
          style = {{ height: 50, width: 150 }}
          onValueChange = {(itemValue) => setSelectedView(itemValue)}
        >      

          {/*list options for view toggle*/}
          <Picker.Item label = "All" value = "all" />
          <Picker.Item label = "Income" value = "income" />
          <Picker.Item label = "Expenses" value = "expense" />
          <Picker.Item label = "Transfers" value = "transfer" />

        </Picker>     

      </View>       

      {/*Pad the top of the scroll view so that it does not get overlapped*/}
      <View style = {{height: 10}}/>

      {/*Render the transaction cards*/}
      <ScrollView>

        {/*Map an array of our test transactions to transaction cards to be rendered*/}
        {testTransactionsAsJSON.map((transactionData) => (
          
          //Only render a transaction if the user selected it's type in the view toggle
          transactionData.type == selectedView || selectedView == "all" ?
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
export const testTransactionsAsJSON: Transaction[] = [
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Dogecoin Returns',
    subCategory: '',
    account: 'Crypto Wallet',
    type: 'income',
    amount: 100000,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 'expense',
    amount: 24.12,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 'expense',
    amount: 14.15,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 'expense',
    amount: 54.20,
  },
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 'expense',
    amount: 20.12,
  },
  {
    date: 'Sept. 24, 2021 (Friday)',
    category: 'Transfer',
    subCategory: '',
    account: 'Checking Account -> Savings Account',
    type: 'transfer',
    amount: 100,
  },
  {
    date: 'Sept. 24, 2021 (Friday)',
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 'expense',
    amount: 54.12,
  },
  {
    date: 'Sept. 23, 2021 (Thursday)',
    category: 'Salary',
    subCategory: '',
    account: 'Checking Account',
    type: 'income',
    amount: 5652.40,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    category: 'Haircut',
    subCategory: '',
    account: 'Credit Card',
    type: 'expense',
    amount: 30,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 'expense',
    amount: 54.12,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 'expense',
    amount: 23.12,
  },
  {
    date: 'Sept. 22, 2021 (Wednesday)',
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 'expense',
    amount: 214,
  },
];