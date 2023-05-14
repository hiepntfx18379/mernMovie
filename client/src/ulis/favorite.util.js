const favoriteUtils = {
  check: ({ listFavorites, mediaId }) => {
    return listFavorites.find((f) => f.data.mediaId.toString() === mediaId.toString()) !==
      undefined}
};

export default favoriteUtils;
