import React, { ReactNode, useState } from 'react';
import { Product } from '../../api/products';
import { Provider } from '../../context/productContext';

type Props = {
  children: ReactNode;
};

export interface Cart extends Product {
  amount: number;
}

const ProductProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<Cart[]>([]);

  function handleAddCart(product: Product, amount: number) {
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
    tempCart.splice(index);
    setCart(tempCart);
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

  function calculatePrice(price: number, discountPercentage: number): number {
    const discount = Math.round(100 - discountPercentage) / 10;
    const discountedPrice = Math.floor((price * discount) / 10);
    return discountedPrice;
  }

  const value = {
    cart,
    handleAddCart,
    calculatePrice,
    handleRemoveItemFromCart,
    handleEditAmount,
  };
  return <Provider value={value}>{children}</Provider>;
};

export default ProductProvider;
