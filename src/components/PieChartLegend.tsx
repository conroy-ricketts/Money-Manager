import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { testTransactionsAsJSON } from '../screens/TransactionLog';
import { colorSet } from '../components/PieChartT';

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

interface categoryCard
{
  amount: number;
  category: string;
  percentage: number;
}

export const incomeCards: categoryCard[] = [];
export const expenseCards: categoryCard[] = [];

export default function PieChartLegend({ type, timePeriod, currentDay, currentMonth, currentYear }: TypeProps)
{
  //empty the income and expense card arrays
  while(incomeCards.length > 0) 
    incomeCards.pop();
  while(expenseCards.length > 0) 
    expenseCards.pop();

  let totalIncome = 0;
  let totalExpenses = 0;

  testTransactionsAsJSON.forEach(function (transaction)
  {
    //check if we SHOULD consider this transaction
    if((timePeriod == 0 && transaction.day == currentDay &&
      transaction.month == currentMonth &&
      transaction.year == currentYear) ||
    (timePeriod == 1 && transaction.day <= currentDay && 
      transaction.day > currentDay - 7 &&
      transaction.month == currentMonth && 
      transaction.year == currentYear) ||
    (timePeriod == 2 && transaction.month == currentMonth) ||
    (timePeriod == 3 && transaction.year == currentYear))
    {
      //check if transaction is income
      if(transaction.type == 1)
      {
        let index = -1;
        let categoryExists = false;

        //check if the category exists
        incomeCards.forEach(function (card) {
          if(transaction.category == card.category)
            categoryExists = true;
        });

        //add new card if its category does not exist
        if(!categoryExists)
        {
          incomeCards.push({amount: transaction.amount, category: transaction.category, percentage: -1});
          index = incomeCards.length;
        }
        else
        {
          //add to existing category if it exists
          for(let i = 0; i < incomeCards.length; i++)
          {
            if(incomeCards[i].category == transaction.category)
            {
              incomeCards[i].amount += transaction.amount;
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
        expenseCards.forEach(function (card) {
          if(transaction.category == card.category)
            categoryExists = true;
        });

        //add new card if its category does not exist
        if(!categoryExists)
        {
          expenseCards.push({amount: transaction.amount, category: transaction.category, percentage: -1});
          index = expenseCards.length;
        }
        else
        {
          //add to existing category if it exists
          for(let i = 0; i < expenseCards.length; i++)
          {
            if(expenseCards[i].category == transaction.category)
            {
              expenseCards[i].amount += transaction.amount;
              break;
            }
          }
        }
      }
    }
  });

  //calculate percentages
  incomeCards.forEach(function (card) {totalIncome += card.amount;});
  expenseCards.forEach(function (card) {totalExpenses += card.amount;});
  for(let i = 0; i < incomeCards.length; i++)
    incomeCards[i].percentage = (incomeCards[i].amount / totalIncome) * 100;
  for(let i = 0; i < expenseCards.length; i++)
    expenseCards[i].percentage = (expenseCards[i].amount / totalExpenses) * 100;

  //sort both income and expense cards from greatest amount to smallest
  incomeCards.sort((a, b) => (a.amount > b.amount ? -1 : 1));
  expenseCards.sort((a, b) => (a.amount > b.amount ? -1 : 1));

  return (
    <ScrollView style = {styles.scrollView}>
      {/*Render the array of categories and check if we want to render income or expenses*/}
      {type == 0 ? (
        incomeCards.map((card, index) => (
          <View style = {styles.category} key = {index}>
            <View style = {[styles.temporaryLegendColorForPercentatges, {backgroundColor: colorSet[index % colorSet.length]}]}/>
            <Text style = {[styles.textStyle, {left: 3}]}>
              {`${card.percentage.toFixed(2)}%`}
            </Text>
            <Text style = {[styles.textStyle, {left: 90}]}>
              {card.category.length > 13 ? card.category.substring(0, 13) + '...' : card.category}
            </Text>
            <Text style = {[styles.textStyle, {right: 0}]}>{`$${card.amount.toFixed(2)}`}</Text>
          </View>
        )) ) : (
        expenseCards.map((card, index) => (
          <View style = {styles.category} key = {index}>
          <View style = {[styles.temporaryLegendColorForPercentatges, {backgroundColor: colorSet[index % colorSet.length]}]}/>
            <Text style = {[styles.textStyle, {left: 3}]}>
              {`${card.percentage.toFixed(2)}%`}
            </Text>
            <Text style = {[styles.textStyle, {left: 90}]}>
              {card.category.length > 13 ? card.category.substring(0, 13) + '...' : card.category}
            </Text>
            <Text style = {[styles.textStyle, {right: 0}]}>{`$${card.amount.toFixed(2)}`}</Text>
          </View>
        )) )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView:
  {
    position: 'absolute',
    top: 390,
  },
  category:
  {
    height: 30,
    width: 333,
  },
  textStyle:
  {
    fontSize: 18,
    position: 'absolute',
  },
  temporaryLegendColorForPercentatges:
  {
    width: 75, 
    height: 25, 
    left: 0,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
});