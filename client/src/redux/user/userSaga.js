import { takeLatest, call, put, all } from "redux-saga/effects";
import userApi from "../../api/modules/user.api";
import authApi from "../../api/modules/auth.api";
import * as actions from "../user/actionUser";

// generation cach hoat dong giong async-await
function* fetchCreateUser(action) {
  try {
    // call => khi thuc hien 1 func thi call => cho den khi call dc resolve
    // yield ms hoan thanh xong => return result for post
    // pass 1 api for call()
    const dataRegister = yield call(authApi.register, action.payload); // call api fetchPost -> index/api
    console.log("register: ", dataRegister);
    // after return data
    // trigger 1 action by put() pass data from api
    // -> run to reducer with (state, action) => update store => update UI => re-render

    yield put(actions.register.createUserSuccess(dataRegister));
  } catch (err) {
    console.log(err);
    yield put(actions.register.createUserFailure(err));
  }
}

// function* createPostSaga(action) {
//   try {
//     // can truyen data gui di trong action.payload
//     const create = yield call(api.createPosts, action.payload);
//     console.log("[create-post]", create);
//     yield put(actions.createPosts.ceatePostsSuccess(create));
//   } catch (err) {
//     console.log(err);
//     yield put(actions.createPosts.ceatePostsFailure(err));
//   }
// }

// function* updatePostSaga(action) {
//   try {
//     //call api
//     const update = yield call(api.updatePost, action.payload);
//     console.log("update Post", update);
//     yield put(actions.updatePost.updatePostSuccess(update.data));
//   } catch (err) {
//     console.log(err);
//     yield put(actions.updatePost.updatePostFailure(err));
//   }
// }

function* mySaga() {
  // takeLatest: phia ui co nhieu trigger cung luc se chi co nguoi cuoi cung dc xu ly
  // cac request trc do se bij cancel het

  // listen a action -> trigger getPostRequest -> execute fetchPostSaga()
  yield takeLatest(actions.register.createUserRequest, fetchCreateUser);
}

function* rootSaga() {
  yield all([mySaga]);
}
