import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { testTransactionsAsJSON } from './TransactionLog';

interface Account { 
    name: string, 
    amount: number,
 };

const OverView = () => {
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [accounts, setAccounts] = useState<Account[]>([]);

    function calculateRunningTotal()
    {
        let tempIncome = 0;
        let tempExpenses = 0;
        const accountList: Account[] = [];

        for(var i = 0; i < testTransactionsAsJSON.length; i++)
        {
            const {amount} = testTransactionsAsJSON[i]
            let account = accountList.find(acc => acc.name === testTransactionsAsJSON[i].account)

            if(testTransactionsAsJSON[i].type === 1)
            {
                if(!account) 
                {
                    account = {name: testTransactionsAsJSON[i].account, amount: 0}
                    accountList.push(account)
                }   
            
                tempIncome += amount
                account.amount += amount
            }
            else if(testTransactionsAsJSON[i].type === 2)
            {
                if(!account) 
                {
                    account = {name: testTransactionsAsJSON[i].account, amount: 0}
                    accountList.push(account)
                }
                tempExpenses += amount
                account.amount -= amount
            }

            else if(testTransactionsAsJSON[i].type === 3)
            {
                const [from, to] = testTransactionsAsJSON[i].account.split(' -> ')
                const fromObj = accountList.find(acc => acc.name === from)
                const toObj = accountList.find(acc => acc.name === to)
                if(fromObj) 
                {
                    fromObj.amount -= amount
                }
                else
                {
                    accountList.push({name: from, amount: -amount})
                }
                if(toObj) 
                {
                    toObj.amount += amount
                }
                else
                {
                    accountList.push({name: to, amount: amount})
                }
            }
        }
        setIncome(tempIncome)
        setExpenses(tempExpenses)
        setAccounts(accountList)
    }
    
    useEffect(calculateRunningTotal, [])
    return (
             <View style={styles.container}>

               <Text style={[styles.assetsText]}>
                   <Text>Assets: </Text>
                   <Text style={{color: '#008315'}}>{"$" + income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Text>

               <Text style={[styles.liabilitiesText]}>
                   <Text>Liabilities: </Text>
                   <Text style={{color: '#DB0000'}}>{"$" + expenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Text>

                <View style={styles.label}>
                    <Text style={styles.titleText}>Accounts</Text>
                </View>

                

                <View style={{top: 150, width: '100%', paddingHorizontal: 10}}>
                    {accounts.map((account, index) => (
                        <View key = {index} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: 10}}>
                        <Text numberOfLines={1} style={{fontSize: 20, maxWidth: '50%'}}>{account.name}</Text>
                        <Text style={{fontSize: 20, color: account.amount < 0 ? "#DB0000" : "#008315"}}>{"$" + Math.abs(account.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                    ))}
                </View>

                <View style={{position: 'absolute', bottom: 150, width: 333, height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
                        <Text style={{fontSize: 18, position: 'absolute', bottom: -20, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#DBDBD9', margin: 0, padding: 5}}>{"Net Total: $" + (income-expenses).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
    titleText: {
        color: '#131313',
        fontSize: 30,
    },
    label: {
        top: 100
    },
    assetsText: {
        fontSize: 18,
        position: 'absolute', 
        left: 10, 
        top: 50
    },
    liabilitiesText: {
        fontSize: 18,
        position: 'absolute', 
        right: 5, 
        top: 50
    },

});