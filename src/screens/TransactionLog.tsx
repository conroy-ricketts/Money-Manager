import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import TransactionCard, { Transaction } from '../components/TransactionCards';

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
      top: 72,
      padding: 3,
    },
});

function DateLabel({ date }: { date: string}): JSX.Element {
  return (
    <View style={{ width: 333, height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
      <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
      <Text style={{justifyContent: 'center', backgroundColor: '#DBDBD9', alignSelf: 'center', margin: '0', padding: 5 }}>{date}</Text>
      <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
    </View>
  )
}

function TransactionLog() : JSX.Element {
  return (
    <ScrollView style = {styles.screen}>

      {/* This following block of code maps an array of our test transactions
      to transaction cards to be rendered */}
      {testTransactionsAsJSON.map((transactionData, i) => (
          <View style = {styles.cards}>
            {i === 0 || transactionData.date !== testTransactionsAsJSON[i-1].date ? <DateLabel date={transactionData.date} /> : null}
              <TransactionCard transaction = {transactionData}/>
          </View>
      ))}

      {/* The following view component is only used to pad the bottom of the scroll
        view so that we can see the last card! */}
      <View style={{height: 300}} />

    </ScrollView>
  );
}

export default TransactionLog;

//The following JSON is temporary!
const testTransactionsAsJSON: Transaction[] = [
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