const favoriteUtils = {
  check: ({ listFavorites, movie_id }) =>
    listFavorites &&
    listFavorites.find((f) => f.movie_id.toString() === movie_id.toString()) !==
      undefined,
};

export default favoriteUtils;
