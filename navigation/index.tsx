/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import * as SecureStore from "expo-secure-store";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import { useEffect, useState } from "react";
import LogIn from "../screens/LogIn";
import { ProductProvider } from "../providers/ProductContext";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [token, setToken] = useState<null | string>(null);

  // const [productList, setProductList] = useState<Product[]>([]);
  // const prodctsContetxt = { productList, setProductList };

  useEffect(() => {
    const checkToken = async () => {
      const getToken = await SecureStore.getItemAsync("Authorization");
      setToken(getToken);
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? (
      <ProductProvider>
        <RootNavigator /> 
      </ProductProvider> 
      ): <LogIn />}
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
