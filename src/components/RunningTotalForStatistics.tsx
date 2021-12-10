import React from 'react';
import { testTransactionsAsJSON } from '../screens/TransactionLog';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create
({
  textStyle: 
  {
    position: 'absolute',
    top: 80,
    fontSize: 18,
  },    
});

interface TypeProps
{
  //0 for income, 1 for expenses
  type: number; 

  //0 for daily, 1 for weekly, 2 for monthly, 3 for yearly
  timePeriod: number;

  currentDay: number;
  currentMonth: number;
  currentYear: number;
}

export default function RunningTotalForStatistics({ type, timePeriod, currentDay, currentMonth, currentYear }: TypeProps)
{
  let income = 0;
  let expenses = 0;

  let Indenom = '';
  let Exdenom = '';

  for(let i = 0; i < testTransactionsAsJSON.length; i++)
  {     
    //check if we SHOULD consider this transaction
    if((timePeriod == 0 && testTransactionsAsJSON[i].day == currentDay &&
      testTransactionsAsJSON[i].month == currentMonth &&
      testTransactionsAsJSON[i].year == currentYear) ||
    (timePeriod == 1 && testTransactionsAsJSON[i].day <= currentDay && 
      testTransactionsAsJSON[i].day > currentDay - 7 &&
      testTransactionsAsJSON[i].month == currentMonth && 
      testTransactionsAsJSON[i].year == currentYear) ||
    (timePeriod == 2 && testTransactionsAsJSON[i].month == currentMonth) ||
    (timePeriod == 3 && testTransactionsAsJSON[i].year == currentYear))
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
  }

  let pseudoIncome: number = income;
  let pseudoExpense: number = expenses;

  if(pseudoIncome >= 1000 && pseudoIncome <= 999999)
  {
    pseudoIncome = (pseudoIncome/1000);
    Indenom = 'k';
  }
  else if(pseudoIncome >= 1000000 && pseudoIncome < 1000000000)
  {
    pseudoIncome = (pseudoIncome/1000000);
    Indenom = 'MM';
  }
  else if(pseudoIncome >= 1000000000)
  {
    pseudoIncome = (pseudoIncome/1000000000);
    Indenom = 'B';
  }

  if(pseudoExpense >= 1000 && pseudoExpense <= 999999)
  {
    pseudoExpense = (pseudoExpense/1000);
    Exdenom = 'k';
  }
  else if(pseudoExpense >= 1000000 && pseudoExpense< 1000000000)
  {
    pseudoExpense = (pseudoExpense/1000000);
    Exdenom = 'MM';
  }
  else if(pseudoExpense >= 1000000000)
  {
    pseudoExpense = (pseudoExpense/1000000000);
    Indenom = 'B';
  }

  return (
    <Text style = {styles.textStyle}> 
      {type == 0 ? `Total Income: $${pseudoIncome.toFixed(2)}${Indenom}` : `Total Expenses: $${pseudoExpense.toFixed(2)}${Exdenom}`} 
    </Text>
  );
}