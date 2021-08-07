import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import LogIn from "../screens/LogIn";
import NotFoundScreen from "../screens/NotFoundScreen";

import { AuthStackParamList, RootStackParamList } from "../types";
import { ProductProvider } from "../providers/ProductContext";
import { BillProvider } from "../providers/BillContext";

import { useAuthContext } from "../providers/AuthContext";

export default function Navigation({ colorScheme }: any) {
  const [token] = useAuthContext();
  return (
    <>
      {token === null ? (
        <AuthStackScreen />
      ) : (
        <ProductProvider>
          <BillProvider>
            <RootNavigator />
          </BillProvider>
        </ProductProvider>
      )}
    </>
  );
}

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
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
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name='Login' component={LogIn} />
  </AuthStack.Navigator>
);
