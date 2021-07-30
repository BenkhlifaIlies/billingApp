import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { lightGrey } from "../constants/DesignColors";
import { useProductContext } from "../providers/ProductContext";
const initialEmptyPlaceHolderLength = 9;

const ItemsList = () => {
  const [productList] = useProductContext();
  const [initialEmptyPlaceHolder] = useState(
    new Array(initialEmptyPlaceHolderLength),
  );

  const renderListItems = () => {
    let i = 1;
    const t = Array.apply(
      null,
      initialEmptyPlaceHolder.slice(productList.length),
    ).map(function () {
      return (
        <DataTable.Row style={styles.tableRow} key={i++}>
          <></>
        </DataTable.Row>
      );
    });
    const result = productList.map((product) => {
      return (
        <DataTable.Row style={styles.tableRow} key={i++}>
          <DataTable.Cell>
            {product.productLabel.trim().charAt(0).toUpperCase() +
              product.productLabel.trim().slice(1)}
          </DataTable.Cell>
          <DataTable.Cell numeric>{product.quantity}</DataTable.Cell>
          <DataTable.Cell numeric>{"$" + product.productPrice}</DataTable.Cell>
          <DataTable.Cell numeric>
            {"$" + product.quantity * product.productPrice}
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
    return result.concat(t);
  };

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Nos.</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
          <DataTable.Title numeric>Total Price</DataTable.Title>
        </DataTable.Header>
        <ScrollView style={styles.container}>{renderListItems()}</ScrollView>
      </DataTable>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  tableRow: {
    borderColor: "white",
    borderBottomColor: String(lightGrey),
    borderWidth: 2,
  },
});

export default ItemsList;
