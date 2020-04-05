import React from "react";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import Colors from "../constants/Colors";

const Favorites = (props) => {
  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/favorites-image.png")}
        style={{ height: 250, width: 250 }}
      />
      <Text>You'll see your favorite videos here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Favorites;
