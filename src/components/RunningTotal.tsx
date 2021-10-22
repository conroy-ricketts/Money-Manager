// The top of the transaction history log should show a running total of income and expenses.
import React, { Component } from 'react';
import TransactionLog, {} from '../screens/TransactionLog';
import { testTransactionsAsJSON } from '../screens/TransactionLog';
import { View, StyleSheet, Text } from 'react-native';

const totalStyles = StyleSheet.create
({
    incomeText:
    {
      fontWeight: "bold",
      fontFamily: "Times New Roman",
      fontSize: 24,
      color: '#008315',
    },
    expenseText:
    {
      fontWeight: "bold",
      fontFamily: "Times New Roman",
      fontSize: 24,
      color: '#DB0000',
    },
    balanceText:
    {
      fontWeight: "bold",
      fontFamily: "Times New Roman",
      fontSize: 24,
      color: '#0057D9',
    },    
});

function RunningTotal()
{
    var balance = 0;
    var income = 0;
    var expenses = 0;
    for(var i = 0; i < TransactionLog.length; i++)
    {
        if(testTransactionsAsJSON[i].type == 'income')
        {
            income += testTransactionsAsJSON[i].amount;

        }
        else if(testTransactionsAsJSON[i].type == 'expense')
        {
            expenses += testTransactionsAsJSON[i].amount;
        }
    }

    balance = income - expenses;
    return (
      <View>
        <Text style = {[ totalStyles.balanceText, {position: 'absolute', left: 10, top: 20} ]}> {balance} </Text>
        <Text style = {[ totalStyles.incomeText, {position: 'absolute', left: 10, top: 30} ]}> {income} </Text>
        <Text style = {[ totalStyles.expenseText, {position: 'absolute', left: 10, top: 40} ]}> {expenses} </Text>
      </View>
    );
}
export default RunningTotal;