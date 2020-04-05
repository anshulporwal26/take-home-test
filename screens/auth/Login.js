import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

import Colors from "../../constants/Colors";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const mode = props.navigation.getParam("mode");

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Warning", "Fill both the details!", [{ text: "Okay" }]);
      return;
    }
    Keyboard.dismiss();
    setIsLoading(true);
    let actions;
    if (mode === "login") {
      actions = authActions.login(email, password);
    } else {
      actions = authActions.signup(email, password);
    }

    try {
      await dispatch(actions);
      props.navigation.navigate("Main");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.formControl}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
      </View>

      <View style={styles.formControl}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
      </View>

      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size={48} color={Colors.primary} />
        </View>
      )}

      <TouchableHighlight style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title={mode === "login" ? "Log in" : "Sign up"}
          onPress={authHandler}
        />
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  formControl: {
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
  },
  textInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 3,
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "#afafaf",
    justifyContent: "center",
    alignItems: "center",
  },
});

LoginScreen.navigationOptions = (navData) => {
  const mode = navData.navigation.getParam("mode");

  return {
    headerTitle: mode === "login" ? "Log in" : "Sign up",
  };
};

export default LoginScreen;
