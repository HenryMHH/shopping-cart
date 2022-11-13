import React, { useContext, useEffect, useState } from 'react';
import { getOrders, Order as OrderType } from '../../api/orders';
import { authContext } from '../../context/authContext';
import { productContext } from '../../context/productContext';
import { auth } from '../../firebase';
import styles from './styles.module.scss';

type Props = {};

const Order = (props: Props) => {
  const { isAuth } = useContext(authContext);
  const { calculateDiscountedPrice } = useContext(productContext);

  const [orders, setOrders] = useState<OrderType[]>([]);

  async function fetchOrders(uid: string) {
    const result = await getOrders(uid);
    setOrders(result);
  }

  useEffect(() => {
    if (isAuth && auth.currentUser) {
      fetchOrders(auth.currentUser.uid);
    }
  }, [isAuth]);

  function getNormalizedDate(date: Date) {
    return date.toISOString().split('T').shift();
  }

  return (
    <div className={styles['container']}>
      {orders.map((item) => (
        <div key={item.createdAt.toString()} className={styles['order']}>
          {item.cart.map((i) => (
            <div key={i.id} className={styles['order__item']}>
              <div
                className={styles['thumbnail']}
                style={{ backgroundImage: `url(${i.thumbnail})` }}
              ></div>
              <div className={styles['merchant']}>
                <div className={styles['title']}>{i.title}</div>
                <div className={styles['amount']}>x{i.amount}</div>
              </div>
              <div className={styles['total']}>
                {i.amount *
                  calculateDiscountedPrice(i.price, i.discountPercentage)}
              </div>
            </div>
          ))}

          <div className={styles['order__footer']}>
            <div className={styles['timestamp']}>
              訂單日期: {getNormalizedDate(item.createdAt.toDate())}
            </div>

            <div className={styles['order__price']}>
              訂單金額: {item.totalPrice}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
