import React  from "react";
import "./index.scss";
import { useSelector } from "react-redux";

export default function Subtotal({
  final_price = 0,
  final_item = 0,
  discount_code = "",
  deliveryCharge,
  total_final_cost,
  paymentmode
}) {
    

  const {cartData} = useSelector(state => state.tenantSiteCart);

  const { delivery_charge = 0, default_delivery_charge = 0 } = cartData || {};
  const originalPrice = parseFloat(final_price);
  const deliveryFee = parseFloat(deliveryCharge) || 0;
  const subtotalCandidate = total_final_cost ? parseFloat(total_final_cost) : originalPrice;
  const shouldStrikeThrough = (originalPrice - deliveryFee) !== originalPrice;

  const computedSubtotal = subtotalCandidate !== 0 ? subtotalCandidate - deliveryFee : "pending";



  return (
    <div className="checkout-subtotal-wrapper">
      {discount_code ? (
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Discount Coupon</div>
          <div className="checkout-subtotal-price discount-applied">
            {discount_code}
          </div>
        </div>
      ) : null}
      {paymentmode ?
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Payment Mode</div>
          <div className="checkout-subtotal-price discount-applied">
            {paymentmode}
          </div>
        </div>
        : null
      }
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Subtotal</div>
        <div className="checkout-subtotal-price ">
          {shouldStrikeThrough && (
            <span className="strike-subtotal">
              <span className="ruppe">₹</span>
              {originalPrice}
            </span>
          )}
          <span className="ruppe">₹</span>
          {computedSubtotal}
        </div>
      </div>
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Total Items</div>
        <div className="checkout-subtotal-price">{final_item}</div>
      </div>
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Delivery Charge</div>
        <div className="checkout-subtotal-price">
          <span className="ruppe">₹</span> {parseFloat(deliveryCharge) ? parseFloat(deliveryCharge) > default_delivery_charge ? default_delivery_charge : parseFloat(deliveryCharge) : default_delivery_charge}
        </div>
      </div>
      {!deliveryCharge && delivery_charge > default_delivery_charge ?
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Night Surcharge</div>
          <div className="checkout-subtotal-price">
            <span className="ruppe">₹</span> {delivery_charge - default_delivery_charge}
          </div>
        </div>
        : null}
      {deliveryCharge && deliveryCharge > default_delivery_charge ?
        <div className="checkout-subtotal">
          <div className="checkout-subtotal-title">Night Surcharge</div>
          <div className="checkout-subtotal-price">
            <span className="ruppe">₹</span> {deliveryCharge - default_delivery_charge}
          </div>
        </div>
        : null}
      <div className="checkout-subtotal">
        <div className="checkout-subtotal-title">Total Price</div>
        <div className="checkout-subtotal-price">
          <span className="ruppe">₹</span> {total_final_cost ? (parseFloat(total_final_cost) !== 0 ? parseFloat(total_final_cost) : "pending") : (parseFloat(final_price) !== 0 ? parseFloat(final_price) + (parseFloat(deliveryCharge) ? parseFloat(deliveryCharge) : delivery_charge) : "pending")}
        </div>
      </div>
    </div>
  );
}
