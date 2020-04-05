import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";

import Colors from "../constants/Colors";

const OnboardingScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Streamsy</Text>

      <View style={styles.buttons}>
        <TouchableHighlight style={styles.buttonContainer}>
          <Button
            color={Colors.primary}
            title="Log in"
            onPress={() =>
              props.navigation.navigate("Login", { mode: "login" })
            }
          />
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
          <Button
            color={Colors.secondary}
            title="Sign up"
            onPress={() =>
              props.navigation.navigate("Login", { mode: "signup" })
            }
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    borderRadius: 10,
    marginVertical: 10,
  },
});

OnboardingScreen.navigationOptions = {
  headerTitle: "Welcome!",
};

export default OnboardingScreen;
