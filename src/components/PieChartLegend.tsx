import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { testTransactionsAsJSON } from "../screens/TransactionLog";

interface TypeProps
{
  //0 for income, 1 for expenses
  type: number;
}

export default function PieChartLegend({ type }: TypeProps)
{
  const incomeAmounts: number[] = [];
  const expenseAmounts: number[] = [];
  const incomeCategories: string[] = [];
  const expenseCategories: string[] = [];
  const incomePercentages: number[] = [];
  const expensePercentages: number[] = [];
  let totalIncome = 0;
  let totalExpenses = 0;

  testTransactionsAsJSON.forEach(function (transaction)
  {
    //check if transaction is income
    if(transaction.type == 1)
    {
      let index = -1;
      let categoryExists = false;

      //check if the category exists
      incomeCategories.forEach(function (category) {
        if(transaction.category == category)
          categoryExists = true;
      })

      //add new category if it does not exist
      if(!categoryExists)
      {
        incomeCategories.push(transaction.category);
        incomeAmounts.push(transaction.amount);
        incomePercentages.push(-1);
        index = incomeCategories.length;
      }
      else
      {
        //add to existing category if it exists
        for(let i = 0; i < incomeCategories.length; i++)
        {
          if(incomeCategories[i] == transaction.category)
          {
            incomeAmounts[i] += transaction.amount;
            break;
          }
        }
      }
    }
    //check if transaction is expense
    else if(transaction.type == 2)
    {
      let index = -1;
      let categoryExists = false;

      //check if the category exists
      expenseCategories.forEach(function (category) {
        if(transaction.category == category)
          categoryExists = true;
      })

      //add new category if it does not exist
      if(!categoryExists)
      {
        expenseCategories.push(transaction.category);
        expenseAmounts.push(transaction.amount);
        expensePercentages.push(-1);
        index = expenseCategories.length;
      }
      else
      {
        //add to existing category if it exists
        for(let i = 0; i < expenseCategories.length; i++)
        {
          if(expenseCategories[i] == transaction.category)
          {
            expenseAmounts[i] += transaction.amount;
            break;
          }
        }
      }
    }
  })

  //calculate percentages
  incomeAmounts.forEach(function (amount) {totalIncome += amount})
  expenseAmounts.forEach(function (amount) {totalExpenses += amount})
  for(let i = 0; i < incomeCategories.length; i++)
    incomePercentages[i] = (incomeAmounts[i] / totalIncome) * 100;
  for(let i = 0; i < expenseCategories.length; i++)
    expensePercentages[i] = (expenseAmounts[i] / totalExpenses) * 100;

  return (
    <ScrollView style = {styles.scrollView}>
      {/*Render the array of categories and check if we want to render income or expenses*/}
      {type == 0 ? (
      incomeCategories.map((category, index) => (
        <View style = {styles.category} key = {index}>
          <Text style = {[styles.textStyle, {left: 0}]}>
            {`${incomePercentages[index].toFixed(2)}%`}
          </Text>
          <Text style = {[styles.textStyle, {left: 75}]}>
            {category.length > 15 ? category.substring(0, 15) + '...' : category}
          </Text>
          <Text style = {[styles.textStyle, {right: 0}]}>{incomeAmounts[index]}</Text>
        </View>
      )) ) : (
      expenseCategories.map((category, index) => (
        <View style = {styles.category} key = {index}>
          <Text style = {[styles.textStyle, {left: 0}]}>
            {`${expensePercentages[index].toFixed(2)}%`}
          </Text>
          <Text style = {[styles.textStyle, {left: 75}]}>
            {category.length > 15 ? category.substring(0, 15) + '...' : category}
          </Text>
          <Text style = {[styles.textStyle, {right: 0}]}>{expenseAmounts[index]}</Text>
        </View>
      )) )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView:
  {
    position: 'absolute',
  },
  category:
  {
    backgroundColor: '#DBDBD9',
    height: 30,
    width: 333,
  },
  textStyle:
  {
    fontSize: 18,
    position: 'absolute',
  },
});