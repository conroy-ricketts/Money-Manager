import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const testTransactionsAsJSON: Transaction[] = [
  {
    date: 'Sept. 25, 2021 (Saturday)',
    category: 'Dogecoin Returns',
    subCategory: '',
    account: 'Crypto Wallet',
    type: 'income',
    amount: 100000,
  },
];

function TransactionLog() : JSX.Element {
  return (
    <View style = {styles.screen}>
        {testTransactionsAsJSON.map((transactionData) => (
            <View style = {styles.cards}>
                <TransactionCard transaction = {transactionData}/>
            </View>
        ))}
    </View>
  );
}

export default TransactionLog;