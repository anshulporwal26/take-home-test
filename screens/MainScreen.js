import React from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import VideoCard from "../components/VideoCard";
import { useSelector } from "react-redux";

const MainScreen = (props) => {
  const data = useSelector((state) => state.content.content);

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.videoId.toString()}
      renderItem={(itemData) => (
        <VideoCard
          video={itemData.item}
          onClick={() =>
            props.navigation.navigate("VideoPlayer", {
              videoId: itemData.item.videoId,
            })
          }
        />
      )}
    />
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Explore",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Settings"
          iconName="md-settings"
          onPress={() => {
            navData.navigation.navigate("Settings");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MainScreen;
