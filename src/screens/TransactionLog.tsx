import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransactionCard from '../components/TransactionCards';

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

const testTransactionsAsJSON = [
    {

    },
    {

    },
    {

    },
];

function TransactionLog() : JSX.Element {
  return (
    <View style = {styles.screen}>
        {testTransactionsAsJSON.map(() => (
            <View style = {styles.cards}>
                <TransactionCard />
            </View>
        ))}
    </View>
  );
}

export default TransactionLog;