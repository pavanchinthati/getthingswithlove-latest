import {
  SET_CART_DATA,
  RESET_CART_DATA,
  SET_PRODUCT_MODAL_STATES,
  SET_TENANT_DATA,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATALOGUE_REQUEST,
  FETCH_CATALOGUE_FAILURE,
  FETCH_CATALOGUE_SUCCESS,
  FETCH_GLOBAL_CATEGORIES_FAILURE,
  FETCH_GLOBAL_CATEGORIES_REQUEST,
  FETCH_GLOBAL_CATEGORIES_SUCCESS,
  SET_SELECTED_CATEGORY,
  FETCH_RECENT_ORDERS_REQUEST,
  FETCH_RECENT_ORDERS_SUCCESS,
  FETCH_RECENT_ORDERS_FAILURE,
} from "../actions/actionTypes";

import {tenantId,workflowConfigId} from "@assets/Globals";

const tenantInitialState = {
  tenantId: tenantId,
  tenantTemplateId: null,
  workflowConfigId: workflowConfigId,
};

export const tenantDataReducer = (
  state = tenantInitialState,
  { type, payload }
) => {
  switch (type) {
    case SET_TENANT_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const initialCategoriesState = {
  categoryList: null,
  isLoading: true,
  error: null,
};

export const tenantSiteCategoriesReducer = (
  state = initialCategoriesState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categoryList: payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export const initialCatalogueState = {
  list: null,
  isLoading: true,
  error: null,
};

export const tenantSiteCatalogueReducer = (
  state = initialCatalogueState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_CATALOGUE_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_CATALOGUE_SUCCESS:
      return { ...state, isLoading: false, list: payload };
    case FETCH_CATALOGUE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

const productModalInitialState = {
  openProductModal: false,
  product: null,
};

export const productModalReducer = (state = productModalInitialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCT_MODAL_STATES:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const initialGlobalCategories = {
  categoryList: null,
  isLoading: true,
  error: null,
  selectedCategory: null,
};

export const tenantSiteGlobalCategoriesReducer = (
  state = initialGlobalCategories,
  { type, payload }
) => {
  switch (type) {
    case FETCH_GLOBAL_CATEGORIES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_GLOBAL_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categoryList: payload };
    case FETCH_GLOBAL_CATEGORIES_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: payload };
    default:
      return state;
  }
};

const recentOrderInitialStates = {
  orders: null,
  isLoading: false,
  error: null,
};

export const tenantSiteRecentOrdersReducer = (
  state = recentOrderInitialStates,
  { type, payload }
) => {
  switch (type) {
    case FETCH_RECENT_ORDERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_RECENT_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: payload };
    case FETCH_RECENT_ORDERS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

const cartInitialState = {
  cartData: null,
};

export const tenantSiteCartReducer = (
  state = cartInitialState,
  { type, payload }
) => {
  switch (type) {
    case SET_CART_DATA:
      return {
        ...state,
        ...payload,
      };
    case RESET_CART_DATA:
      return {
        ...payload,
      };
    default:
      return state;
  }
};