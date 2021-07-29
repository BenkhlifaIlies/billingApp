import React, { useContext } from "react";
import { Button } from "react-native";
import { useProductContext } from "../providers/ProductContext";

const ItemsList = () => {
  const [productList, setProductList] = useProductContext();
  return (
    <>
      <Button
        onPress={() => {
          console.log(productList);
        }}
        title='Log Data'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
      />
    </>
  );
};

export default ItemsList;
