/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Avatar } from 'react-native-paper'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import BalanceScreen from '../screens/BalanceScreen'
import FarmScreen from '../screens/FarmScreen'
import { BottomTabParamList, BalanceParamList, FarmParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Balance"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Balance"
        component={BalanceNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Avatar.Icon color="white" size={36} icon="wallet" />
          )
        }}
      />
      <BottomTab.Screen
        name="Farm"
        component={FarmNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Avatar.Icon color="white" size={36} icon="barn" />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const BalanceStack = createStackNavigator<BalanceParamList>()

function BalanceNavigator() {
  return (
    <BalanceStack.Navigator>
      <BalanceStack.Screen
        name="BalanceScreen"
        component={BalanceScreen}
        options={{ headerTitle: 'Overall Balance' }}
      />
    </BalanceStack.Navigator>
  )
}

const FarmStack = createStackNavigator<FarmParamList>()

function FarmNavigator() {
  return (
    <FarmStack.Navigator>
      <FarmStack.Screen
        name="FarmScreen"
        component={FarmScreen}
        options={{ headerTitle: 'Farm' }}
      />
    </FarmStack.Navigator>
  )
}
