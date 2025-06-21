import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.scss"
import { tenantAppAPI } from '@api';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import ViewProductModal from './ViewProductModal';
import { actionsCreator } from '@redux/actions/actionsCreator';
import { useHistory, useParams } from 'react-router-dom';


const Layout7 = (props) => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [productsList, setProductsList] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const openViewProductModal = useSelector(state => state.productModalState.openProductModal);
    const { categoryList, selectedCategory } = useSelector(state => state.tenantSiteGlobalCategories);
    const searchKey = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        if (!categoryList) {
            return;
        }
        const selectedCategoryName = String(params[0]).slice(1);
        let selectedCategory = categoryList[0];
        for (let i of categoryList) {
            if (i?.name === selectedCategoryName) {
                selectedCategory = i;
                break;
            }
        }
        dispatch(actionsCreator.SET_SELECTED_CATEGORY(selectedCategory));
    }, [categoryList]);

    useEffect(() => {
        if (categoryList) {
            return;
        }
        dispatch({
            type: 'FETCH_ALL_CATEGORIES_REQUEST',
            payload: { params },
        });
    }, [dispatch])

    const fetchMoreProducts = async (newPage) => {
        try {
            const response = await tenantAppAPI.fetchPagedProducts({
                subCategoryName,
                subCategoryId,
                page: newPage,
            });

            if (response.data.data.length === 0) {
                setHasMore(false);
            } else {
                setProductsList((prevProducts) => {
                    const uniqueProducts = [
                        ...new Map([...prevProducts, ...response.data.data].map((item) => [item.id, item])).values(),
                    ];
                    setPage(newPage);
                    return uniqueProducts;
                });
            }
        } catch (error) {
            console.log("Api error")
        }
    };

    const fetchProducts = async (page) => {
        try {
            const subCategoryName = selectedSubCategory?.name || selectedCategory?.name;
            const subCategoryId = selectedCategory?.id || selectedCategory?.id;
            if (!subCategoryName || !subCategoryId) {
                return;
            }
            const { data } = await tenantAppAPI.fetchPagedProducts({ page: 1, subCategoryName: subCategoryName, subCategoryId: subCategoryId });
            setProductsList(data?.data);
            if (data.data.length === 0) {
                setHasMore(false)
            }
        } catch (error) {
            console.error("Error while fetching Products.", error);
        } finally {
            // SetShowLoadingCards(false);
        }
    };

    const loadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            fetchMoreProducts(page + 1)
                .finally(() => setLoadingMore(false));
        }
    };
    // console.log(productsList);

    useEffect(() => {
        setHasMore(true);
        setPage(1);
        fetchProducts();
    }, [selectedCategory, selectedSubCategory]);

    const handleChangeCategory = (category) => {
        if (selectedCategory === category) {
            return;
        }
        const pathName = window.location.pathname;
        if (pathName !== "/builder") {
            history.push(`/categories/${category?.name}`)
        }
        dispatch(actionsCreator.SET_SELECTED_CATEGORY(category))
    }

    const handleProductClick = (product) => {
        if (!openViewProductModal) {
            dispatch(actionsCreator.SET_PRODUCT_MODAL_STATES({
                openProductModal: true,
                product: product,
            }))
        }
        // history.push(`/product?id=${product?.id}`)

    }

    useEffect(() => {
        const stored = localStorage.getItem('searchKey');
        if (stored) {
            searchKey.current = stored;
        }
    }, []);
    return (
        <main className={`${styles.categoryWrapper}`}>
            <aside className={styles.categoryDisplaySection}>
                <h5>All Categories</h5>
                <ul className={styles.categoriesList}>
                    {
                        categoryList?.map(category => (
                            <li
                                key={category?.id}
                                className={selectedCategory?.name === category?.name && styles.activeCategory}
                                onClick={() => handleChangeCategory(category)}
                            >
                                {category?.name}
                            </li>
                        ))
                    }
                </ul>
            </aside>
            <section className={styles.productsListWrapper}>
                {productsList?.map(product => (
                    <React.Fragment key={product?.id}>
                        <ProductCard
                            image={product?.photo}
                            name={product?.product_name}
                            description={product?.description}
                            mrp={product?.mrp}
                            price={product?.price}
                            onClick={handleProductClick}
                            {...product}
                        />
                    </React.Fragment>
                ))}
            </section>
            {
                openViewProductModal &&
                <ViewProductModal />
            }
        </main>
    )
}

export default Layout7;