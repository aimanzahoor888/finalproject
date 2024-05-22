import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [pageCount, setPageCount] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setCategory(product.category || "");
        setType(product.type || "");
        setSize(product.size || "");
        setColor(product.color || "");
        setAuthor(product.author || "");
        setPublicationYear(product.publicationYear || "");
        setPageCount(product.pageCount || "");
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        category,
        type,
        size,
        color,
        author,
        publicationYear,
        pageCount,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_countInStock" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_countInStock"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Category</label>
                        <select
                          className="form-control"
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="clothes">Clothes</option>
                          <option value="books">Books</option>
                          <option value="bags">Bags</option>
                          <option value="jewelry">Jewelry</option>
                          <option value="watches">Watches</option>
                          <option value="belts">Belts</option>
                          <option value="sunglasses">Sunglasses</option>
                          <option value="wall-art">Wall Art</option>
                          <option value="vases">Vases</option>
                          <option value="stationary">Stationary</option>
                          <option value="dolls">Dolls</option>
                          <option value="educational-toys">Educational Toys</option>
                          <option value="puzzles">Puzzles</option>
                          <option value="board-games">Board Games</option>
                        </select>
                      </div>
                      {category === 'clothes' && (
                        <>
                          <div className="mb-4">
                            <label className="form-label">Type</label>
                            <select
                              className="form-control"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="women">Women</option>
                              <option value="men">Men</option>
                              <option value="children">Children</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Size</label>
                            <input
                              type="text"
                              placeholder="e.g., XS, S, M, L or in meters, inches"
                              className="form-control"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Color</label>
                            <input
                              type="color"
                              className="form-control"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      {category === 'books' && (
                        <>
                          <div className="mb-4">
                            <label className="form-label">Author</label>
                            <input
                              type="text"
                              placeholder="Author name (optional)"
                              className="form-control"
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Publication Year</label>
                            <input
                              type="number"
                              placeholder="Publication year (optional)"
                              className="form-control"
                              value={publicationYear}
                              onChange={(e) => setPublicationYear(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Page Count</label>
                            <input
                              type="number"
                              placeholder="Page count (optional)"
                              className="form-control"
                              value={pageCount}
                              onChange={(e) => setPageCount(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <input className="form-control mt-3" type="file" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
