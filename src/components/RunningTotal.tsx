// The top of the transaction history log should show a running total of income and expenses.
import React from 'react';
import { testTransactionsAsJSON } from '../screens/TransactionLog';
import { View, StyleSheet, Text } from 'react-native';

var normalTextSize = 14;

const totalStyles = StyleSheet.create
({
    card: 
    {
      top: 75,
      alignSelf: 'center',
      backgroundColor: '#DBDBD9',
      height: 12,
      width: 365,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: 'black',      
      position: 'absolute',
    },
    incomeText:
    {
      fontWeight: "bold",
      fontSize: normalTextSize,
      color: '#008315',
    },
    expenseText:
    {
      fontWeight: "bold",
      fontSize: normalTextSize,
      color: '#DB0000',
    },
    balanceText:
    {
      fontWeight: "bold",
      fontSize: normalTextSize,
      color: '#0057D9',
    },    
});

function RunningTotal()
{
    var balance = 0;
    var income = 0;
    var expenses = 0;
    for(var i = 0; i < testTransactionsAsJSON.length; i++)
    {
      
        if(testTransactionsAsJSON[i].type == 1)
        {
            income += testTransactionsAsJSON[i].amount;

        }
        else if(testTransactionsAsJSON[i].type == 2)
        {
            expenses += testTransactionsAsJSON[i].amount;
        }
    }


    balance = income - expenses;
    //<Text style = {[ totalStyles.balanceText, {position: 'absolute', right: 111, top: 50} ]}> {balance} </Text>
    return (
      <View style = {totalStyles.card}>
        <Text style = {[ totalStyles.incomeText, {position: 'absolute', left: 0, top: 0} ]}> {"Total Income: $" + income.toFixed(2)} </Text>
        <Text style = {[ totalStyles.expenseText, {position: 'absolute', right: 5, top: 0} ]}> {"Total Expenses: $" + expenses.toFixed(2)} </Text>
      </View>
    );
}
export default RunningTotal;