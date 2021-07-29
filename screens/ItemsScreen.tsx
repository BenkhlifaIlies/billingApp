import * as React from "react";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useProductContext } from "../providers/ProductContext";

export default function TabTwoScreen() {
  const [productList, setProductList] = useProductContext();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          console.log("from screen 2",productList);
        }}
        title='log data'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      />
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
