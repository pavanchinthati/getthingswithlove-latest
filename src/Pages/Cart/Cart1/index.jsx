import React, { useEffect, useState } from "react";
import "./index.scss";
import CheckoutAddress from "./CheckoutAddress"
import CheckoutBill from "./CheckoutBill"
import EmptyCart from "./EmptyCart"
import Alert from "./Alert"
import { tenantAppAPI } from "@api";
import { useSelector } from "react-redux";
import { errorMsg } from "@utils/tenant-site-utils"
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { checkIsLoggedIn } from "@utils/tenant-site-utils";


export default function Checkout() {
  const tenantId = useSelector(state => state.tenantDetails.tenantId);
  const [selectedAddress, setSelectedAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState();
  const [outOfStock, setOutOfStock] = useState([])
  const history = useHistory();
  const isLoggedIn = checkIsLoggedIn(tenantId);
  const { cartData } = useSelector(state => state.tenantSiteCart) || {};
  const { cartitem = [] } = cartData || {};

  if (cartData) {
    cartData.out_of_stock = outOfStock
  }

  const removeItem = async (product) => {
    try {
      const { cartitem = [] } = cartData;
      let modifiedCartItems = [...cartitem];
      let modifiedItemIndex = modifiedCartItems.findIndex((item) => {
        return item.id === product.id;
      });
      if (modifiedItemIndex >= 0) {
        if (isLoggedIn) {
          modifiedCartItems[modifiedItemIndex]["quantity"] = 0;
          modifiedCartItems = modifiedCartItems.map((i) => {
            return { product: i.id, quantity: i.quantity };
          });
          const payload = {
            items: modifiedCartItems,
          };
          const res = await tenantAppAPI.addCartItems(payload);
          toast.success("Item removed successfully.");
          fetchCartDetails();
        } else {
          modifiedCartItems.splice(modifiedItemIndex, 1);
          toast.success("Item removed successfully.");
        }
      }
    } catch (error) {
      const msg = errorMsg(error);
      toast.error(msg);
    }
  };

  const updateAddress = (key, val) => {
    if (key === "new") {
      setNewAddress(val);
      if (val) {
        setSelectedAddress("");
      }
    } else {
      setSelectedAddress(val);
      if (val) {
        setNewAddress("");
      }
    }
  };


  const handleRedirectToRecentOrders = () => {
    history.push(`/recent-order`);
  }


  const placeOrder = async () => {
    setLoading(true);
    try {
      const { cartitem = [] } = cartData;
      const modifiedCartItems = [...cartitem].map((i) => {
        return { product: i.id, quantity: i.quantity };
      });
      const cartId = cartData?.data?.[0]?.id;
      if (!selectedAddress && !newAddress) {
        setLoading(false);
        return toast.error("Address can't be empty !");
      }
      const payload = {
        address: newAddress || selectedAddress,
        order_list: modifiedCartItems,
        mode_of_payment: "",
      };

      const data = await tenantAppAPI.placeAppOrder(payload, cartId);
      toast.success("Order Placed Sucessfully");
      handleRedirectToRecentOrders();
      await tenantAppAPI.addCartItems({items : []});
      setLoading(false);
    } catch (error) {
      toast.error("Error while creating order", error);
      setLoading(false);

    }
  };


  return (
    <>
      {isLoggedIn ? <Alert /> : null}
      <div className="checkout-container">
        {cartitem && cartitem.length > 0 ? (
          <>
            <div className="checkout-wrapper">
              <CheckoutBill
                cartData={cartData}
                removeItem={removeItem}
                isLoggedIn={isLoggedIn}
                showOptions={true}
              />
              {isLoggedIn && (
                <CheckoutAddress
                  updateAddress={updateAddress}
                  selectedAddress={selectedAddress}
                  newAddress={newAddress}
                />
              )}
            </div>
            <div className="checkout-button">
              <button
                loading={loading}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <EmptyCart
            text={
              "There are no items in your cart. Please add some items in your cart"
            }
          />
        )}
      </div>
    </>
  );
}