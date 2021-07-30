import React from "react";
// import {
//   DarkTheme,
//   DefaultTheme,
//   NavigationContainer,
// } from "@react-navigation/native";
import "react-native-gesture-handler";

import Navigation from "./navigation";
// import LinkingConfiguration from "./navigation/LinkingConfiguration";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <NavigationContainer
      //   linking={LinkingConfiguration}
      //   theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Navigation colorScheme={colorScheme} />
      // </NavigationContainer>
    );
  }
}
