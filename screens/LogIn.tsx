import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { appleBlue, darkGrey, lightGrey } from "../constants/DesignColors";
import { useAuthContext } from "../providers/AuthContext";
// import { useNavigation } from "@react-navigation/native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .label("Username")
    .min(8, "Username must be at least 8 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  password: yup
    .string()
    .required()
    .label("Password")
    .min(8, "Password must be at least 7 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});

const Input = ({ label, type, ...props }: any) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          autoCompleteTypeautoCompleteType={type}
          autoCapitalize='none'
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
};

const LogIn = ({ ...props }: any) => {
  const [token, setToken] = useAuthContext();

  const [username, setUsername] = useState<String>("Ilies Benkhelifa");
  const [password, setPassword] = useState<String>("password");
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    if (loggedIn) {
      (async function () {
        try {
          await SecureStore.setItemAsync("Authorization", "dummy token");
          setToken("dummy data");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [loggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Formik
        initialValues={{ username, password }}
        onSubmit={async (values, actions) => {
          setLoggedIn(true);
        }}
        validationSchema={validationSchema}>
        {(formikProps) => (
          <React.Fragment>
            <Input
              type='username'
              label='Username'
              defaultValue={"Ilies Benkhelifa"}
              onChangeText={formikProps.handleChange("username")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text>
            <Input
              secureTextEntry={true}
              label='Password'
              defaultValue={"password"}
              onChangeText={formikProps.handleChange("password")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            <TouchableOpacity
              {...formikProps}
              onPress={() => {
                formikProps.handleSubmit();
                // navigation.replace("Root", { screen: "Billing" });
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  headerText: {
    color: "#353031",
    fontWeight: "bold",
    fontSize: 34,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: String(lightGrey),
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 10,
    color: String(darkGrey),
    fontWeight: "bold",
  },
  input: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
  button: {
    backgroundColor: String(appleBlue),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
  },
});

export default LogIn;
