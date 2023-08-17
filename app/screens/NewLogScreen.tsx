import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikHelpers } from "formik/dist/types";
import StarRating from "react-native-star-rating-widget";
import { ThemeProvider, useTheme } from "@react-navigation/native";

const LogSchema = yup.object().shape({
  title: yup
    .string()
    .max(255, "Title can only be 255 characters.")
    .required("Title is required."),
  description: yup
    .string()
    .max(500, "Description can only be 500 characters."),
  rating: yup.number().min(1).max(5),
});

export default function NewLogScreen({navigation}:any) {
  const ThemeProvider = useTheme();

  const [initialTitle, setInitialTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let today = new Date();
    let hour = today.getHours();
    if (hour < 3) {
      setInitialTitle("Midnight Dump");
    } else if (hour < 7) {
      setInitialTitle("Early Morning Dump");
    } else if (hour < 11) {
      setInitialTitle("Morning Dump");
    } else if (hour < 14) {
      setInitialTitle("Lunchtime Dump");
    } else if (hour < 17) {
      setInitialTitle("Afternoon Dump");
    } else if (hour < 19) {
      setInitialTitle("Dinnertime Dump");
    } else {
      setInitialTitle("Night Dump");
    }
    setLoading(false);
  }, []);
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyboardDismissMode="interactive"
        >
          <Formik
            initialValues={{
              title: initialTitle,
              description: "",
              rating: 1,
            }}
            validationSchema={LogSchema}
            onSubmit={(values, {resetForm}) => (console.log(values), resetForm(), navigation.navigate('Roll'))}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              setTouched,
              isValid,
            }) => (
              <View style={styles.form}>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="Log Title"
                    placeholderTextColor={ThemeProvider.colors.border}
                    clearButtonMode="always"
                    autoFocus
                    style={styles.input}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  <Text style={styles.error}>
                    {errors.title ? errors.title : ""}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="How did it go?  Share more about your dump."
                    clearButtonMode="always"
                    placeholderTextColor={ThemeProvider.colors.border}
                    style={[styles.input, { height: "auto", maxHeight: 100 }]}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    multiline
                    maxLength={500}
                    // numberOfLines={5}
                    value={values.description}
                  />
                  <Text style={styles.error}>
                    {errors.description ? errors.description : ""}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <StarRating
                    maxStars={5}
                    enableHalfStar={false}
                    rating={values.rating}
                    color={ThemeProvider.colors.border}
                    onChange={(ev) => setFieldValue("rating", ev)}
                  />
                  <Text style={{ color: ThemeProvider.colors.border }}>
                    Dump Rating
                  </Text>
                </View>

                <Button
                  disabled={!isValid}
                  color={ThemeProvider.colors.primary}
                  onPress={() => handleSubmit()}
                  title="Submit"
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  form: {
    // marginTop:200,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  input: {
    // backgroundColor:"white",
    marginVertical: 4,
    width: "100%",
    height: 45,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  error: { margin: 5, color: "red" },
});
