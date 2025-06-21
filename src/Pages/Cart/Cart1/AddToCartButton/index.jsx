import React, { useState } from 'react';
import styles from "./index.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkIsLoggedIn, errorMsg, fetchQuantity } from '@utils/tenant-site-utils';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { tenantAppAPI } from '@api';
import Loader from '@components/Loader';
import { actionsCreator } from '@redux/actions/actionsCreator';

const AddToCartButton = React.memo(({ product, className }) => {
  const dispatch = useDispatch();
  const id = product?.id;
  const { cartData } = useSelector(state => state.tenantSiteCart) || {};
  const cartitem = cartData && cartData.cartitem || [];
  const quantity = fetchQuantity(id, cartitem);
  const tenantId = useSelector(state => state.tenantDetails.tenantId);
  const [isLoading, setIsLoading] = useState(false);

  const loginStateSetter = () => {
    toast.error("Login to add items in your cart");
    setIsLoading(false);
  }

  const changeQuantity = (param) => {
    setIsLoading(true);
    if (tenantId) {
      const isLoggedIn = checkIsLoggedIn(tenantId);
      if (!isLoggedIn) {
        loginStateSetter();
        return;
      }
    }

    let quantityCheck = Math.floor(product?.quantity_remaining)
    // console.log(product);
    let { final_item = 0 } = cartData || {};
    let newQuantity;

    if (param === 'decrement') {
      newQuantity = quantity - 1;
      if (newQuantity >= 0) {
        updateCart(newQuantity, param);
      }
    } else {
      if (quantity >= 10 || final_item >= 20) {
        toast.error(`Can't add more than ${quantity >= 10 ? "10" : "20"} items`, {
          toastId: 'stockError',
        });
      }
      else if (quantity < quantityCheck) {
        newQuantity = quantity + 1;
        updateCart(newQuantity, "increment");
      }
      else {
        toast.error("Not enough items in stock", {
          toastId: 'stockError',
        });
      }
    }
    setIsLoading(false);
  }

  const updateCart = async (newQuantity, param) => {
    // console.log(newQuantity,param)
    try {
      setIsLoading(true)
      let modifiedCartItems = [...cartitem].map(i => ({
        product: i.id,
        quantity: i.quantity
      }));

      let modifiedItemIndex = modifiedCartItems.findIndex(item =>
        item.product === id
      );

      if (modifiedItemIndex >= 0) {
        modifiedCartItems[modifiedItemIndex] = {
          product: id,
          quantity: newQuantity
        };
      } else {
        modifiedCartItems.push({
          quantity: newQuantity,
          product: id
        });
      }

      const payload = {
        items: modifiedCartItems
      };

      const { data } = await tenantAppAPI.addCartItems(payload);
      dispatch(actionsCreator.SET_CART_DATA({
        cartData: data?.get_cart,
      }));
      let message = param === "decrement" ? "Item is removed successfully." : "Item added successfully.";
      toast.success(message, {
        toastId: 'success1',
        position: 'top-right',
      });
    } catch (error) {
      const msg = errorMsg(error);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`${styles.cartBtn} ${className}`}>
      {quantity && quantity > 0 ? (
        <button className={`${styles.addedToCartBtn} ${isLoading ? styles.isLoading : ""}`}>
          {
            !isLoading ?
              <>
                <FaMinus onClick={() => changeQuantity('decrement')}
                  className={styles.decrementBtn} />
                <p className={styles.quantity}>{quantity}</p>

                <FaPlus onClick={() => changeQuantity('increment')}
                  className={styles.incrementBtn} />
              </> :
              <Loader className={'addToCartLoader'} />
          }
        </button>
      ) : (
        <button
          className={`${styles.addToCartBtn} ${isLoading ? styles.isLoading : ""}`}
          onClick={() => changeQuantity('increment')}
        >
          {
            !isLoading ?
              <>
                <IoCartOutline />
                <p>Add to Cart</p>
              </> :
              <Loader className={'addToCartLoader'} />
          }
        </button>
      )}
    </div>
  );
})

export default AddToCartButton;