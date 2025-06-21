import axios from "axios";
import errorHandler from "@lib/errorHandler";
import { tenantId } from "../Assets/Globals";

export const requestMakerWithCurrentUrl = (
  baseQuery,
  method,
  requestData,
  additionalHeaders = {}
) => {
  let en_t = "";
  try {
    const auth = JSON.parse(localStorage.getItem('auth')) || {};
    en_t = localStorage && auth?.[tenantId]?.token;
  } catch (error) {
    console.warn("No auth token found: ", error);
  }

  if (!navigator.onLine) {
    throw new Error("No internet connection");
  }

  const headers = {
    ...additionalHeaders,
  };

  let baseUrl = `https://appsketch.ai/app/${tenantId}`;
  let fullUrl = `${baseUrl}/api${baseQuery}`;
  const { params, payload } = requestData;
  if (en_t) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${en_t}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  let apiCall = axios({
    method: method,
    url: fullUrl,
    params: params,
    data: payload,
    headers: headers,
  });
  return apiCall
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const pe = errorHandler(error);
      console.error("Error in requestMakerWithCurrentUrl :: ", error, pe);
      throw error;
    });
};

export const requestMaker = (
  baseQuery,
  method,
  requestData,
  additionalHeaders = {}
) => {
  let en_t = "";
  try {
    en_t = localStorage && localStorage.getItem("auth_token");
  } catch (error) {
    console.warn("No en-token found : ", error);
  }

  if (!navigator.onLine) {
    throw new Error("No internet connection");
  }

  const headers = {
    ...additionalHeaders,
  };

  let baseurl = `https://appsketch.ai/api`;
  baseQuery = `${baseurl}${baseQuery}`;
  const { params, payload } = requestData;
  
  if (en_t) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${en_t}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
  let apiCall = axios(
    {
      method: method,
      url: baseQuery,
      params: params,
      data: payload,
    },
    { headers: headers }
  );

  return apiCall
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const pe = errorHandler(error);
      console.error("Error in requestMaker :: ", error, pe);
      throw error;
    });
};