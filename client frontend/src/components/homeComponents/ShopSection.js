import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination'; // Check if the path is correct
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import RecommendedProducts from './RecommendedProducts';

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [trustedSeller, setTrustedSeller] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber, { category, priceRange, trustedSeller }));
  }, [dispatch, keyword, pagenumber, category, priceRange, trustedSeller]);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceRangeChange = (e) => setPriceRange(e.target.value);
  const handleTrustedSellerChange = (e) => setTrustedSeller(e.target.checked);
  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                <div className="filter-container">
                  <div className="filter-toggle" onClick={toggleFilters}>
                    <span className="header-button">Filters</span>
                  </div>
                </div>
                <div className={`filters ${showFilters ? 'show' : ''}`}>
                  <div className="filter-header">
                    <h4>Filters</h4>
                    <button onClick={toggleFilters} className="close-btn">&times;</button>
                  </div>
                  <div className="filter-section">
                    <h5>By Price</h5>
                    <label><input type="radio" name="price" value="" onChange={handlePriceRangeChange} /> All Prices</label>
                    <label><input type="radio" name="price" value="0-400" onChange={handlePriceRangeChange} /> 0 - 400</label>
                    <label><input type="radio" name="price" value="400-800" onChange={handlePriceRangeChange} /> 400 - 800</label>
                    <label><input type="radio" name="price" value="800-1200" onChange={handlePriceRangeChange} /> 800 - 1200</label>
                    <label><input type="radio" name="price" value="1200-1600" onChange={handlePriceRangeChange} /> 1200 - 1600</label>
                    <label><input type="radio" name="price" value="1600-2000" onChange={handlePriceRangeChange} /> 1600 - 2000</label>
                    <label><input type="radio" name="price" value="2000+" onChange={handlePriceRangeChange} /> 2000 and above</label>
                  </div>
                  <div className="filter-section">
                    <h5>By Category</h5>
                    <label><input type="radio" name="category" value="" onChange={handleCategoryChange} /> All Categories</label>
                    <label><input type="radio" name="category" value="clothes" onChange={handleCategoryChange} /> Clothes</label>
                    <label><input type="radio" name="category" value="shoes" onChange={handleCategoryChange} /> Shoes</label>
                    <label><input type="radio" name="category" value="accessories" onChange={handleCategoryChange} /> Accessories</label>
                    <label><input type="radio" name="category" value="beauty" onChange={handleCategoryChange} /> Beauty</label>
                    <label><input type="radio" name="category" value="bags" onChange={handleCategoryChange} /> Bags</label>
                    <label><input type="radio" name="category" value="books" onChange={handleCategoryChange} /> Books</label>
                    <label><input type="radio" name="category" value="stationary" onChange={handleCategoryChange} /> Stationary</label>
                    <label><input type="radio" name="category" value="sunglasses" onChange={handleCategoryChange} /> Sunglasses</label>
                    <label><input type="radio" name="category" value="art" onChange={handleCategoryChange} /> Art</label>
                    <label><input type="radio" name="category" value="home-decor" onChange={handleCategoryChange} /> Home Decor</label>
                    <label><input type="radio" name="category" value="kitchenware" onChange={handleCategoryChange} /> Kitchenware</label>
                    <label><input type="radio" name="category" value="sports-outdoors" onChange={handleCategoryChange} /> Sports & Outdoors</label>
                    
                    {/* Add more categories as needed */}
                  </div>
                  <div className="filter-section">
                    <h5>Other</h5>
                    <label><input type="checkbox" checked={trustedSeller} onChange={handleTrustedSellerChange} /> Trusted Seller</label>
                  </div>
                </div>

                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    <h2 className="section-heading">{page === 1 ? 'Newly added items' : 'All items'}</h2>
                    {products.map((product) => (
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
                    ))}
                  </>
                )}
                <Pagination pages={pages} page={page} keyword={keyword ? keyword : ''} />
              </div>
              {userInfo && (
                <div className="shopcontainer row"> {/* Use the same class as the newly added items */}
                  <h2 className="section-heading">{'Recommended for You'}</h2>
                  <RecommendedProducts />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
