export const ADD_COMMENT = "ADD_COMMENT";

export const addComment = (userId, videoId, comment) => {
  return {
    type: ADD_COMMENT,
    userId: userId,
    videoId: videoId,
    comment: comment,
  };
};
