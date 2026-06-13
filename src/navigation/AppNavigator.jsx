import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography } from "../theme/theme";

//Screens 
import HomeScreen from "../screen/HomeScreen";
import CaptureScreen from "../screen/CaptureScreen";
import ReviewScreen from "../screen/ReviewScreen";
import FeedScreen from "../screen/FeedScreen";
import DetailScreen from "../screen/DetailScreen";
import SearchScreen from "../screen/SearchScreen";
import { Tabs } from "expo-router/ui";
import styles from "expo-router/build/modal/web/modalStyles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator

const BottomTabs = ()=>{
    return (
        <Tabs.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarStyle:styles.tabBar,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted
        })}>

        </Tabs.Navigator>
    )
}