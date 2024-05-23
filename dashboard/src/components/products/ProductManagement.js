// ProductManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { URL } from '../../Redux/Url';


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    }
  }, [userInfo]);

  const fetchProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${URL}/api/products/all`, config);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleDisableProduct = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`${URL}/api/products/disable/${productId}`, {}, config);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error disabling product', error);
    }
  };

  const handleEnableProduct = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`${URL}/api/products/enable/${productId}`, {}, config);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error enabling product', error);
    }
  };

  return (
    <div className="management-section">
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <span>{product.name}</span>
            {product.status === 'inactive' ? (
              <button onClick={() => handleEnableProduct(product._id)}>Enable</button>
            ) : (
              <button onClick={() => handleDisableProduct(product._id)}>Disable</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
