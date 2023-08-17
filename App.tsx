import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet} from "react-native";
import Login from "./app/screens/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Inside from "./app/screens/Inside";
import Loading from "./app/screens/Loading";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
      setLoading(false)
    })
  }, []);
  return (

      <NavigationContainer>
        <StatusBar style="dark" />
        <ThemeProvider
          value={{
            dark: false,
            colors: {
              primary: "#EF813E",
              background: "#E9DAC4",
              card: "#f3ece0",
              text: "#39221F",
              border: "#5E6826",
              notification: "#EF813E",
            },
          }}
        >
          <Stack.Navigator initialRouteName="Login">
            {user ? (
              <Stack.Screen
                name="Inside"
                component={Inside}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name={user===null&&!loading?"Login":"Loading"}
                component={user===null&&!loading?Login:Loading}
                // options={{ headerShown: false }}
                // name={user === undefined || user === null ? "Login" : "Loading"}
                // component={
                //   user === undefined || user === null ? Login : Loading
                // }
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
