import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRecommendedProducts } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const RecommendedProducts = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recommendedProductsList = useSelector((state) => state.recommendedProductsList);
  const { loading, error, products } = recommendedProductsList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listRecommendedProducts());
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return null; // Do not render the component if the user is not logged in
  }

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col-lg-12 col-md-12 article">
            <div className="shopcontainer row">
              
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                products.map((product) => (
                  <div className="shop col-lg-4 col-md-6 col-sm-6" key={product._id}>
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>
                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>{product.name}</Link>
                        </p>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <h3>Rs.{product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
