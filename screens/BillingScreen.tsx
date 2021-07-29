import { Formik } from "formik";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ItemForm from "../components/ItemForm";
import ItemsList from "../components/ItemsList";
import { View } from "../components/Themed";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ItemForm />
      <ItemsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
