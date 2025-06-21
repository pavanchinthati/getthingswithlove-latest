import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.scss";
import Modal from '@components/ModalV3';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown
} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreator } from '@redux/actions/actionsCreator';
import AddToCartButton from '../AddToCartButton';

const ViewProductModal = React.memo(() => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const { product, openProductModal } = useSelector(state => state.productModalState);
  const thumbsRef = useRef([]);
  const dispatch = useDispatch();
  const images = product?.images || [];


  const toggleViewProductModal = () => {
    dispatch(actionsCreator.SET_PRODUCT_MODAL_STATES({
      openProductModal: false,
      product : null,
    }))
  }

  useEffect(() => {
    if (openProductModal) setCurrentIndex(0);
  }, [product, openProductModal]);

  useEffect(() => {
    const thumb = thumbsRef.current[currentIndex];
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex]);

  const prevImage = () => {
    setCurrentIndex(idx => (idx - 1 + images.length) % images.length);
  };
  const nextImage = () => {
    setCurrentIndex(idx => (idx + 1) % images.length);
  };

  const changeCurrentImg = (newImgIdx) => {
    setCurrentIndex(newImgIdx);
  };

  return (
    <Modal
      isOpen={openProductModal}
      onClose={() => toggleViewProductModal()}
    >
      <div className={styles.imagesSection}>
        <div className={styles.allImages}>
          <button
            className={styles.slideUp}
            onClick={prevImage}
            disabled={images.length <= 1}
          >
            <MdOutlineKeyboardArrowUp />
          </button>

          {images.map((img, idx) => (
            <img
              key={idx}
              ref={el => (thumbsRef.current[idx] = el)}
              src={img}
              alt={`thumb-${idx}`}
              className={
                idx === currentIndex ? styles.selectedImage : ''
              }
              onClick={() => changeCurrentImg(idx)}
            />
          ))}

          <button
            className={styles.slideDown}
            onClick={nextImage}
            disabled={images.length <= 1}
          >
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>

        <div className={styles.imageCarousel}>
          {images.length > 0 ? (
            <img
              className={styles.carouselImage}
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1} of ${images.length}`}
            />
          ) : (
            <div className={styles.noImage}>No images available</div>
          )}
          <div className={styles.sliders}>
            <button
              className={styles.slideLeft}
              onClick={prevImage}
              disabled={images.length <= 1}
            >
              <MdOutlineArrowBackIos />
            </button>
            <button
              className={styles.slideRight}
              onClick={nextImage}
              disabled={images.length <= 1}
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.productDetails}>
        <div className='flex justify-between content-center'>
          <h5 className={styles.productName}>{product?.product_name}</h5>
          <div className={styles.priceDetails}>
            <span className={styles.mrp}>₹ {product?.market_price}</span>
            <span className={styles.sellingPrice}>₹ {product?.price}</span>
          </div>
        </div>
        <div className={styles.categoriesList}>
          {product?.categories?.map((cat, idx) => (
            <button key={idx}>{cat?.name}</button>
          ))}
        </div>
        <p className={styles.productDescription}>{product?.description}</p>
      </div>

      <AddToCartButton product = {product} className = {styles.productModalCartBtn}/>
    </Modal>
  );
});

export default ViewProductModal;
