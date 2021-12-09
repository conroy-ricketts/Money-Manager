import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { testTransactionsAsJSON } from './TransactionLog';

const OverView = () => {
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

    return (
             <View style={styles.container}>

               <Text style={[styles.assetsText]}>
                   <Text>{"Assets: "}</Text>
                   <Text style={{color: 'green'}}>{"$" + income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Text>

               <Text style={[styles.liabilitiesText]}>
                   <Text>{"Liabilities: "}</Text>
                   <Text style={{color: 'red'}}>{"$" + expenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Text>

                <View style={styles.label}>
                    <Text style={styles.text}>Accounts</Text>
                </View>
                    <View style={{position: 'absolute', bottom: 150, width: 333, height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
                    <Text style={{position: 'absolute', bottom: -20, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#DBDBD9', margin: 0, padding: 5}}>{"Net Total: $" + (income-expenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
        </View>
    );
}

export default OverView;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#DBDBD9',
    },
    text: {
        color: '#131313',
        fontSize: 30,
    },
    label: {
        top: 100
    },
    assetsText: {
        fontSize: 15,
        position: 'absolute', 
        left: 10, 
        top: 50
    },
    liabilitiesText: {
        fontSize: 15,
        position: 'absolute', 
        right: 5, 
        top: 50
    }
});