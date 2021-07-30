import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

import BottomTabNavigator from "./BottomTabNavigator";
import LogIn from "../screens/LogIn";
import NotFoundScreen from "../screens/NotFoundScreen";

import { RootStackParamList } from "../types";
import { ProductProvider } from "../providers/ProductContext";
import { BillProvider } from "../providers/BillContext";

import {useAuthContext } from "../providers/AuthContext";

export default function Navigation({ colorScheme }: any) {
  const [token, setToken] = useAuthContext();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const getToken = await SecureStore.getItemAsync("Authorization");
        setToken(getToken);
      } catch (error) {
        console.log(error);
      }
    };
    const ac = new AbortController();
    checkToken();
    return () => ac.abort();
  }, [token]);

  return (
    <>
      {token !== null ? (
        <ProductProvider>
          <BillProvider>
          <RootNavigator />
          </BillProvider>
        </ProductProvider>
      ) : (
        <AuthStackScreen />
      )}
    </>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={BottomTabNavigator} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name='LogIn' component={LogIn} />
  </AuthStack.Navigator>
);
