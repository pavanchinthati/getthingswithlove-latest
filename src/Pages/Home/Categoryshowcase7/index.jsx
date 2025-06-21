import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Layout2 = React.memo((props) => {
  const { categoryList = [], isLoading } = useSelector(state => state.tenantSiteCategories);
  const dispatch = useDispatch();
  const history = useHistory();
  const leftItems = (categoryList || []).filter((_, i) => i % 2 === 0);
  const rightItems = (categoryList || []).filter((_, i) => i % 2 === 1);


  useEffect(() => {
    dispatch({ type: 'FETCH_TENANT_SITE_CATEGORIES' });
  }, [dispatch]);

  if (isLoading) return <p>Loading categories...</p>;

  const handleCategoryClick = (category) => {
    history.push(`/categories/${category}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        {leftItems.map((cat, idx) => (
          <div
            key={cat.id || idx}
            className={styles.cell}
            style={{ backgroundImage: `url(${cat.image})` }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className={styles.overlay}>
              {cat.subtitle && <div className={styles.subtitle}>{cat.subtitle}</div>}

              <h2 className={styles.title}>{cat.name}</h2>
              <p className={styles.description}>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.column}>
        {rightItems.map((cat, idx) => (
          <div
            key={cat.id || idx}
            className={styles.cell}
            style={{ backgroundImage: `url(${cat.image})` }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className={styles.overlay}>
              {cat.subtitle && <div className={styles.subtitle}>{cat.subtitle}</div>}
              <h2 className={styles.title}>{cat.name}</h2>
              <p className={styles.description}>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Layout2;
