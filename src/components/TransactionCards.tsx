import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create
({
    card: 
    {
      backgroundColor: '#DBDBD9',
      height: 61,
      width: 333,
      borderRadius: 5,
      borderWidth: 1.5,
      borderColor: 'black',
    },
    normalText:
    {
      fontSize: 12,
      color: 'black',
    },
    incomeText:
    {
      fontSize: 24,
      color: '#008315',
    },
    expenseText:
    {
      fontSize: 24,
      color: '#DB0000',
    },
    transferText:
    {
      fontSize: 24,
      color: '#0057D9',
    },    
});

export interface Transaction
{
  date: string;
  category: string;
  subCategory: string;
  account: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
}

interface TransactionProps
{
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionProps) 
{
  let denom: string = "";
  let pseudoAmount: number = 0;
  var toggleAltFormat: boolean = false;
  let amountStyle: any;
  let transactionCategory: string = 
    transaction.subCategory == "" ? transaction.category :
    `${transaction.category} - ${transaction.subCategory}`;

  if(transaction.type == 'income')
  {
    amountStyle = styles.incomeText;
  }
  else if(transaction.type == 'expense')
  {
    amountStyle = styles.expenseText;
  }
  else
  {
    amountStyle = styles.transferText;
  }

  if(transaction.amount >= 1000 && transaction.amount <= 999999)
  {
      pseudoAmount = transaction.amount/1000;
      denom = "k";
      toggleAltFormat = true;
  }
  else if(transaction.amount >= 1000000 && transaction.amount < 1000000000)
  {
      pseudoAmount = transaction.amount/1000000;
      denom = "MM";
      toggleAltFormat = true;
  }
  else if(transaction.amount >= 1000000000)
  {
      pseudoAmount = transaction.amount/1000000000;
      denom = "B";
      toggleAltFormat = true;
  }


  if(toggleAltFormat)
  {
    return (
      <View style = {styles.card}>
        <Text style = {[ styles.normalText, {position: 'absolute', left: 0, top: 0} ]}> {transaction.date} </Text>
        <Text style = {[ styles.normalText, {position: 'absolute', left: 0, bottom: 1} ]}> {transactionCategory} </Text>
        <Text style = {[ styles.normalText, {position: 'absolute', left: 125, top: 20} ]}> {transaction.account} </Text>
        <Text style = {[ amountStyle, {position: 'absolute', right: 0, top: 15} ]}> {`$${pseudoAmount.toFixed(2) + denom}`} </Text>
      </View>
    );
  }
  else
  {
  return (
    <View style = {styles.card}>
      <Text style = {[ styles.normalText, {position: 'absolute', left: 0, top: 0} ]}> {transaction.date} </Text>
      <Text style = {[ styles.normalText, {position: 'absolute', left: 0, bottom: 1} ]}> {transactionCategory} </Text>
      <Text style = {[ styles.normalText, {position: 'absolute', left: 125, top: 20} ]}> {transaction.account} </Text>
      <Text style = {[ amountStyle, {position: 'absolute', right: 0, top: 15} ]}> {`$${transaction.amount}`} </Text>
    </View>
  );
  }
}