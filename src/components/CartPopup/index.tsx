import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { productContext } from '../../context/productContext';
import Button from '../Button';
import styles from './styles.module.scss';

const CartPopup = () => {
  const { cart, calculateDiscountedPrice } = useContext(productContext);

  return (
    <div className={styles['popup']}>
      {cart.map((item) => (
        <div key={item.id} className={styles['item']}>
          <div
            className={styles['thumbnail']}
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          ></div>
          <div className={styles['title']}>{item.title}</div>
          <div className={styles['price']}>
            ${calculateDiscountedPrice(item.price, item.discountPercentage)}
          </div>
        </div>
      ))}

      <div className={styles['footer']}>
        <div className={styles['total']}>共有 {cart.length} 項</div>

        <Link to="/shopping-cart-demo/cart">
          <Button className={styles['button']}>查看購物車</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPopup;
