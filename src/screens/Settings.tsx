import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const Settings = () => {
  return (
    <View style = {styles.container}>

      {/*Padding*/}
      <View style = {{padding: 28}}/>

      {/*Screen header*/}
      <Text style = {styles.screenHeader}> {'Settings'} </Text>

      {/*Padding*/}
      <View style = {{padding: 16}}/>
            
      {/*Edit accounts button*/}
      <TouchableOpacity style = {styles.settingsButton}>
        <Text style = {styles.settingsButtonText}>
          {'Edit Accounts'}
        </Text>
      </TouchableOpacity>

      {/*Padding*/}
      <View style = {{padding: 10}}/>
            
      {/*Edit styles button*/}
      <TouchableOpacity style = {styles.settingsButton}>
        <Text style = {styles.settingsButtonText}>
          {'Edit Styles'}
        </Text>
      </TouchableOpacity>

      {/*Padding*/}
      <View style = {{padding: 10}}/>
            
      {/*Theme button*/}
      <TouchableOpacity style = {styles.settingsButton}>
        <Text style = {styles.settingsButtonText}>
          {'Theme'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: 
    {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#DBDBD9'
    },
  screenHeader: 
    {
      fontSize: 24,
      color: '#131313',
    },
  settingsButton:
    {
      width: 283,
      height: 44,
      borderWidth: 1,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
  settingsButtonText:
    {
      fontSize: 18,
    },
});