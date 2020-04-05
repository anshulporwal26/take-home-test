import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as contentActions from "../store/actions/content";

const VideoPlayer = (props) => {
  // const [loader, setLoader] = useState(true);
  const [comment, setComment] = useState("");
  const data = useSelector((state) => state.content.content);
  const userId = useSelector((state) => state.auth.userId);
  const videoId = props.navigation.getParam("videoId");
  const video = data.find((video) => video.videoId === videoId);

  const dispatch = useDispatch();

  const submitComment = () => {
    Keyboard.dismiss();
    if (comment.trim() === "") {
      Alert.alert("Warning", "Comment can't be empty!", [{ text: "Okay" }]);
      return;
    }

    console.log(userId, "userId");
    dispatch(contentActions.addComment(userId, videoId, comment));
    setComment("");
  };

  const onError = () => {
    Alert.alert("An Error Occurred!", "Video can't be played, Try again!", [
      { text: "Okay" },
    ]);
  };

  return (
    <View style={styles.screen}>
      <Video
        source={{
          uri: video.videoUrl,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        useNativeControls
        // onLoad={() => {}}
        shouldPlay
        isLooping
        onError={onError}
        style={styles.video}
      />

      <View style={styles.creatorDetails}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        <Text style={styles.meta}>
          {video.creator} &middot; {video.views} views &middot; {video.uploaded}
        </Text>
      </View>

      <View style={styles.commentSectionHeading}>
        <Text style={{ fontSize: 14 }}>Comments</Text>
      </View>

      <ScrollView style={styles.commentSectionList}>
        {video.comments.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Be the first to comment!</Text>
          </View>
        ) : (
          video.comments.map((comment) => {
            return (
              <Text key={comment.commentId}>
                <Text style={{ fontWeight: "bold", color: Colors.primary }}>
                  You:{" "}
                </Text>
                {comment.comment}
              </Text>
            );
          })
        )}
      </ScrollView>

      <View style={styles.addComment}>
        <View style={styles.commentContainer}>
          <TextInput
            placeholder="Enter comment"
            style={styles.commentInput}
            onChangeText={(value) => setComment(value)}
            value={comment}
          />
          <TouchableOpacity onPress={submitComment}>
            <Ionicons name="ios-send" size={30} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: 250,
  },
  creatorDetails: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#afafaf",
  },
  videoTitle: {
    fontSize: 18,
  },
  meta: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 3,
  },
  commentSectionHeading: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#afafaf",
  },
  commentSectionList: {
    paddingHorizontal: 12,
    height: "20%",
    paddingTop: 10,
  },
  addComment: {
    flex: 1,
    justifyContent: "flex-end",
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  commentInput: {
    height: 40,
    backgroundColor: "#f5f5f5",
    width: "90%",
  },
});

VideoPlayer.navigationOptions = {
  headerTitle: "Video",
};

export default VideoPlayer;
