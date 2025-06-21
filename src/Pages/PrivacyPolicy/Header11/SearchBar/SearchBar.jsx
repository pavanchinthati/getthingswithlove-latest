import React, { useState, useRef, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import styles from "./SearchBar.module.scss"
import useBuilderDimensions from '@hooks/useBuilderDimensions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionsCreator } from '@redux/actions/actionsCreator';
import { fetchSellableInventorys } from '@api/tenantApp';
import Loader from "@components/Loader";

const SearchBar = React.memo(() => {
    const [searchKey, setSearchKey] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const inputRef = useRef(null);
    const { width } = useBuilderDimensions();
    const isMobile = width < 550;
    const history = useHistory();
    const dispatch = useDispatch();

    // console.log(searchKey)
    const filterResults = debounce(async (query) => {
        try {
            setLoadingProducts(true);
            if (query.length < 3) {
                return;
            }
            if (!query) return setResults([]);

            const lowerQuery = query.toLowerCase();

            const { data } = await fetchSellableInventorys({ searchKey: lowerQuery });
            if (data) {
                const filtered = data?.results?.filter((product) =>
                    product?.product_name?.toLowerCase().includes(lowerQuery) ||
                    product?.description?.toLowerCase().includes(lowerQuery)
                );
                setResults(filtered || []);
            }
        } catch (err) {
            console.error("Error while fetching searched products");
        } finally {
            setLoadingProducts(false);
        }

    }, 300);

    const handleRedirectToProduct = (item) => {
        console.log("Clicked")
        const productCategory = item?.categories?.[0]?.name;
        // console.log(productCategory)
        history.push(`/categories/${productCategory}`);
        dispatch(actionsCreator.SET_PRODUCT_MODAL_STATES({
            openProductModal: true,
            product: item,
        }))
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchKey(value);
        localStorage.setItem('searchKey', value);
        filterResults(value);
    };


    // useEffect(() => {
    //     const stored = localStorage.getItem('searchKey');
    //     if (stored) {
    //         setSearchKey(stored);
    //         filterResults(stored)
    //     }
    // }, []);
    return (
        <div className={styles.searchWrapper}>
            <motion.div
                className={styles.searchBar}
                animate={{ width: isFocused ? (isMobile ? '180px' : '250px') : (isMobile ? '150px' : '200px') }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <IoIosSearch />
                <input
                    ref={inputRef}
                    value={searchKey}
                    placeholder="Search..."
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow result clicks
                    type="text"
                />
            </motion.div>
            {isFocused && searchKey?.length > 2 &&
                (
                    <motion.ul
                        className={styles.results}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.resultContainer}>
                            {
                                loadingProducts ?
                                    <Loader className={styles.productSearchLoader} />
                                    :
                                    <>
                                        {
                                            results?.length === 0 && searchKey && (
                                                <p className={styles.noResults}>No results found</p>
                                            )
                                        }
                                        {results?.map((item, index) => (
                                            <li className={styles.product} key={index}
                                                onClick={() => handleRedirectToProduct(item)} >
                                                <img src={item?.photo} alt='product' />
                                                <div className={styles.prodDetails}>
                                                    <span className={styles.prodName}>{item?.product_name}</span>
                                                    <span className={styles.prodDesc}>{item?.description?.length > 70 ? `${item?.description?.slice(0, 70)}...` : item?.description}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </>
                            }
                        </div>
                    </motion.ul>
                )}
        </div>
    );
});

export default SearchBar;
