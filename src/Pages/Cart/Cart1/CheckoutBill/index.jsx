import React from "react";
import "./index.scss";
import CheckoutProduct from "../CheckoutProduct"
import { sortItems } from "@utils/tenant-site-utils";
import Subtotal from "../Subtotal";
import { useState } from "react";
import { useEffect } from "react";

export default function CheckoutBill({
  cartData,
  removeItem,
  mode_of_payment = "cash_on_delivery",
  showOptions,
}) {

  const { cartitem = [], final_item, out_of_stock } = cartData || {};
  const formattedCartItems = sortItems(cartitem);
  const [sum, setsum] = useState(1);



  // console.log(delivery_charge, previous_delivery_charge, modal)
  const subtotal = (cartData) => {
    const { final_price = 0, final_item, discount_code } = cartData;
    return (
      <Subtotal
        prev_total={sum}
        final_item={final_item}
        final_price={final_price}
        discount_code={discount_code}
      />
    );
  };

  useEffect(() => {
    let temp = 0;
    let i;
    let item;
    if (formattedCartItems !== null)
      for (i = 0; i < formattedCartItems.length; i++) {
        item = formattedCartItems[i];
        temp = temp + item.original_price * item.quantity;
        item.out_of_stock = false
        for (let j = 0; j < out_of_stock.length; j++) {
          if (item.id == out_of_stock[j]) {
            item.out_of_stock = true
          }
        }
      }
    setsum(temp);
  }, [formattedCartItems, out_of_stock]);

  const options = [
    {
      name: "Cash On Delivery",
      value: "ECOD",
    },
    {
      name: "Online Payment",
      value: "online",
    },
  ];
  return (
    <div className="checkout-product-wrapper">
      <h5>PRODUCT</h5>
      <div className={"cart-products-container"}>
        {formattedCartItems.map((i, index) => {
          return (
            <CheckoutProduct
              product={i.product_name}
              photo={i.photo}
              price={i.original_price}
              description={i.description}
              final_price={i.final_price}
              quantity={i.quantity}
              key={index}
              removeItem={() => removeItem(i)}
              id={i.id}
              quantity_remaining={i.quantity_remaining}
              showStrikeThrough={true}
              out_of_stock={i.out_of_stock}
            />
          );
        })}
      </div>
      {/* {isLoggedIn && <Discount cartData={cartData} />} */}
      {subtotal(cartData)}

      {showOptions && (
        <>
          <button
            className={
              mode_of_payment === "cash_on_delivery"
                ? "wallet-btn wallet-selected"
                : "wallet-btn"
            }
          >
            <div className="selectWrap">
              <div
                className={
                  mode_of_payment === "cash_on_delivery"
                    ? "circle circle-selected"
                    : "circle"
                }
              ></div>
              Pay on Delivery
            </div>
          </button>
        </>
      )}
    </div>
  );
}
