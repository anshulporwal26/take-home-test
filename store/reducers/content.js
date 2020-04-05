import DATA from "../../data/dummy-data";
import { ADD_COMMENT } from "../actions/content";

const initialState = {
  content: DATA,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      const video = state.content.find(
        (video) => video.videoId === action.videoId
      );
      video.comments.push({
        commentId: Math.random().toString(),
        userId: action.userId,
        comment: action.comment,
      });
    default:
      return state;
  }
};
