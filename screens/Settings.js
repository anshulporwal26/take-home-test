import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Button,
  Image,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const Settings = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to logout?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(authActions.logout());
          props.navigation.navigate("Auth");
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/settings-image.png")}
        style={{ height: 250, width: 250 }}
      />
      <TouchableHighlight style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Log out"
          onPress={logoutHandler}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    width: "80%",
  },
});

export default Settings;
