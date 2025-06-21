import { call, put, takeLatest } from 'redux-saga/effects';
import { tenantAppAPI } from '@api';
import { actionsCreator } from '../actions/actionsCreator';

export function* fetchCategories() {
  try {
    yield put({ type: 'FETCH_CATEGORIES_REQUEST' });
    const { data } = yield call(tenantAppAPI.fetchCategories);
    yield put({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data?.data });
  } catch (error) {
    yield put({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message || 'Error fetching categories' });
  }
}

export function* handleFetchFeaturedCategories(action) {
  try {
    yield put({ type: 'FETCH_CATALOGUE_REQUEST' });
    const response = yield call(tenantAppAPI.fetchFeaturedCategories, action.payload.tenantId);
    yield put({
      type: 'FETCH_CATALOGUE_SUCCESS',
      payload: response?.data?.data?.featured_categories || [],
    });
  } catch (error) {
    yield put({
      type: 'FETCH_CATALOGUE_FAILURE',
      payload: error.message || 'Failed to fetch featured categories',
    });
  }
}

export function* fetchAllCategoriesSaga(action) {
  try {
    yield put({ type: 'FETCH_GLOBAL_CATEGORIES_REQUEST' });
    const { data } = yield call(tenantAppAPI.fetchCategoriesGlobal);
    const categories = data?.data || [];

    yield put({ type: 'FETCH_GLOBAL_CATEGORIES_SUCCESS', payload: categories });
  } catch (err) {
    console.error("Error while fetching Categories", err);
  }
}

export function* fetchRecentOrders(action) {
  try {
    yield put({ type: 'FETCH_RECENT_ORDERS_REQUEST' });
    const { data } = yield call(tenantAppAPI.activeOrders, 1);
    const orders = data?.data || [];

    yield put({ type: 'FETCH_RECENT_ORDERS_SUCCESS', payload: orders });
  } catch (err) {
    console.error("Error while fetching Tenant Orders", err);
    yield put({ type: 'FETCH_RECENT_ORDERS_FAILURE', payload: err.message || 'Unknown error' });
  }
}

export function* fetchCartDetails(action) {
  try {
    if (action.payload) {
      yield put(actionsCreator.SET_CART_DATA({
        cartData: action.payload
      }));
    }
    else {
      const { data } = yield call(tenantAppAPI.fetchCartDetails, {});
      console.log(data);
      yield put(actionsCreator.SET_CART_DATA({ cartData: data }));
    }
  } catch (error) {
    yield put(actionsCreator.RESET_CART_DATA({}));
  }
}

export default function* tenantSiteSagas() {
  yield takeLatest('FETCH_TENANT_SITE_CATEGORIES', fetchCategories);
  yield takeLatest('FETCH_TENANT_SITE_CATALOGUE', handleFetchFeaturedCategories);
  yield takeLatest('FETCH_ALL_CATEGORIES_REQUEST', fetchAllCategoriesSaga);
  yield takeLatest('FETCH_TENANT_SITE_RECENT_ORDERS', fetchRecentOrders);
  yield takeLatest('FETCH_CART_DETAILS', fetchCartDetails);
};