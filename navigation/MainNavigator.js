import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OnboardingScreen from "../screens/OnboardingScreen";
import Login from "../screens/auth/Login";
import MainScreen from "../screens/MainScreen";
import StartupScreen from "../screens/StartupScreen";
import Settings from "../screens/Settings";
import VideoPlayer from "../screens/VideoPlayerScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import Colors from "../constants/Colors";

const AuthNavigator = createStackNavigator({
  Auth: OnboardingScreen,
  Login: Login,
});

const VideoNavigator = createStackNavigator({
  Main: MainScreen,
  VideoPlayer: VideoPlayer,
  Settings: Settings,
});

const FavoriteNavigator = createStackNavigator({
  Favorite: FavoriteScreen,
});

const VideoPlayerNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: VideoNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-videocam" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Favorites: {
      screen: FavoriteNavigator,
      navigationOptions: {
        tabBarLabel: "Favorites",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-heart" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: VideoPlayerNavigator,
});

export default createAppContainer(MainNavigator);
