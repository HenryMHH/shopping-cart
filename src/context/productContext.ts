import { createContext } from 'react';
import { Product } from '../api/products';
import { Cart } from '../components/ProductProvider';

type ProductContext = {
  cart: Cart[];
  handleAddCart: (product: Product, amount: number) => void;
  calculateDiscountedPrice: (
    price: number,
    discountPercentage: number,
  ) => number;
  handleRemoveItemFromCart: (id: number) => void;
  handleEditAmount: (id: number, action: 'plus' | 'minus') => void;
  calculateTotalPrice: () => number;
  handleClearCart: () => void;
};

export const productContext = createContext({} as ProductContext);
export const { Provider } = productContext;
