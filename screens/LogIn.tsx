// const LogIn = ({ navigation }: any) => {
//   //   const colorScheme = useColorScheme();

//   //   const [loggedIn, setLoggedIn] = useState(false);

//   const loginAction = async () => {
//     await SecureStore.setItemAsync("Authorization", "token");
//     console.log("logged in ...");
//     // setLoggedIn(true);
//     navigation.replace("Root", { screen: "TabOne" });
//   };
//   // return (
//   //   <React.Fragment>
//   //     {
//   //   //   loggedIn ? (
//   //       // <DrawerNavigator />
//   //       // <SafeAreaProvider>
//   //       // <Navigation colorScheme={colorScheme} />
//   //   //   ) : (
//   //       //   <StatusBar />
//   //       // </SafeAreaProvider>
//   //       <View style={styles.container}>
//   //         <Text style={styles.title}>LOGIN TO YOUR ACCOUNT NOW !!</Text>
//   //         <View
//   //           style={styles.separator}
//   //           lightColor='#eee'
//   //           darkColor='rgba(255,255,255,0.1)'
//   //         />
//   //         <Button
//   //           onPress={loginAction}
//   //           title='Login'
//   //           color='#841584'
//   //           accessibilityLabel='Learn more about this purple button'
//   //         />
//   //       </View>
//   //   //   )
//   //     }
//   //   </React.Fragment>
//   // );
//   return (
//     <SafeAreaView style={styles.wrapper}>
//       <View style={styles.container}>
//         <Formik
//           initialValues={{ productLabel: "", productPrice: 0, quantity: 0 }}
//           onSubmit={(values, actions) => {
//             setTimeout(() => {
//               actions.setSubmitting(false);
//             }, 500);
//           }}
//           validationSchema={validationSchema}>
//           {(formikProps) => (
//             <React.Fragment>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder='Enter Product Label'
//                 onChangeText={formikProps.handleChange("productLabel")}
//               />
//               <Text style={styles.errorMsg}>
//                 {formikProps.touched.productLabel &&
//                   formikProps.errors.productLabel}
//               </Text>
//               <View
//                 style={
//                   !!!formikProps.errors
//                     ? { display: "none" }
//                     : { display: "flex" }
//                 }>
//                 <Text style={styles.errorMsg}>
//                   {(formikProps.touched.productPrice &&
//                     formikProps.errors.productPrice) ||
//                     (formikProps.touched.quantity &&
//                       formikProps.errors.quantity)}
//                 </Text>
//               </View>
//             </React.Fragment>
//           )}
//         </Formik>
//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { appleBlue, darkGrey, lightGrey } from "../constants/DesignColors";

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

const LogIn = ({ navigation }: any) => {
  const [username, setUsername] = useState<String>("Ilies Benkhelifa");
  const [password, setPassword] = useState<String>("password");
  // const [loggedIn, setloggedIn] = useState<Boolean>(false);

  const loginAction = async () => {
    await SecureStore.setItemAsync("Authorization", "token");
    console.log("token saved");
    navigation.replace("Root", { screen: "Billing" });
  };

  // useEffect(() => {
  //   const setLoginToken = async () => {
  //     await SecureStore.setItemAsync("Authorization", "token");
  //     console.log("token saved");
  //     navigation.replace("Root");
  //   };
  //   setLoginToken();
  // }, [loggedIn]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Formik
        initialValues={{ username, password }}
        onSubmit={async (values, actions) => {
          await loginAction()
          // setTimeout(() => {
          //   // setloggedIn(true);
          //   actions.setSubmitting(false);
          // }, 500);
        }}
        validationSchema={validationSchema}>
        {(formikProps) => (
          <React.Fragment>
            <Input
              type='username'
              label='Username'
              defaultValue={username}
              onChangeText={formikProps.handleChange("username")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text>
            <Input
              secureTextEntry={true}
              label='Password'
              defaultValue={password}
              onChangeText={formikProps.handleChange("password")}
            />
            <Text style={styles.errorMsg}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setUsername(formikProps.values.username);
                setPassword(formikProps.values.password);
                formikProps.handleSubmit();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </Formik>
    </View>
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
