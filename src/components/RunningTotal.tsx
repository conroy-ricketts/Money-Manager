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
    var income = 0;
    var expenses = 0;

    var Indenom = "";
    var Exdenom = "";

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

    let pseudoIncome: number = income;
    let pseudoExpense: number = expenses;


    if(pseudoIncome >= 1000 && pseudoIncome <= 999999)
    {
        pseudoIncome = (pseudoIncome/1000);
        Indenom = "k";
    }
    else if(pseudoIncome >= 1000000 && pseudoIncome < 1000000000)
    {
        pseudoIncome = (pseudoIncome/1000000);
        Indenom = "MM";
    }
    else if(pseudoIncome >= 1000000000)
    {
        pseudoIncome = (pseudoIncome/1000000000);
        Indenom = "B";
    }

    if(pseudoExpense >= 1000 && pseudoExpense <= 999999)
    {
        pseudoExpense = (pseudoExpense/1000);
        Exdenom = "k";
    }
    else if(pseudoExpense >= 1000000 && pseudoExpense< 1000000000)
    {
        pseudoExpense = (pseudoExpense/1000000);
        Exdenom = "MM";
    }
    else if(pseudoExpense >= 1000000000)
    {
        pseudoExpense = (pseudoExpense/1000000000);
        Indenom = "B";
    }

    return (
      <View style = {totalStyles.card}>
        <Text style = {[ totalStyles.incomeText, {position: 'absolute', left: 0, top: 0} ]}> {"Total Income: $" + pseudoIncome.toFixed(2) + Indenom} </Text>
        <Text style = {[ totalStyles.expenseText, {position: 'absolute', right: 5, top: 0} ]}> {"Total Expenses: $" + pseudoExpense.toFixed(2) + Exdenom} </Text>
      </View>
    );
}
export default RunningTotal;