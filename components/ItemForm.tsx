import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { appleBlue, lightGrey } from "../constants/DesignColors";
import { useProductContext } from "../providers/ProductContext";
import { Product } from "../constants/Product";
import { useBillContext } from "../providers/BillContext";

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
  const [tax, setTax] = useBillContext();
  
  console.log(tax);
  const [selectedState, setSelectedState] = useState(0.05);

  const [product, setProduct] = useState<Product>({
    productLabel: "",
    productPrice: 0,
    quantity: 0,
  });
  return (
    <SafeAreaView style={styles.Screenontainer}>
      <Formik
        initialValues={{ productLabel: "", productPrice: "", quantity: "" }}
        onSubmit={(values, actions) => {
          const newArray = productList;
          newArray.unshift(product);
          setProductList([...newArray]);
          actions.resetForm();
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 200);
        }}
        validationSchema={validationSchema}>
        {(formikProps) => (
          <React.Fragment>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Add Product</Text>
              <Picker
                style={{
                  backgroundColor: String(appleBlue),
                  width: 250,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: String(appleBlue),
                  margin: 0,
                  padding: 0,
                }}
                selectedValue={selectedState}
                onValueChange={(itemValue, itemIndex) =>{
                  setTax(itemValue)
                  setSelectedState(itemValue);
                  console.log(itemValue);
                }}>
                <Picker.Item label='State Selected: AK - 5.0%' value="0.05" />
                <Picker.Item label='State Selected: AL - 6.0%' value='0.06' />
                <Picker.Item label='State Selected: AR - 3.0%' value='0.03' />
                <Picker.Item label='State Selected: AS - 5.7%' value='0.057' />
                <Picker.Item label='State Selected: AZ - 10.0%' value='0.1' />
              </Picker>
            </View>
            <TextInput
              style={styles.TextInput}
              placeholder='Enter Product Label'
              value={formikProps.values.productLabel}
              onChangeText={formikProps.handleChange("productLabel")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.productLabel &&
                formikProps.errors.productLabel}
            </Text>
            <View
              style={[styles.container, { justifyContent: "space-between" }]}>
              <View
                style={[styles.container, { justifyContent: "flex-start" }]}>
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
                    value={formikProps.values.productPrice.toString()}
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
                    value={formikProps.values.quantity.toString()}
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
                        setProduct({
                          productLabel: formikProps.values.productLabel,
                          productPrice: parseInt(
                            formikProps.values.productPrice,
                          ),
                          quantity: parseInt(formikProps.values.quantity),
                        });
                        // formikProps.resetForm();
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
                {formikProps.touched.productPrice &&
                  formikProps.errors.productPrice}
              </Text>
              <Text style={styles.errorMsg}>
                {formikProps.touched.quantity && formikProps.errors.quantity}
              </Text>
            </View>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    // display: "flex",
    // flexDirection: "column-reverse",
    // justifyContent: "flex-end",
    // alignItems: "center",
    // maxHeight: 200,
    backgroundColor: "blue",
    flex: 1,
  },
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
  container: {
    display: "flex",
    flexDirection: "row",
  },
  Screenontainer: {
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 0,
  },
});

export default ItemForm;
