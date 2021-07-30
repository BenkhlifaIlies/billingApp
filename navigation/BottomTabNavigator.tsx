/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BillingScreen from "../screens/BillingScreen";
import ItemsScreen from "../screens/ItemsScreen";
import LogoutScreen from "../screens/LogoutScreen";
import DetailScreen from "../screens/DetailScreen";

import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from "../types";
import { stackHeader } from "../constants/DesignColors";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Billing'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name='Billing'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='md-cash-outline' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Details'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='md-file-tray-full-outline' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Logout'
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='log-out-outline' color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3,paddingVertical:10 }} {...props} />;
}
const TabOneStack = createStackNavigator<TabOneParamList>();
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='BillingScreen'
        component={BillingScreen}
        options={{
          headerTitle: "Billing",
          headerTitleStyle: { textAlign: "center", color: "black" },
          headerStyle: {
            backgroundColor: String(stackHeader),
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='ItemsScreen'
        component={ItemsScreen}
        options={{
          headerTitle: "Items",
          headerTitleStyle: { textAlign: "center", color: "black" },
          headerStyle: {
            backgroundColor: String(stackHeader),
          },
        }}
      />
       <TabTwoStack.Screen
        name='DetailScreen'
        component={DetailScreen}
        options={{
          headerTitle: "Details",
          headerTitleStyle: {color: "black" },
          headerStyle: {
            backgroundColor: String(stackHeader),
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name='LogoutScreen'
        component={LogoutScreen}
        options={{
          headerTitle: "Log Out",
          headerTitleStyle: { textAlign: "center", color: "black" },
          headerStyle: {
            backgroundColor: String(stackHeader),
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}
