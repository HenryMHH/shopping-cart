import React, { useContext } from 'react';
import { Product } from '../../api/products';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { productContext } from '../../context/productContext';

type Props = {
  product: Product;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const { calculateDiscountedPrice } = useContext(productContext);
  return (
    <Link className={styles['item']} to={`/products/${product.id}`}>
      <div className={styles['thumbnail']}>
        <img src={product.thumbnail} alt="thumbnail" />
      </div>
      <div className={styles['content']}>
        <div className={styles['title']}>{product.title}</div>
        <div className={styles['price']}>
          <span className={styles['price-original']}>${product.price}</span>
          <span className={styles['price-discounted']}>
            $
            {calculateDiscountedPrice(
              product.price,
              product.discountPercentage,
            )}
          </span>
        </div>
        <div className={styles['rating-stock']}>
          <div>評價: {product.rating}</div>
          <div>庫存: {product.stock}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
