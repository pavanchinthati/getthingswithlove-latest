import get from "lodash";

// function to check whther user is logged in or not
export function checkIsLoggedIn(tenantId) {
  const auth = JSON.parse(localStorage.getItem('auth')) || {};
  if (auth?.[tenantId] != undefined) {
    return true;
  }
  return false;
}

// function to set user token in local storage after login in app
export function setUserToken(tenantId, data) {
  let auth = JSON.parse(localStorage.getItem('auth')) || {};
  const newAuthData = {
    token: data?.token?.access,
    user: data?.user,
  }
  auth[tenantId] = {
    ...auth[tenantId],
    ...newAuthData,
  };
  localStorage.setItem('auth', JSON.stringify(auth));
}

//fcuntion to get user infor in app
export function getUserInfo(tenantId) {
  const auth = JSON.parse(localStorage.getItem('auth')) || {};
  if (auth?.[tenantId] != undefined) {
    return auth?.[tenantId]?.user;
  }
  return {};
}

export const errorMsg = (error) => {
  if (error && error["response"]) {
    const msg =
      get(error, "response.data.msg", "") ||
      get(error, "response.data.message", "");
    return msg;
  }
  return "Something went wrong!";
};

export const fetchQuantity = (id, items = []) => {
  let item = items.find((p) => {
    return p.id === id;
  });
  if (item) {
    return item.quantity;
  }
  return 0;
};

export const extractFinalPrice = (items) => {
  let final_price = 0;
  let final_item = 0;
  items.forEach((item) => {
    final_price += Number(item.original_price) * Number(item.quantity);
    final_item += Number(item.quantity);
  });
  return { final_price, final_item };
};

const compare = (a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
};

export const sortItems = (items) => {
  const formattedItems = items.sort(compare);
  return formattedItems;
};

export const dateExtractor = (value, type) => {
  let ans;
  let temp;
  let time;
  if (type === "24h") {
    ans = value.slice(11, 19);
    temp = value.slice(11, 13);
    temp = parseInt(temp);
    if (temp > 12) {
      temp = temp - 12;
      time = "pm";
    } else if (temp == 0) {
      temp = 12;
      time = "am";
    } else {
      time = "am";
    }
    temp =
      temp +
      value.slice(13, 16) +
      " " +
      time +
      ", " +
      value.slice(5, 7) +
      "/" +
      value.slice(8, 10) +
      "/" +
      value.slice(0, 4);
    ans = temp;
  } else
    ans =
      value.slice(5, 7) +
      "/" +
      value.slice(8, 10) +
      "/" +
      value.slice(0, 4) +
      " " +
      value.slice(11, 19);
  return ans;
};