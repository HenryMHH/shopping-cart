import React, { useContext } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { setOrder } from '../../api/orders';
import Button from '../../components/Button';
import { productContext } from '../../context/productContext';
import { auth } from '../../firebase';
import styles from './styles.module.scss';

const Cart = () => {
  const {
    cart,
    handleEditAmount,
    handleRemoveItemFromCart,
    calculateDiscountedPrice,
    calculateTotalPrice,
    handleClearCart,
  } = useContext(productContext);

  function handleRemoveItem(id: number) {
    handleRemoveItemFromCart(id);
  }

  function handleSetOrder() {
    if (!auth.currentUser || cart.length <= 0) {
      return;
    }
    const totalPrice = calculateTotalPrice();
    setOrder(auth.currentUser, cart, totalPrice, handleClearCart);
  }

  return (
    <div className={styles['cart']}>
      <div className={styles['header']}>
        <div className={styles['header__merchant']}>商品</div>
        <div className={styles['header__price']}>單價</div>
        <div className={styles['header__amount']}>數量</div>
        <div className={styles['header__total']}>總計</div>
        <div className={styles['header__delete']}>操作</div>
      </div>
      {cart.map((item) => (
        <div className={styles['cart__item']} key={item.id}>
          <div className={styles['merchant']}>
            <div
              className={styles['thumbnail']}
              style={{ backgroundImage: `url(${item.thumbnail})` }}
            ></div>
            <div className={styles['title']}>{item.title}</div>
          </div>

          <div className={styles['price']}>
            <div className={styles['price__original']}>${item.price}</div>
            <div className={styles['price__discounted']}>
              ${calculateDiscountedPrice(item.price, item.discountPercentage)}
            </div>
          </div>
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

          <div className={styles['total']}>
            $
            {calculateDiscountedPrice(item.price, item.discountPercentage) *
              item.amount}
          </div>
          <div
            className={styles['delete']}
            onClick={() => handleRemoveItem(item.id)}
          >
            刪除
          </div>
        </div>
      ))}

      <div className={styles['footer']}>
        <div className={styles['total']}>
          總金額({cart.length}個商品): <span>${calculateTotalPrice()}</span>
        </div>

        <Button onClick={handleSetOrder} className={styles['button']}>
          買單
        </Button>
      </div>
    </div>
  );
};

export default Cart;
