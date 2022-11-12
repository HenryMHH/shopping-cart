import React, { useEffect, useState } from 'react';
import {
  getProductList,
  ProductList as ProductListType,
} from '../../api/products';
import ProductItem from '../../components/ProductItem';
import styles from './styles.module.scss';

const ProductList = () => {
  const [products, setProducts] = useState<ProductListType>([]);
  const [categoryList, setCategoryList] = useState<Array<string>>([]);
  const [filter, setFilter] = useState<string>('');

  async function fetchProductList() {
    const data = await getProductList();
    const tempCategoryList = data.map((item) => item.category);
    const tempSet = new Set([...tempCategoryList]);
    setCategoryList(Array.from(tempSet));
    setProducts(data);
  }

  function clearCategoryFilter() {
    setFilter('');
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className={styles['container']}>
      {categoryList.length > 0 && (
        <div className={styles['category']}>
          篩選類別
          {categoryList.map((category) => (
            <div className={styles['category__item']} key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                onChange={(e) => setFilter(e.target.value)}
                checked={filter === category}
              />
              {category}
            </div>
          ))}
          <div className={styles['filter']} onClick={clearCategoryFilter}>
            清除篩選條件
          </div>
        </div>
      )}
      <div className={styles['product-list']}>
        {products.map((product) =>
          product.category === filter || !filter ? (
            <ProductItem key={product.id} product={product} />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default ProductList;
