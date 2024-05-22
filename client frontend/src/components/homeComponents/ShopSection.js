import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination'; // Check if the path is correct
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import RecommendedProducts from './RecommendedProducts';

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const location = useLocation();
  
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [trustedSeller, setTrustedSeller] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Read and respond to the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filtersOpen = queryParams.get('filters') === 'open';
    setShowFilters(filtersOpen);

    dispatch(listProduct(keyword, pagenumber, { category, priceRange, trustedSeller }));
  }, [dispatch, keyword, pagenumber, category, priceRange, trustedSeller, location.search]);

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
                    <span className="filter-badge">Filters</span>
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
                    <label><input type = "radio" name="category" value="clothes" onChange={handleCategoryChange} /> Clothes</label>
                    <label><input type="radio" name="category" value="books" onChange={handleCategoryChange} /> Books</label>
                    <label><input type="radio" name="category" value="bags" onChange={handleCategoryChange} /> Bags</label>
                    <label><input type="radio" name="category" value="jewelry" onChange={handleCategoryChange} /> Jewelry</label>
                    <label><input type="radio" name="category" value="watches" onChange={handleCategoryChange} /> Watches</label>
                    <label><input type="radio" name="category" value="belts" onChange={handleCategoryChange} /> Belts</label>
                    <label><input type="radio" name="category" value="sunglasses" onChange={handleCategoryChange} /> Sunglasses</label>
                    <label><input type="radio" name="category" value="wall-art" onChange={handleCategoryChange} /> Wall Art</label>
                    <label><input type="radio" name="category" value="vases" onChange={handleCategoryChange} /> Vases</label>
                    <label><input type="radio" name="category" value="stationary" onChange={handleCategoryChange} /> Stationary</label>
                    <label><input type="radio" name="category" value="dolls" onChange={handleCategoryChange} /> Dolls</label>
                    <label><input type="radio" name="category" value="educational-toys" onChange={handleCategoryChange} /> Educational Toys</label>
                    <label><input type="radio" name="category" value="puzzles" onChange={handleCategoryChange} /> Puzzles</label>
                    <label><input type="radio" name="category" value="board-games" onChange={handleCategoryChange} /> Board Games</label>
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
                <div className="shopcontainer row">
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
