import React, { useState } from "react";
import { Text, StyleSheet, Keyboard } from "react-native";
import { View } from "./Themed";

import { useBillContext } from "../providers/BillContext";
import { useProductContext } from "../providers/ProductContext";

import { DISCOUNT } from "../constants/Calculattions";
import { Product } from "../constants/Product";
const calculateDiscount = (
  DISCOUNT: number,
  totalPriceWithoutTax: number,
): number => {
  return DISCOUNT * totalPriceWithoutTax;
};

const calculateTax = (tax: number, totalPriceWithoutTax: number): number => {
  return tax * totalPriceWithoutTax;
};
const TotalPriceWithTax = (
  totalPriceWithoutTax: number,
  tax: number,
  DISCOUNT: number,
): number => {
  return (
    totalPriceWithoutTax +
    tax * totalPriceWithoutTax -
    DISCOUNT * totalPriceWithoutTax
  );
};
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

  const totalPriceWithTaxText = `Total price: $${TotalPriceWithTax(
    totalPriceWithoutTax,
    tax,
    DISCOUNT,
  ).toFixed(2)}`;
  const taxText = `Tax ${(tax * 100).toFixed(1)}%: $${calculateTax(
    tax,
    totalPriceWithoutTax,
  ).toFixed(2)}`;
  const discountText = `Discount ${(DISCOUNT * 100).toFixed(
    1,
  )}%: $${calculateDiscount(DISCOUNT, totalPriceWithoutTax).toFixed(2)}`;
  return (
    <View
      style={[
        styles.footerContainer,
        {
          display: footerVisibility ? "flex" : "none",
        },
      ]}>
      <Text style={styles.billDetail}>
        Total price without tax: ${totalPriceWithoutTax}
      </Text>
      <Text style={styles.billDetail}>
        Discount ${(DISCOUNT * 100).toFixed(1)}%: ${" "}
        {calculateDiscount(DISCOUNT, totalPriceWithoutTax).toFixed(2)}
      </Text>
      <Text style={styles.billDetail}>{taxText}</Text>
      <Text style={[styles.billDetail, styles.totalPrice]}>
        {totalPriceWithTaxText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
    backgroundColor: "white",
  },
  billDetail: {
    fontSize: 16,
    marginVertical: 10,
  },
  totalPrice: {
    fontWeight: "bold",
  },
});
export { BillCalculator, TotalPriceWithTax, calculateTax, calculateDiscount };
