import "react-native-gesture-handler";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import Navigation from "./navigation";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import useColorScheme from "./hooks/useColorScheme";
import { AuthProvider } from "./providers/AuthContext";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Navigation colorScheme={colorScheme} />
      </AuthProvider>
    </NavigationContainer>
  );
}
