import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import {BillCalculator} from "../components/BillCalculator";
import ItemForm from "../components/ItemForm";
import {ItemsList} from "../components/ItemsList";

const  BillingScreen=() =>{
  return (
    <SafeAreaView style={styles.container}>
      <ItemForm />
      <ItemsList />
      <BillCalculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
  },
});

export default BillingScreen
