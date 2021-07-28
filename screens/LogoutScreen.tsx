import * as React from "react";
import { Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import LoginIn from "./LogIn";
import { useNavigation } from "@react-navigation/native";

export default function TabThreeScreen({ ...props }) {
  const navigation = useNavigation();
  const logoutAction = async () => {
    await SecureStore.deleteItemAsync("Authorization");
    console.log("loged out");
    navigation.navigate("Login");
    // props.navigation.navigate('Login',{});
  };
  useEffect(() => {
    const logoutAction = async () => {
      await SecureStore.deleteItemAsync("Authorization");
      console.log("loged out");
    };
    logoutAction()
    navigation.reset({
      index: 0,
      routes: [{name: 'LogIn'}],
    });
    // navigation.navigate("LogIn");
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGGIN OUT...</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      {/* <EditScreenInfo path="/screens/TabThreeScreen.tsx" /> */}
      {/* <Button
        onPress={logoutAction}
        title='Logout'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
