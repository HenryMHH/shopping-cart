import React, { useContext } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { productContext } from '../../context/productContext';
import styles from './styles.module.scss';

const Cart = () => {
  const { cart, handleEditAmount, handleRemoveItemFromCart } =
    useContext(productContext);

  function handleRemoveItem(id: number) {
    const isConfirm = window.confirm('確定要移除此商品嗎');

    if (isConfirm) handleRemoveItemFromCart(id);
  }

  return (
    <div className={styles['cart']}>
      {cart.map((item) => (
        <div className={styles['cart__item']}>
          <div
            className={styles['thumbnail']}
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          ></div>
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div className={styles['functionality']}>
            <div className={styles['amount']}>
              <div>
                <AiOutlineMinus
                  onClick={() => handleEditAmount(item.id, 'minus')}
                />
                <div className={styles['count']}>{item.amount} </div>
                <AiOutlinePlus
                  onClick={() => handleEditAmount(item.id, 'plus')}
                />
              </div>
            </div>
          </div>

          <div className={styles['price']}>${item.price * item.amount}</div>
          <div
            className={styles['delete']}
            onClick={() => handleRemoveItem(item.id)}
          >
            刪除
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
