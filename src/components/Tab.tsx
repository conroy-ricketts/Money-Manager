import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Image} from 'react-native'
import OverView from '../screens/Overview';
import Settings from '../screens/Settings';
import Statistics from '../screens/Statistics';
import TransactionLog from '../screens/TransactionLog';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
        screenOptions={{
          header: () => null,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#131313',
            borderRadius: 10,
            height: 70,
          }
        }}
        >
          <Tab.Screen 
          name='Overview' 
          component={OverView} 
          options={{
              tabBarIcon: ({focused} : {focused:any}) => (
                  <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                      <Image source={require('../../assets/icons/overview.png')}
                      resizeMode='contain'
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: focused ? '#e32f45' : '#748c94'
                      }}
                      />
                      <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Overview</Text>
                  </View>
              ),
          }}
          />
          <Tab.Screen name='Data' 
          component={Statistics} 
          options={{
            tabBarIcon: ({focused} : {focused:any}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image source={require('../../assets/icons/statistics.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                    />
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Statistics</Text>
                </View>
            ),
        }}
          />
        <Tab.Screen name='Transaction Log' 
          component={TransactionLog} 
          options={{
            tabBarIcon: ({focused} : {focused:any}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image source={require('../../assets/icons/transactionlog.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                    />
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Transactions</Text>
                </View>
            ),
        }}
          />
          <Tab.Screen name='Settings' 
          component={Settings} 
          options={{
            tabBarIcon: ({focused} : {focused:any}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image source={require('../../assets/icons/settings.png')}
                    resizeMode='contain'
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                    />
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Settings</Text>
                </View>
            ),
        }}
          />
        </Tab.Navigator>
    )
}

export default Tabs;
