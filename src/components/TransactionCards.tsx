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
      fontSize: 14,
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
  let amountStyle: any;
  let transactionCategory: string = 
    transaction.subCategory == "" ? transaction.category :
    `${transaction.category} - ${transaction.subCategory}`;

  {/*truncate both the account name and the category name so that they do not overlap with the transcation amount*/}
  let truncateSize = 30;
  let accountName: string =
    transaction.account.length > truncateSize ? transaction.account.substring(0, truncateSize) + "..." :
    transaction.account;
  let categoryName: string =
    transactionCategory.length > truncateSize ? transactionCategory.substring(0, truncateSize) + "..." :
    transactionCategory;

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

  return (
    <View style = {styles.card}>
      <Text style = {[ styles.normalText, {position: 'absolute', left: 3, top: 5} ]}> {accountName} </Text>
      <Text style = {[ styles.normalText, {position: 'absolute', left: 3, bottom: 7} ]}> {categoryName} </Text>
      <Text style = {[ amountStyle, {position: 'absolute', right: 0, top: 15} ]}> {`$${transaction.amount}`} </Text>
    </View>
  );
}