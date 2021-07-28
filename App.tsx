import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import LoginIn from "./screens/LogIn";
import * as SecureStore from "expo-secure-store";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";

// const AuthStack = createStackNavigator();
// const AuthStackScreen = () => (
//   <AuthStack.Navigator headerMode='none'>
//     <AuthStack.Screen name='LoginIn' component={LoginIn} />
//   </AuthStack.Navigator>
// );
export default function App() {
  const [token, setToken] = useState(null);

  const checkToken = async () => {
    await SecureStore.getItemAsync("Authorization")
      .then((value: any) => {
        setToken(value);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <NavigationContainer
      //   linking={LinkingConfiguration}
      //   theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      //   {token ? (
          // <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            // <StatusBar />
          // </SafeAreaProvider>
      //   ) : (
      //     <LoginIn />
      //   )}
      // </NavigationContainer>
    );
  }
}
