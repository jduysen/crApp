import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useTheme } from "@react-navigation/native";
const icon = require("../../assets/icons8-poop-60.png");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ThemeProvider = useTheme();
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = async () => {
    const ThemeProvider = useTheme();
    console.log("Hellor");

    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.code);
        setLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.logo}>
        {/* <Image source={icon}/> */}
        <FontAwesome5 name="poop" size={80} color={ThemeProvider.colors.text} />
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.title, { color: ThemeProvider.colors.border }]}>
            cr
          </Text>
          <Text style={[styles.title, { color: ThemeProvider.colors.primary }]}>
            App
          </Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color={ThemeProvider.colors.primary} />
      ) : (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={ThemeProvider.colors.text}
            cursorColor={ThemeProvider.colors.text}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={ThemeProvider.colors.text}
            cursorColor={ThemeProvider.colors.text}
            autoCapitalize="none"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.buttons}>
            <Button color={"#EF813E"} title="Log In" onPress={() => signIn()} />
            {/* <Button color={"#5E6826"} title="SignUp" onPress={() => signUp()} /> */}
            <Button
              color={"#5E6826"}
              title="Sign Up"
              onPress={() => signUp()}
            />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 15,
  },
  logo: {
    // flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: "20%",
    // marginBottom: 100,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  form: {
    // flex:1,
    width: "100%",
    alignItems: "center",
  },
  input: {
    // backgroundColor:"white",
    marginVertical: 4,
    width: "80%",
    height: 45,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});
