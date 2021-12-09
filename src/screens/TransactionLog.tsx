import React, { useState }  from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Modal, View, Text, TextInput } from 'react-native';
import TransactionCard, { Transaction } from '../components/TransactionCards';
import RunningTotal from '../components/RunningTotal';

const styles = StyleSheet.create
({
  screen:
    {
      flex: 1,
      backgroundColor: '#DBDBD9',
      alignItems: 'center',
    },
  cards: 
    {
      alignItems: 'center',
      top: 20,
      padding: 3,
    },
  timeToggle:
    {
      width: 80,
      height: 35,
      position: 'absolute',
      top: 30,
      left: 55,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  timeToggleText:
    {
      color: 'black',
      fontSize: 14,
    },
  viewToggle:
    {
      width: 80,
      height: 35,
      position: 'absolute',
      top: 30,
      right: 55,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  viewToggleText:
    {
      color: 'black',
      fontSize: 14,
    },
  scrollView:
    {
      marginVertical: 80,
    },
  previousButton:
    {
      width: 35,
      height: 35,
      position: 'absolute',
      top: 27,
      left: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
  addButton:
    {
      width: 80,
      height: 35,
      position: 'absolute',
      top: 30,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  nextButton:
    {
      width: 35,
      height: 35,
      position: 'absolute',
      top: 27,
      right: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
  editTransactionModal:
    {
      flex: 1,
      borderWidth: 2,
      borderColor: 'black',
      margin: 5,
      backgroundColor: '#DBDBD9',
      borderRadius: 20,
      alignItems: 'center',
    },
  closeEditTransactionModalButton:
    {
      position: 'absolute',
      width: 150,
      height: 35,
      borderWidth: 2,
      bottom: 20,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  textInputBox:
    {
      color: 'black',
      borderColor: 'black',
      borderWidth: 2,
      width: 300,
      paddingHorizontal: 10,
    },
});

function DateLabel({ date }: { date: string}): JSX.Element {
  return (
    <View style={{ width: 333, height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
      <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
      <Text style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: '#DBDBD9', margin: 0, padding: 5}}>{date}</Text>
      <View style={{flex: 1, height: 2, backgroundColor: '#000', margin: 0, padding: 0}} />
    </View>
  );
}
 
function TransactionLog() : JSX.Element {

  //0 for daily, 1 for weekly, 2 for monthly, 3 for yearly
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(0);
  const timeTitles: Array<string> = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  //0 for all, 1 for income, 2 for expenses, 3 for transfers
  const [selectedView, setSelectedView] = useState(0);
  const viewTitles: Array<string> = ['All', 'Income', 'Expenses', 'Transfers'];

  //we should render the most recent transactions by default
  const [currentDay, setCurrentDay] = useState(testTransactionsAsJSON[0].day);
  const [currentMonth, setCurrentMonth] = useState(testTransactionsAsJSON[0].month);
  const [currentYear, setCurrentYear] = useState(testTransactionsAsJSON[0].year);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(-1);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const tempTransaction: Transaction =
  {
    date: '',
    month: 0,
    day: 0,
    year: 0,
    category: '',
    subCategory: '',
    account: '',
    type: 0, //set this to 1 for income, 2 for expenses, or 3 for transfers
    amount: 0,
  };

  return (
    <View style = {styles.screen}>
      
      {/*Render the running total*/}
      <RunningTotal/>

      {/*Render the previos button*/}
      <TouchableOpacity style = {styles.previousButton} onPress = {() => {
        if(selectedTimePeriod == 0)
        {
          setCurrentDay(currentDay - 1);

          if(currentDay < 1)
          {
            setCurrentDay(31);
            setCurrentMonth(currentMonth - 1);

            if(currentMonth < 1)
            {
              setCurrentMonth(12);
              setCurrentYear(currentYear - 1);
            }
          }
        }
        else if(selectedTimePeriod == 1)
        {
          setCurrentDay(currentDay - 7);

          if(currentDay < 1)
          {
            setCurrentDay(31);
            setCurrentMonth(currentMonth - 1);

            if(currentMonth < 1)
            {
              setCurrentMonth(12);
              setCurrentYear(currentYear - 1);
            }
          }
        }
        else if(selectedTimePeriod == 2)
        {
          setCurrentMonth(currentMonth - 1);

          if(currentMonth < 1)
          {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
          }
        }
        else if(selectedTimePeriod == 3)
        {
          setCurrentYear(currentYear - 1);
        }
      }}>
        <Text style = {{fontSize: 30}}>{'<'}</Text>
      </TouchableOpacity>

      {/*Render the next button*/}
      <TouchableOpacity style = {styles.nextButton} onPress = {() => {
        if(selectedTimePeriod == 0)
        {
          setCurrentDay(currentDay + 1);

          if(currentDay > 31)
          {
            setCurrentDay(1);
            setCurrentMonth(currentMonth + 1);

            if(currentMonth > 12)
            {
              setCurrentMonth(1);
              setCurrentYear(currentYear + 1);
            }
          }
        }
        else if(selectedTimePeriod == 1)
        {
          setCurrentDay(currentDay + 7);

          if(currentDay > 31)
          {
            setCurrentDay(1);
            setCurrentMonth(currentMonth + 1);

            if(currentMonth > 12)
            {
              setCurrentMonth(1);
              setCurrentYear(currentYear + 1);
            }
          }
        }
        else if(selectedTimePeriod == 2)
        {
          setCurrentMonth(currentMonth + 1);

          if(currentMonth > 12)
          {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
          }
        }
        else if(selectedTimePeriod == 3)
        {
          setCurrentYear(currentYear + 1);
        }}}>
        <Text style = {{fontSize: 30}}>{'>'}</Text>
      </TouchableOpacity>

      {/*Render the time toggle button*/}
      <TouchableOpacity style = {styles.timeToggle} onPress = {() => setSelectedTimePeriod((selectedTimePeriod + 1) % 4)}>
        <Text style = {styles.timeToggleText}>{timeTitles[selectedTimePeriod]}</Text>
      </TouchableOpacity>

      {/*Render the view toggle button*/}
      <TouchableOpacity style = {styles.viewToggle} onPress = {() => setSelectedView((selectedView + 1) % 4)}>
        <Text style = {styles.viewToggleText}>{viewTitles[selectedView]}</Text>
      </TouchableOpacity>

      {/*Render the add button button*/}
      <TouchableOpacity style = {styles.addButton} onPress = {() => setAddModalVisible(!addModalVisible)}>
        <Text style = {{color: 'black', fontSize: 14}}>{'Add'}</Text>
      </TouchableOpacity>

      {/*Add transaction modal*/}
      <Modal
        animationType = 'slide'
        transparent = {true}
        visible = {addModalVisible}
        onRequestClose = {() => setModalVisible(!modalVisible)}
      >
        <View style = {styles.editTransactionModal}>

          <View style = {{padding: 15}}/>
          <Text>{'Date (Month-Day-Year) (NO leading 0s)'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {

              //format for data is Month-Day-Year, so data parsed is [month, day, year]
              const dataParsed = value.nativeEvent.text.split(/[-]+/);
              let month = '';

              switch(dataParsed[0]) {
              case '1': {
                month = 'Jan.';
                break;
              }
              case '2': {
                month = 'Feb.';
                break;
              }
              case '3': {
                month = 'Mar.';
                break;
              }
              case '4': {
                month = 'Apr.';
                break;
              }
              case '5': {
                month = 'May';
                break;
              }
              case '6': {
                month = 'June';
                break;
              }
              case '7': {
                month = 'July';
                break;
              }
              case '8': {
                month = 'Aug.';
                break;
              }
              case '9': {
                month = 'Sept.';
                break;
              }
              case '10': {
                month = 'Oct.';
                break;
              }
              case '11': {
                month = 'Nov.';
                break;
              }
              case '12': {
                month = 'Dec.';
                break;
              }
              }

              tempTransaction.month = Number(dataParsed[0]);
              tempTransaction.day = Number(dataParsed[1]);
              tempTransaction.year = Number(dataParsed[2]);                
              tempTransaction.date = `${month} ${dataParsed[1]}, ${dataParsed[2]}`;
            }}
          />

          <View style = {{padding: 15}}/>
          <Text>{'Category (be consistent!)'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {
              tempTransaction.category = value.nativeEvent.text;
            }}
          />
          
          <View style = {{padding: 15}}/>
          <Text>{'Subcategory (be consistent!)'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {
              tempTransaction.subCategory = value.nativeEvent.text;
            }}
          />
          
          <View style = {{padding: 15}}/>
          <Text>{'Account (be consistent!)'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {
              tempTransaction.account = value.nativeEvent.text;
            }}
          />
          
          <View style = {{padding: 15}}/>
          <Text>{'Type (income, expense, or transfer)'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {
              if(value.nativeEvent.text == 'income')
              {
                tempTransaction.type = 1;
              }
              else if(value.nativeEvent.text == 'expense')
              {
                tempTransaction.type = 2;
              }
              else if(value.nativeEvent.text == 'transfer')
              {
                tempTransaction.type = 3;
              }
            }}
          />
          
          <View style = {{padding: 15}}/>
          <Text>{'Amount'}</Text>

          <View style = {{padding: 5}}/>
          <TextInput 
            style = {styles.textInputBox}
            onEndEditing = {(value) => {
              tempTransaction.amount = Number(value.nativeEvent.text);
            }}
          />

          <TouchableOpacity style = {styles.closeEditTransactionModalButton} onPress = {() => {
            setAddModalVisible(!addModalVisible);
            testTransactionsAsJSON.unshift(tempTransaction);
          }}>
            <Text>{'Close'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/*Pad the top of the scroll view so that it does not get overlapped*/}
      <View style = {{height: 10}}/>

      {/*Render the transaction cards*/}
      <ScrollView style = {styles.scrollView}>

        {/*Map an array of our test transactions to transaction cards to be rendered*/}
        {testTransactionsAsJSON.map((transactionData, index) => (
          //Only render a transaction if the user selected it's type in the view toggle
          //AND if the user selected it's time period
          (transactionData.type == selectedView || selectedView == 0) &&
          (
            (selectedTimePeriod == 0 && transactionData.day == currentDay &&
              transactionData.month == currentMonth &&
              transactionData.year == currentYear) ||
            (selectedTimePeriod == 1 && transactionData.day <= currentDay && 
              transactionData.day > currentDay - 7 &&
              transactionData.month == currentMonth && 
              transactionData.year == currentYear) ||
            (selectedTimePeriod == 2 && transactionData.month == currentMonth) ||
            (selectedTimePeriod == 3 && transactionData.year == currentYear)
          ) ?
            (
              <TouchableOpacity style = {styles.cards} onPress = {() => {setModalVisible(!modalVisible); setTransactionToEdit(index);}} key = {index}>
                { 
                  index === 0 || transactionData.date !== testTransactionsAsJSON[index-1].date || 
                transactionData.type !== testTransactionsAsJSON[index-1].type && selectedView !== 0 ?
                    <DateLabel date={transactionData.date}/>  
                    : null
                }
                <TransactionCard transaction = {transactionData}/>
              </TouchableOpacity>
            )
            : null

        ))}

        {/*Pad the bottom of the scroll view so that we can see the last card!*/}
        <View style = {{height: 300}}/>

        {/*Edit transaction modal*/}
        <Modal
          animationType = 'slide'
          transparent = {true}
          visible = {modalVisible}
          onRequestClose = {() => setModalVisible(!modalVisible)}
        >
          <View style = {styles.editTransactionModal}>

            <View style = {{padding: 15}}/>
            <Text>{'Date (MM-DD-YYYY)'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {

                //format for data is MM-DD-YYYY, so data parsed is [month, day, year]
                const dataParsed = value.nativeEvent.text.split(/[-]+/);
                let month = '';

                switch(dataParsed[0]) {
                case '1': {
                  month = 'Jan.';
                  break;
                }
                case '2': {
                  month = 'Feb.';
                  break;
                }
                case '3': {
                  month = 'Mar.';
                  break;
                }
                case '4': {
                  month = 'Apr.';
                  break;
                }
                case '5': {
                  month = 'May';
                  break;
                }
                case '6': {
                  month = 'June';
                  break;
                }
                case '7': {
                  month = 'July';
                  break;
                }
                case '8': {
                  month = 'Aug.';
                  break;
                }
                case '9': {
                  month = 'Sept.';
                  break;
                }
                case '10': {
                  month = 'Oct.';
                  break;
                }
                case '11': {
                  month = 'Nov.';
                  break;
                }
                case '12': {
                  month = 'Dec.';
                  break;
                }
                }

                testTransactionsAsJSON[transactionToEdit].month = Number(dataParsed[0]);
                testTransactionsAsJSON[transactionToEdit].day = Number(dataParsed[1]);
                testTransactionsAsJSON[transactionToEdit].year = Number(dataParsed[2]);                
                testTransactionsAsJSON[transactionToEdit].date = `${month} ${dataParsed[1]}, ${dataParsed[2]}`;
              }}
            />

            <View style = {{padding: 15}}/>
            <Text>{'Category (be consistent!)'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {
                testTransactionsAsJSON[transactionToEdit].category = value.nativeEvent.text;
              }}
            />
            
            <View style = {{padding: 15}}/>
            <Text>{'Subcategory (be consistent!)'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {
                testTransactionsAsJSON[transactionToEdit].subCategory = value.nativeEvent.text;
              }}
            />
            
            <View style = {{padding: 15}}/>
            <Text>{'Account (be consistent!)'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {
                testTransactionsAsJSON[transactionToEdit].account = value.nativeEvent.text;
              }}
            />
            
            <View style = {{padding: 15}}/>
            <Text>{'Type (income, expense, or transfer)'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {
                if(value.nativeEvent.text == 'income')
                {
                  testTransactionsAsJSON[transactionToEdit].type = 1;
                }
                else if(value.nativeEvent.text == 'expense')
                {
                  testTransactionsAsJSON[transactionToEdit].type = 2;
                }
                else if(value.nativeEvent.text == 'transfer')
                {
                  testTransactionsAsJSON[transactionToEdit].type = 3;
                }
              }}
            />
            
            <View style = {{padding: 15}}/>
            <Text>{'Amount'}</Text>

            <View style = {{padding: 5}}/>
            <TextInput 
              style = {styles.textInputBox}
              onEndEditing = {(value) => {
                testTransactionsAsJSON[transactionToEdit].amount = Number(value.nativeEvent.text);
              }}
            />

            <TouchableOpacity style = {styles.closeEditTransactionModalButton} onPress = {() => setModalVisible(!modalVisible)}>
              <Text>{'Close'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>

    </View>
  );
}

export default TransactionLog;

//The following JSON is temporary!
//The most recent transaction goes to the top of this array.
export const testTransactionsAsJSON: Transaction[] = [
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'A Really Really Long Category Name',
    subCategory: '',
    account: 'A Really Really Long Account Name',
    type: 1,
    amount: 100000,
  },
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Dogecoin Returns',
    subCategory: '',
    account: 'Crypto Wallet',
    type: 1,
    amount: 100000,
  },
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 24.12,
  },
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 14.15,
  },
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 54.20,
  },
  {
    date: 'Sept. 25, 2021',
    month: 9,
    day: 25,
    year: 2021,
    category: 'Food',
    subCategory: 'Fast Food',
    account: 'Checking Account',
    type: 2,
    amount: 20.12,
  },
  {
    date: 'Sept. 24, 2021',
    month: 9,
    day: 24,
    year: 2021,
    category: 'Transfer',
    subCategory: '',
    account: 'Checking Account -> Savings Account',
    type: 3,
    amount: 100,
  },
  {
    date: 'Sept. 24, 2021',
    month: 9,
    day: 24,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 54.12,
  },
  {
    date: 'Sept. 23, 2021',
    month: 9,
    day: 23,
    year: 2021,
    category: 'Salary',
    subCategory: '',
    account: 'Checking Account',
    type: 1,
    amount: 5652.40,
  },
  {
    date: 'Sept. 22, 2021',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Haircut',
    subCategory: '',
    account: 'Credit Card',
    type: 2,
    amount: 30,
  },
  {
    date: 'Sept. 22, 2021',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 54.12,
  },
  {
    date: 'Sept. 22, 2021',
    month: 9,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Sept. 14, 2021',
    month: 9,
    day: 14,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
  {
    date: 'August. 31, 2021',
    month: 8,
    day: 31,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'August. 22, 2021',
    month: 8,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Aug. 22, 2021',
    month: 8,
    day: 22,
    year: 2021,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
  {
    date: 'Jan. 22, 2020',
    month: 1,
    day: 22,
    year: 2020,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 23.12,
  },
  {
    date: 'Jan. 22, 2020',
    month: 1,
    day: 22,
    year: 2020,
    category: 'Groceries',
    subCategory: '',
    account: 'Checking Account',
    type: 2,
    amount: 214,
  },
];
