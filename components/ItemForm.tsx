import * as React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { appleBlue, lightGrey } from "../constants/DesignColors";
import { useProductContext } from "../providers/ProductContext";
import { Product } from "../constants/Product";
const validationSchema = yup.object().shape({
  productLabel: yup
    .string()
    .required()
    .label("Product")
    .min(4, "type the full product's name, please"),
  productPrice: yup
    .number()
    .required()
    .label("Price")
    .test(
      "Is positive?",
      "The Price must be greater than 0",
      (value: any) => value > 0,
    )
    .typeError("The Price must be a positive number"),
  quantity: yup
    .string()
    .required()
    .label("Quantity")
    .test(
      "Is positive?",
      "Quantity must be greater than or equal to  1 and inferieur to 8",
      (value: any) => value >= 1 && value < 8,
    ),
});

const ItemForm = () => {
  const [productList, setProductList] = useProductContext();
  const [product, setProduct] = useState<Product>({
    productLabel: "",
    productPrice: 0,
    quantity: 0,
  });
  return (
    <SafeAreaView style={{ backgroundColor: "white", padding: 10 }}>
      <Formik
        initialValues={{ productLabel: "", productPrice: 0, quantity: 0 }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(product));
          productList.push(product)
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={validationSchema}>
        {(formikProps) => (
          <React.Fragment>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Add Product</Text>
              <Text
                onPress={() => console.log("add Product pressed")}
                style={styles.clickableText}>
                State Selected :
              </Text>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder='Enter Product Label'
              onChangeText={formikProps.handleChange("productLabel")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.productLabel &&
                formikProps.errors.productLabel}
            </Text>
            <View
              style={{
                // padding: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View
                style={{
                  // padding: 4,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}>
                <View style={[styles.formHeader, { padding: 0 }]}>
                  <TextInput
                    keyboardType='numeric'
                    style={[
                      styles.TextInput,
                      styles.smallTextInput,
                      ,
                      { width: 130 },
                    ]}
                    placeholder='Enter Price'
                    onChangeText={formikProps.handleChange("productPrice")}
                  />
                  <TextInput
                    keyboardType='numeric'
                    style={[
                      styles.TextInput,
                      styles.smallTextInput,
                      { width: 140 },
                    ]}
                    placeholder='Enter Quantity'
                    onChangeText={formikProps.handleChange("quantity")}
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                {formikProps.isSubmitting ? (
                  <ActivityIndicator color={appleBlue} />
                ) : (
                  <>
                    <Text
                      onPress={() => {
                        setProduct(formikProps.values);
                        formikProps.handleSubmit();
                      }}
                      style={styles.clickableText}>
                      Add to list
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View
              style={
                !!!formikProps.errors
                  ? { display: "none" }
                  : { display: "flex" }
              }>
              <Text style={styles.errorMsg}>
                {(formikProps.touched.productPrice &&
                  formikProps.errors.productPrice) ||
                  (formikProps.touched.quantity && formikProps.errors.quantity)}
              </Text>
            </View>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formHeader: {
    padding: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  clickableText: {
    fontSize: 15,
    fontWeight: "bold",
    color: String(appleBlue),
    alignItems: "center",
    marginRight: 10,
  },
  TextInput: {
    margin: 2,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: String(lightGrey),
    borderRadius: 4,
    padding: 8,
    marginBottom: 3,
    fontSize: 16,
  },
  smallTextInput: {
    width: 120,
    marginRight: 10,
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
  },
});
export default ItemForm;
