import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { appleBlue, lightGrey } from "../constants/DesignColors";
import { useProductContext } from "../providers/ProductContext";

export default function ItemsScreen({ navigation }: any) {
  const [productList] = useProductContext();
  //dont havve id so gotta work a round
  let key = 0;

  return (
    <View style={styles.container}>
      {productList.length < 1 ? (
        <Text style={styles.centred}>No items added yet !!</Text>
      ) : (
        <FlatList
          numColumns={1}
          keyExtractor={(item: any, index: number) => String(index)}
          data={productList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              // key={key++}
              onPress={() => {
                navigation.navigate("DetailScreen", { item });
              }}>
              <Text style={styles.title}>{item.productLabel}</Text>
              <Text style={styles.title}>${item.productPrice}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
  },
  item: {
    flex: 1,
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
    flex: 1,
    color: String(appleBlue),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
