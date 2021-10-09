import React from 'react';
import { View, StyleSheet } from 'react-native';

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
});

export default function TransactionCard(): JSX.Element 
{
    return <View style = {styles.card}/>;
}