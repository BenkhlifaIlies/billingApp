import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await SecureStore.getItemAsync("Authorization");

        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete
}
