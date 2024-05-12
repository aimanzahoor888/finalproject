import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

 

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
