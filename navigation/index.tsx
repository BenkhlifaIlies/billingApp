/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import * as SecureStore from "expo-secure-store";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { useEffect, useState } from "react";
import TabOneScreen from "../screens/BillingScreen";
import TabTwoScreen from "../screens/ItemsScreen";
import LogIn from "../screens/LogIn";

// const AuthStack = createStackNavigator();
// const AuthStackScreen = () => (
//   <AuthStack.Navigator headerMode='none'>
//     <AuthStack.Screen name='LoginIn' component={LoginIn} />
//   </AuthStack.Navigator>
// );

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [token, setToken] = useState<null | string>(null);

  const checkToken = async () => {
    const getToken = await SecureStore.getItemAsync("Authorization");

    // .then((value: any) => {
    setToken(getToken);
    // })
    // .catch((err: Error) => {
    //   console.log(err);
    // });
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    // <React.Fragment>
    //   <NavigationContainer
    //     linking={LinkingConfiguration}
    //     theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    //     {token ? <RootNavigator /> : <LoginIn />}
    // <Layout />
    //   </NavigationContainer>
    // </React.Fragment>
    <NavigationContainer>
      {token ? (
      <>
        <RootNavigator />
      </>
      ) : (
      <>
      <LogIn/>
        {/* <Stack.Screen name='LogIn' component={LogIn} /> */}
      </>
      )}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
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

