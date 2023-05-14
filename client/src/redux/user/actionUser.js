import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const register = createActions({
  createUserRequest: (payload) => payload,
  createUserSuccess: (payload) => payload,
  createUserFailure: (err) => err,
});

export const login = createActions({
  loginUserRequest: (payload) => payload,
  loginUserSuccess: (payload) => payload,
  loginUserFailure: (err) => err,
});

export const updatePassword = createActions({
  updatePasswordRequest: (payload) => payload,
  updatePasswordSuccess: (payload) => payload,
  updatePasswordFailure: (err) => err,
});

export const getUser = createActions({
  getUserRequest: undefined,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
});

export const getFavorite = createActions({
  getFavoriteRequest: undefined,
  getFavoriteSuccess: (payload) => payload,
  getFavoriteFailure: (err) => err,
});

export const createFavorite = createActions({
  createFavoriteRequest: (payload) => payload,
  createFavoriteSuccess: (payload) => payload,
  createFavoriteFailure: (err) => err,
});

export const deleteFavorite = createActions({
  deleteFavoriteRequest: (payload) => payload,
  deleteFavoriteSuccess: (payload) => payload,
  deleteFavoriteFailure: (err) => err,
});

export const createReview = createActions({
  createReviewRequest: (payload) => payload,
  createReviewSuccess: (payload) => payload,
  createReviewFailure: (err) => err,
});

export const deleteReview = createActions({
  deleteReviewRequest: (payload) => payload,
  deleteReviewSuccess: (payload) => payload,
  deleteReviewFailure: (err) => err,
});
