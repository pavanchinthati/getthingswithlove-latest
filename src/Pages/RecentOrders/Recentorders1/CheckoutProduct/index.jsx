import React from "react";
import styles from "./index.module.scss";
import { IoMdClose } from "react-icons/io";

export default function CheckoutProduct({
    photo,
    product,
    description,
    quantity,
    price,
    final_price,
    removeItem,
    id,
    readyOnly,
    quantity_remaining,
    showStrikeThrough,
    discount,
    out_of_stock
}) {
    if (quantity_remaining < quantity) {
        out_of_stock = true
    }
    else if (quantity == quantity_remaining) {
        out_of_stock = false
    }
    return (
        <div className={styles.checkoutProduct}>
            <div className={`${styles.imgDiv} ${out_of_stock ? styles.fadeCard : ''}`}>
                <img src={photo} alt="prod-photo" />
            </div>
            <div className={styles.checkoutDetails}>
                <div className={styles.checkoutProductDetails}>
                    <div className={`${out_of_stock ? styles.fadeCard : ''}`}>
                        <div className={styles.checkoutProductName}>
                            {product}
                            <span className={styles.checkoutProductQuantity}>{" x "}{parseInt(quantity)}</span>
                            <span className={styles.productPrice}>
                                <div>
                                    <span className={styles.rupee}>₹</span> {parseFloat(price) !== 0 ? parseFloat(price) : "pending"}
                                </div>
                            </span>
                        </div>
                        <div className={styles.checkoutProductDescription}>{description}</div>
                        {quantity > quantity_remaining && quantity_remaining == 0 && out_of_stock ? <p className={styles.outOfStock}>Out Of Stock</p> : null}
                        {quantity > quantity_remaining >= 1 && quantity_remaining != 0 && out_of_stock ? <p className={styles.outOfStock}>Only {quantity_remaining} item left!</p> : null}

                    </div>
                </div>
                <div className={styles.checkoutProductDelete}>
                    {!readyOnly && (
                        <div onClick={() => removeItem()}>
                            <IoMdClose />
                        </div>
                    )}
                    <span className={styles.productPrice}>
                        <span className={styles.rupee}>₹</span>
                        {!parseFloat(final_price) ? "pending" : parseFloat(price) * quantity}
                    </span>
                </div>
            </div>
        </div>
    );
}
