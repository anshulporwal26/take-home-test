import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const VideoCard = (props) => {
  return (
    <View style={styles.videoCard}>
      <TouchableOpacity useForeground onPress={props.onClick}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: props.video.thumbnail,
              }}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.video.title}</Text>
            <Text style={styles.meta}>
              {props.video.creator} &middot; {props.video.views} views &middot;{" "}
              {props.video.uploaded}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  videoCard: {
    height: 300,
    marginBottom: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "80%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    height: "17%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 1,
  },
  meta: {
    fontSize: 10,
    color: "#888",
  },
});

export default VideoCard;
