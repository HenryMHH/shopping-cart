import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Layout from './layout';
import Cart from './pages/Cart';
import Error from './pages/Error';
import LoginAndSignUp from './pages/LoginAndSignUp';
import ProductDetail from './pages/ProductDetail';
import AuthRoute from './router/AuthRoute';
import AuthProvider from './components/AuthProvider';
import Order from './pages/Order';
import ProductProvider from './components/ProductProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginAndSignUp />} />
              <Route path="/signUp" element={<LoginAndSignUp />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/" element={<AuthRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Order />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </Layout>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
