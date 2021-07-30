import { Formik } from "formik";
import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import BillCalculator from "../components/BillCalculator";
import ItemForm from "../components/ItemForm";
import ItemsList from "../components/ItemsList";

export default function BillingScreen() {
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
