import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Keyboard } from "react-native";
import { View } from "./Themed";

import { useBillContext } from "../providers/BillContext";
import { useProductContext } from "../providers/ProductContext";

import { DISCOUNT } from "../constants/Calculattions";
import { Product } from "../constants/Product";

const calculateTotalPriceWithoutTax = (productList: Product[]) => {
  return productList.reduce((total: number, item: Product) => {
    return total + item.productPrice * item.quantity;
  }, 0);
};

const calculateDiscount = (
  DISCOUNT: number,
  totalPriceWithoutTax: number,
): number => {
  return DISCOUNT * totalPriceWithoutTax;
};

const calculateTax = (tax: number, totalPriceWithoutTax: number): number => {
  return tax * totalPriceWithoutTax;
};
const calculatetotalPriceWithTax = (
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const totalPriceWithoutTax = calculateTotalPriceWithoutTax(productList);
  const calculatetotalPriceWithTaxText = `Total price: $${calculatetotalPriceWithTax(
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
          display: !isKeyboardVisible ? "flex" : "none",
        },
      ]}>
      <Text style={styles.billDetail}>
        Total price without tax: ${totalPriceWithoutTax}
      </Text>
      <Text style={styles.billDetail}>{discountText}</Text>
      <Text style={styles.billDetail}>{taxText}</Text>
      <Text style={[styles.billDetail, styles.totalPrice]}>
        {calculatetotalPriceWithTaxText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    // flex:1,
    // width:"100%",
    // position: "absolute",
    bottom: 0,
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
export {
  BillCalculator,
  calculateTotalPriceWithoutTax,
  calculateDiscount,
  calculateTax,
  calculatetotalPriceWithTax,
};
