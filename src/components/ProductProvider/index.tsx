import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../api/products';
import { authContext } from '../../context/authContext';
import { Provider } from '../../context/productContext';

type Props = {
  children: ReactNode;
};

export interface Cart extends Product {
  amount: number;
}

const ProductProvider = ({ children }: Props) => {
  const { isAuth } = useContext(authContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart[]>([]);

  function handleAddCart(product: Product, amount: number) {
    if (!isAuth) {
      alert('請先登入會員！');
      return navigate('/shopping-cart-demo/login');
    }

    const tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === product.id);
    const isItemAlreadyInCart = index > -1;
    alert('商品已加入到購物車！');

    if (isItemAlreadyInCart) {
      tempCart[index].amount = tempCart[index].amount + amount;
      setCart(tempCart);
      return;
    } else {
      setCart([...cart, { ...product, amount }]);
      return;
    }
  }

  function handleRemoveItemFromCart(id: number) {
    const tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === id);
    tempCart.splice(index, 1);
    const isConfirmRemove = window.confirm('確定要把此商品從購物車中移除嗎？');
    if (isConfirmRemove) setCart(tempCart);
  }

  function handleClearCart() {
    setCart([]);
  }

  function handleEditAmount(id: number, action: 'plus' | 'minus') {
    const tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === id);
    const targetAmount = tempCart[index].amount;

    switch (action) {
      case 'plus':
        tempCart[index].amount++;
        setCart(tempCart);
        return;
      case 'minus':
        if (targetAmount > 1) {
          tempCart[index].amount--;
          setCart(tempCart);
          return;
        } else {
          handleRemoveItemFromCart(id);
          return;
        }
    }
  }

  function calculateDiscountedPrice(
    price: number,
    discountPercentage: number,
  ): number {
    const discount = Math.round(100 - discountPercentage) / 10;
    const discountedPrice = Math.floor((price * discount) / 10);
    return discountedPrice;
  }

  function calculateTotalPrice() {
    const initialValue = 0;
    const totalPrice = cart
      .map(
        (item) =>
          calculateDiscountedPrice(item.price, item.discountPercentage) *
          item.amount,
      )
      .reduce((a, b) => a + b, initialValue);
    return totalPrice || 0;
  }

  const value = {
    cart,
    handleAddCart,
    handleRemoveItemFromCart,
    handleClearCart,
    handleEditAmount,
    calculateDiscountedPrice,
    calculateTotalPrice,
  };
  return <Provider value={value}>{children}</Provider>;
};

export default ProductProvider;
