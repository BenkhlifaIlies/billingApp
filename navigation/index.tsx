import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

import BottomTabNavigator from "./BottomTabNavigator";
import LogIn from "../screens/LogIn";
import NotFoundScreen from "../screens/NotFoundScreen";

import { RootStackParamList } from "../types";
import { ProductProvider } from "../providers/ProductContext";
import { BillProvider } from "../providers/BillContext";
import { NavigationContainer } from "@react-navigation/native";

export default function Navigation({ navigation }: any) {
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const checkToken = async () => {
      const getToken = await SecureStore.getItemAsync("Authorization");
      setToken(getToken);
    };
    checkToken();
  }, []);

  return (
   <NavigationContainer>
      {token !== null ? (
        <ProductProvider>
          <BillProvider>
            <RootNavigator />
          </BillProvider>
        </ProductProvider>
      ) : (
        <AuthStackScreen />
        // <LogIn />
      )}
     </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={BottomTabNavigator} />
      <Stack.Screen name='LogIn' component={LogIn} />
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
    <AuthStack.Screen name="LogIn" component={LogIn} />
    <Stack.Screen name='Root' component={BottomTabNavigator} />
  </AuthStack.Navigator>
);