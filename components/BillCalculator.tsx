import React, { useState } from "react";
import { Text, StyleSheet, Keyboard } from "react-native";
import { DISCOUNT } from "../constants/Calculattions";
import { Product } from "../constants/Product";
import { useBillContext } from "../providers/BillContext";
import { useProductContext } from "../providers/ProductContext";
import { View } from "./Themed";
const BillCalculator = () => {
  const [productList] = useProductContext();
  const [tax] = useBillContext();

  const [footerVisibility, setFooterVisibility] = useState(true);

  Keyboard.addListener("keyboardDidShow", () => {
    setFooterVisibility(false);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setFooterVisibility(true);
  });

  const totalPriceWithoutTax = productList.reduce(
    (total: number, item: Product) => {
      return total + item.productPrice * item.quantity;
    },
    0,
  );
  const discountText = `${(DISCOUNT * 100).toFixed(1)}%: $${(
    DISCOUNT * totalPriceWithoutTax
  ).toFixed(2)}`;
  const taxText = `${(tax * 100).toFixed(1)} %: $${(
    tax * totalPriceWithoutTax
  ).toFixed(2)}`;
  const TotalPriceWithTax = (
    totalPriceWithoutTax +
    tax * totalPriceWithoutTax -
    DISCOUNT * totalPriceWithoutTax
  ).toFixed(2);

  return (
    <View
      style={[
        styles.footerContainer,
        {
          display: footerVisibility ? "flex" : "none",
        },
      ]}>
      <Text style={styles.billDeyail}>
        Total price without tax: ${totalPriceWithoutTax}
      </Text>
      <Text style={styles.billDeyail}>Discount {discountText}</Text>
      <Text style={styles.billDeyail}>Tax {taxText}</Text>
      <Text style={styles.billDeyail}>Total price: ${TotalPriceWithTax}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
    backgroundColor: "white",
  },
  billDeyail: {
    fontSize: 16,
    marginVertical: 10,
    // fontWeight:"bold"
  },
});
export default BillCalculator;
