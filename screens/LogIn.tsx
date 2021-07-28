import * as React from "react";
// import { useState } from "react";
import { Button, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import * as SecureStore from "expo-secure-store";
// import Navigation from "../navigation";

const LogIn = ({navigation}:any) => {
//   const colorScheme = useColorScheme();

//   const [loggedIn, setLoggedIn] = useState(false);

  const loginAction = async () => {
    await SecureStore.setItemAsync("Authorization", "token");
    console.log("logged in ...");
    // setLoggedIn(true);
    navigation.replace ("Root", {screen: "TabOne"})
  };
  return (
    <React.Fragment>
      {
    //   loggedIn ? (
        // <DrawerNavigator />
        // <SafeAreaProvider>
        // <Navigation colorScheme={colorScheme} />
    //   ) : (
        //   <StatusBar />
        // </SafeAreaProvider>
        <View style={styles.container}>
          <Text style={styles.title}>LOGIN TO YOUR ACCOUNT NOW !!</Text>
          <View
            style={styles.separator}
            lightColor='#eee'
            darkColor='rgba(255,255,255,0.1)'
          />
          <Button
            onPress={loginAction}
            title='Login'
            color='#841584'
            accessibilityLabel='Learn more about this purple button'
          />
        </View>
    //   )
      }
    </React.Fragment>
  );
};

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

export default LogIn;
