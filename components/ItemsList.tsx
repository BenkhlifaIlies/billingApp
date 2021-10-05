import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { lightGrey } from "../constants/DesignColors";
import { Product } from "../constants/Product";
import { useProductContext } from "../providers/ProductContext";

const initialEmptyPlaceHolderLength = 7;

const calculateTotalPrice = (
  quantity: number,
  productPrice: number,
): number => {
  return quantity * productPrice;
};

const ItemsList = () => {
  const [productList] = useProductContext();

  const [initialEmptyPlaceHolder] = useState(
    new Array(initialEmptyPlaceHolderLength),
  );

  const renderListItems = (productList: Product[]) => {
    //since the list doesn't have an id attributte
    let key = 1;
    //mimic the initial placeholders
    const placeholder = Array.apply(
      null,
      initialEmptyPlaceHolder.slice(productList.length),
    ).map(function () {
      return (
        <DataTable.Row style={styles.tableRow} key={key++}>
          <></>
        </DataTable.Row>
      );
    });
   //rendering actual items
    const items = productList.map((product) => {
      return (
        <DataTable.Row style={styles.tableRow} key={key++}>
          <DataTable.Cell>
            {product.productLabel.trim().charAt(0).toUpperCase() +
              product.productLabel.trim().slice(1)}
          </DataTable.Cell>
          <DataTable.Cell numeric>{product.quantity}</DataTable.Cell>
          <DataTable.Cell numeric>{"$" + product.productPrice}</DataTable.Cell>
          <DataTable.Cell numeric>
            {"$" + calculateTotalPrice(product.quantity, product.productPrice)}
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
    // render actual items + remaining place holders
    return items.concat(placeholder);
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
        <ScrollView style={styles.container}>
          {renderListItems(productList)}
        </ScrollView>
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

export { calculateTotalPrice, ItemsList };
