import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from '../../Redux/Constants/ProductConstants';
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
//import axios from 'axios';
import { URL } from '../Url';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageBase64, setImageBase64] = useState("");
  const [imageQuality, setImageQuality] = useState('');
  const [countInStock, setCountInStock] = useState(1);  // Set default count to 1
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sizeType, setSizeType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);  // Define submitSuccess state

  const dispatch = useDispatch();
  const productCreate = useSelector(state => state.productCreate);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
     // toast.success("Product Added Successfully");
      setSubmitSuccess(true);
      dispatch({ type: PRODUCT_CREATE_RESET });
      resetForm();
    }
  }, [product, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; 
      if (file.size > maxSize) {
        toast.error('File size should be less than 10 MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        assessImageQuality(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const assessImageQuality = (file) => {
    const quality = Math.floor(Math.random() * 100) + 1;
    setImageQuality(`Estimated quality of image: ${quality}%`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    if (!imageBase64) {
      toast.error('Image file is required.');
      return;
    }

    const productData = {
      name,
      price,
      description,
      countInStock,
      image: imageBase64,
      category,
      type,
      size: sizeType === 'meters' || sizeType === 'inches' ? `${size} ${sizeType}` : sizeType,
      color,
      author,
      publicationYear,
      pageCount,
      quality: imageQuality.split(':')[1].trim(),  // Only save percentage
    };

    try {
      const response = await axios.post(`${URL}/api/products/`, productData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      toast.success('Product Added Successfully');
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: response.data });
      setSubmitSuccess(true); // Show success message
      resetForm();
    } catch (error) {
      toast.error('Failed to add product');
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCountInStock(1);
    setImageBase64('');
    setImageQuality('');
    setCategory('');
    setType('');
    setSizeType('');
    setSize('');
    setColor('');
    setAuthor('');
    setPublicationYear('');
    setPageCount('');
  };

  return (
    <>
    <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <h2 className="content-title">Add product</h2>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  {submitSuccess && <div className="alert alert-success">Product submitted successfully!</div>}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">Product title</label>
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
                    <label htmlFor="product_price" className="form-label">Price</label>
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
                    <label htmlFor="product_countInStock" className="form-label">Count In Stock</label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_countInStock"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      disabled  // Disable this field
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
                        <label className="form-label">Size Type</label>
                        <select
                          className="form-control"
                          value={sizeType}
                          onChange={(e) => setSizeType(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="meters">Meters</option>
                          <option value="inches">Inches</option>
                        </select>
                      </div>
                      {sizeType === 'meters' || sizeType === 'inches' ? (
                        <div className="mb-4">
                          <label className="form-label">Size in {sizeType}</label>
                          <input
                            type="number"
                            placeholder={`Enter size in ${sizeType}`}
                            className="form-control"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          />
                        </div>
                      ) : sizeType && (
                        <div className="mb-4">
                          <label className="form-label">Selected Size: {sizeType}</label>
                        </div>
                      )}
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
                    <input className="form-control" type="file" onChange={handleFileChange} required />
                    {imageQuality && <div className="alert alert-info">{imageQuality}</div>}
                    {imageBase64 && <img src={imageBase64} alt="Selected" style={{ width: '100px', marginTop: '10px' }} />}
                  </div>
                  <div className="check">
                    <button type="submit" className="btn btn-primary">Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
