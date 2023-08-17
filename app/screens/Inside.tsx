import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewLogScreen from "./NewLogScreen";
import ProfileScreen from "./ProfileScreen";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Tab = createBottomTabNavigator();

export default function Inside({ navigation }: RouterProps) {
  return (
    <View style={styles.container}>
      {/* <Button
        title={"Sign Out"}
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      /> */}
      <Tab.Navigator
        screenOptions={{
          headerRight: ({}) => (
            <TouchableOpacity
              onPress={() => {
                FIREBASE_AUTH.signOut();
              }}
            >
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                size={24}
                name="logout-variant"
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Tab.Screen
          name="Roll"
          component={HomeScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="toilet-paper" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="New Log"
          component={NewLogScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="toilet"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="user-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />
        
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
