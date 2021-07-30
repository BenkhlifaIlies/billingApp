import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { appleBlue, lightGrey } from "../constants/DesignColors";
const DetailsScreen = ({ route }: any) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.centred}>{item.productLabel} </Text>
      <Text style={styles.centred}>{item.productPrice} </Text>
      <Text style={styles.centred}>{item.quantity} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop:10
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderColor: String(lightGrey),
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centred: {
    // flex: 1,
    color: String(appleBlue),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DetailsScreen;
