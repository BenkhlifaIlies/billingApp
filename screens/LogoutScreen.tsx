import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "../components/Themed";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { appleBlue } from "../constants/DesignColors";

export default function TabThreeScreen({ ...props }) {
  const navigation = useNavigation();
  useEffect(() => {
    const logoutAction = async () => {
      await SecureStore.deleteItemAsync("Authorization");
      console.log("loged out");
    };
    logoutAction();
    setTimeout(async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View>
          <ActivityIndicator size='large' color={appleBlue} />
          <Text style={styles.title}>LOGGIN OUT...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 40,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 1,
  },
});
