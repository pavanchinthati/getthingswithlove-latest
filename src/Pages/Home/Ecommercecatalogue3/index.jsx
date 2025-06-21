import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';

const Layout3 = React.memo((props) => {
    // console.log(featuredCategories)
    const containerRefs = useRef([]);
    const [scrollState, setScrollState] = useState([]);
    const { list: featuredCategories = [], isLoading } = useSelector(state => state.tenantSiteCatalogue);
    const tenantId = useSelector(state => state.tenantDetails.tenantId);

    const dispatch = useDispatch();

    useEffect(() => {
        if(featuredCategories === null){
            dispatch({ type: 'FETCH_TENANT_SITE_CATALOGUE', payload: { tenantId } });
        }
    }, [dispatch]);

    const slideLeft = (index) => {
        if (!containerRefs.current[index]) return;
        containerRefs.current[index].scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    };

    const slideRight = (index) => {
        if (!containerRefs.current[index]) return;
        containerRefs.current[index].scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    };

    const updateScrollState = (idx) => {
        const el = containerRefs.current[idx];
        if (!el) return;

        const isAtStart = el.scrollLeft <= 0;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        setScrollState((prev) => {
            const updated = [...prev];
            updated[idx] = { isAtStart, isAtEnd };
            return updated;
        });
    };

    useEffect(() => {
        featuredCategories?.forEach((_, idx) => {
            updateScrollState(idx);
        });
    }, [featuredCategories]);

    useEffect(() => {
        featuredCategories?.forEach((_, idx) => {
            const el = containerRefs.current[idx];
            if (!el) return;
            const onScroll = () => updateScrollState(idx);
            el.addEventListener('scroll', onScroll);
            return () => el.removeEventListener('scroll', onScroll);
        });
    }, [featuredCategories]);


    if (isLoading) return <p>Loading Catalogue...</p>;
    return (
        <div className={`${styles.catalogueWrapper}`}>
            {featuredCategories?.map((cat, idx) => {
                const products = cat.products || [];
                return (
                    <div className={styles.featuredCategory} key={idx}>
                        <div className={styles.categoryDesc}>
                            <h5>{cat?.name}</h5>
                            <div className={styles.slider}>
                                <button
                                    onClick={() => slideLeft(idx)}
                                    className={`${styles.sliderBtn} ${scrollState[idx]?.isAtStart ? styles.disabled : ''}`}
                                >
                                    <MdKeyboardArrowLeft />
                                </button>
                                <button
                                    onClick={() => slideRight(idx)}
                                    className={`${styles.sliderBtn} ${scrollState[idx]?.isAtEnd ? styles.disabled : ''}`}
                                    disabled={scrollState[idx]?.isAtEnd}
                                >
                                    <MdKeyboardArrowRight />
                                </button>
                            </div>
                        </div>
                        <div
                            className={styles.featuredProducts}
                            ref={(el) => (containerRefs.current[idx] = el)}
                        >
                            {products?.map(prod => (
                                <React.Fragment key={prod?.id}>
                                    <ProductCard
                                        image={prod?.image_url}
                                        name={prod?.name}
                                        description={prod?.description}
                                        mrp={prod?.mrp}
                                        price={prod?.price}
                                        {...prod}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
})

export default Layout3;