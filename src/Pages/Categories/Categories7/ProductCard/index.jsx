import React from 'react';
import styles from "./index.module.scss";
import AddToCartButton from '../AddToCartButton';

const ProductCard = React.memo((props) => {
  const { image, name, description, mrp, price, onClick, } = props;

  const handleOnClick = () => {
    if (!onClick) {
      return;
    }
    onClick(props);
  }
  return (
    <div className={`${styles.productCard}`}>
      <img src={image} alt='product' className={styles.productImg} onClick={handleOnClick} />
      <div className={styles.productDetails}>
        <div className={styles.leftPart}>
          <span className={`${styles.productName}`}>
            {name?.length > 15 ?
              `${String(name).slice(0, 15)}...` :
              name
            }
          </span>
          <span className={styles.productPrice}>₹ {price}</span>
        </div>
        <AddToCartButton product={{...props}} />
      </div>
    </div>
  )
})

export default ProductCard;