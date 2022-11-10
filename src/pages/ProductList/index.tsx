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

  async function fetchProductList() {
    const data = await getProductList();
    const tempCategoryList = data.map((item) => item.category);
    const tempSet = new Set([...tempCategoryList]);
    setCategoryList(Array.from(tempSet));
    setProducts(data);
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['category']}>
        篩選類別
        {categoryList.map((category) => (
          <div key={category}>
            <input type="checkbox" /> {category}
          </div>
        ))}
      </div>
      <div className={styles['product-list']}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
