import {requestMakerWithCurrentUrl,requestMaker} from "@requesMakerWithCurrentUrl";

export const register = (data) => {
  const url = `/account/register/`;
  const params = {};
  const payload = { ...data };
  return requestMakerWithCurrentUrl(url, 'post', { params, payload });
};

export const sendOtp = (data) => {
  const { phone_number } = data;
  const url = `/account/sendotp/${phone_number}/`;
  const params = {};
  const payload = { ...data };
  return requestMakerWithCurrentUrl(url, 'post', { params, payload });
};

export const verifyOtp = (data) => {
  const { phone_number, session_id, otp } = data;
  const url = `/account/verifyotp/${phone_number}/${session_id}/${otp}/`;
  const params = {};
  const payload = { ...data };
  return requestMakerWithCurrentUrl(url, 'get', { params, payload });
};

export const fetchSellableInventorys = (data) => {
  const { searchKey = "" } = data;
  const url = `/shop/sellableproductsearch/${searchKey}/`;
  const params = {};
  const payload = {};
  return requestMakerWithCurrentUrl(url, "get", { params, payload });
};

export const fetchCategories = async () => {
  const url = `/shop/category/`;
  const params = {};
  const payload = {};
  return requestMakerWithCurrentUrl(url, 'get', { params, payload });
};

export const addCartItems = (payload) => {
  const url = `/shop/add_to_cart/`;
  const params = {};
  return requestMakerWithCurrentUrl(url, "post", { params, payload });
};

export const fetchFeaturedCategories = async (tenantId) => {
  const url = `/shop/featured_categories/?tenant_id=${tenantId}`;
  const params = {};
  const payload = {};
  return requestMakerWithCurrentUrl(url, 'get', { params, payload });
}

export const createTicket = (data, workflowId) => {
  const url = `/crm/workflows/${workflowId}/tickets/create/`;
  const payload = data;
  const params = {};
  return requestMaker(url, "post", { params, payload });
};

// for fetching all categories
export const fetchCategoriesGlobal = async (data) => {
  const url = `/shop/fetchcategories/`;
  const params = { ...data };
  const payload = {};
  return requestMakerWithCurrentUrl(url, 'get', { params, payload });
};

// for fetching products on categories page
export const fetchPagedProducts = async (data) => {
  let { page, subCategoryName, subCategoryId } = data;
  if (!page) page = 1;
  const url = `/shop/products/Pagination/`;
  const params = { data };
  const payload = {};
  return requestMakerWithCurrentUrl(url, 'get', { params, payload });
};

export const activeOrders = (pageno, payload) => {
  const url = `/shop/recent_order/?page=${pageno}`;
  const params = {};
  return requestMakerWithCurrentUrl(url, "get", { params, payload });
};

export const fetchCartDetails = (data) => {
  const url = `/shop/get_cart/`;
  const params = {};
  const payload = {};
  return requestMakerWithCurrentUrl(url, "get", { params, payload });
};

export const placeAppOrder = (payload, cartId) => {
  const url = `/payments/checkout/${cartId}/EXPRESS_DELIVERY/`;
  const params = {};
  return requestMakerWithCurrentUrl(url, "post", { params, payload });
};

export const debitWallet = (payload) => {
  const url = `/account/wallet/`;
  const params = {};
  return requestMakerWithCurrentUrl(url, "post", { params, payload });
};

export const addAddresses = (data) => {
  const url = `/account/add_alternative/`;
  const params = {};
  const payload = { ...data };
  return requestMakerWithCurrentUrl(url, 'post', { params, payload });
};

export const editAddresses = (data) => {
  const url = `/account/add_alternative/`;
  const params = {};
  const payload = { ...data };
  return requestMakerWithCurrentUrl(url, 'patch', { params, payload });
};

export const fetchAddresses = async (data) => {
  const url = `/account/add_alternative/`;
  const params = { ...data };
  const payload = {};
  return requestMakerWithCurrentUrl(url, "get", { params, payload });
};

