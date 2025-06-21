import { all } from "redux-saga/effects";
import tenantSiteSagas from "./tenantSiteSagas";

export default function* rootSaga() {
  yield all([tenantSiteSagas()]);
}