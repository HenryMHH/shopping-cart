import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail, Product } from '../../api/products';
import Button from '../../components/Button';
import { productContext } from '../../context/productContext';
import styles from './styles.module.scss';

const ProductDetail = () => {
  const [amount, setAmount] = useState<number>(1);
  const [productData, setProductData] = useState<Product>();
  const { handleAddCart, calculatePrice } = useContext(productContext);
  const params = useParams();
  const navigate = useNavigate();

  const fetchProductDetail = useCallback(
    async (id: string) => {
      try {
        const result = await getProductDetail(id);
        if (result.message) {
          throw result.message;
        }
        setProductData(result);
      } catch (error) {
        alert('找無此商品資訊');
        navigate('/products');
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (params.id) {
      fetchProductDetail(params.id);
    }
  }, [params, fetchProductDetail]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  function handleAddAmount(currentAmount: number, stock: number) {
    if (currentAmount >= stock) {
      return;
    }
    setAmount(currentAmount + 1);
  }

  function handleMinusAmount(currentAmount: number) {
    if (currentAmount === 1) {
      return;
    }
    setAmount(currentAmount - 1);
  }

  function handleGoBack() {
    window.history.back();
  }

  const discount = Math.round(100 - productData.discountPercentage) / 10;

  return (
    <div className={styles['container']}>
      <div className={styles['img']}>
        <div
          className={styles['img__box']}
          style={{
            backgroundImage: `url(${productData.images[0]})`,
          }}
        />
      </div>
      <div className={styles['info']}>
        <h1 className={styles['title']}>{productData.title}</h1>
        <div className={styles['rating']}>評價: {productData.rating}</div>
        <div className={styles['price']}>
          <div className={styles['price__original']}>${productData.price}</div>
          <div className={styles['price__discounted']}>
            ${calculatePrice(productData.price, productData.discountPercentage)}
          </div>
          <div className={styles['price__tag']}>{discount}折</div>
        </div>

        <div className={styles['description']}>
          <div>商品詳情:</div>
          {productData.description}
        </div>
        <div className={styles['functionality']}>
          <div className={styles['amount']}>
            <div>數量:</div>
            <div>
              <AiOutlineMinus onClick={() => handleMinusAmount(amount)} />
              <div className={styles['count']}>{amount} </div>
              <AiOutlinePlus
                onClick={() => handleAddAmount(amount, productData.stock)}
              />
              <div className={styles['stock']}>
                庫存還剩
                {productData.stock - amount}件
              </div>
            </div>
          </div>
          <div className={styles['add-cart']}>
            <Button
              onClick={() => {
                handleAddCart(productData, amount);
                setAmount(1);
              }}
              className={styles['add-cart__button']}
            >
              加入購物車
            </Button>
            <Button
              onClick={handleGoBack}
              displayType="cancel"
              className={styles['return-button']}
            >
              回前頁
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
