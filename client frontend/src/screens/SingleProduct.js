import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails, listSellerReviews } from "../Redux/Actions/ProductActions";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import { initiateNegotiation, getNegotiationDetails } from "../Redux/Actions/negotiationActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import Message from "./../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import moment from "moment";
import { Link } from "react-router-dom";
import BuyerNegotiations from "./../components/BuyerNegotiations";
import SellerNegotiations from "./../components/SellerNegotiations";

const SingleProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [negotiationPrice, setNegotiationPrice] = useState(0);
    const [negotiationId, setNegotiationId] = useState(null);
    const [showNegotiationInput, setShowNegotiationInput] = useState(false);
    const [showNegotiationRequests, setShowNegotiationRequests] = useState(false);
    const [showBuyerNegotiations, setShowBuyerNegotiations] = useState(false);
    const [newNegotiationCount, setNewNegotiationCount] = useState(0);

    const productId = match.params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const sellerReviews = useSelector((state) => state.sellerReviews);
    const { reviews: sellerReviewsList, loading: sellerReviewsLoading } = sellerReviews;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { orders } = orderListMy;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productReviewCreate;

    const negotiationDetails = useSelector((state) => state.negotiationDetails);
    const { negotiation, loading: loadingNegotiation } = negotiationDetails;

    useEffect(() => {
        if (successCreateReview) {
            alert("Review Submitted");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        if (!product || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else if (product.user && product.user._id) {
            dispatch(listSellerReviews(product.user._id));
        }

        if (userInfo) {
            dispatch(listMyOrders());
        }

        if (product && product.negotiation && product.negotiation._id) {
            dispatch(getNegotiationDetails(product.negotiation._id));
            setNegotiationId(product.negotiation._id);
        }
    }, [dispatch, productId, successCreateReview, userInfo, product]);

    useEffect(() => {
        if (negotiationId) {
            dispatch(getNegotiationDetails(negotiationId));
        }
    }, [negotiationId, dispatch]);

    useEffect(() => {
        if (negotiation && negotiation.status === "pending") {
            setNewNegotiationCount(prevCount => prevCount + 1);
        }
    }, [negotiation]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        history.push(`/cart/${productId}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId, { rating, comment }));
    };

    const hasPurchased = () => {
        return orders && orders.some(order =>
            order.orderItems.some(item => item.product === productId && !item.isReviewed)
        );
    };

    const initiateNegotiate = async () => {
        try {
            const data = await dispatch(initiateNegotiation(product._id, negotiationPrice));
            setNegotiationId(data._id);  // Set negotiation ID from response
            setShowNegotiationInput(false);
            console.log("Negotiation initiated with ID:", data._id);
        } catch (error) {
            console.error("Error initiating negotiation:", error);
        }
    };

    const toggleNegotiationRequests = () => {
        setShowNegotiationRequests(prevState => !prevState);
        if (newNegotiationCount > 0) {
            setNewNegotiationCount(0);
        }
    };

    const toggleBuyerNegotiations = () => {
        setShowBuyerNegotiations(prevState => !prevState);
        if (newNegotiationCount > 0) {
            setNewNegotiationCount(0);
        }
    };

    return (
        <>
            <Header />
            <div className="container single-product">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                {product.user && (
                                    <div className="product-dtl">
                                        <div className="seller-info">
                                        <p className="seller-name">Posted by: {product.user.name}</p>
                                        {product.user.isTrustedSeller && (
                                            <span className="trusted-seller-badge">Trusted Seller</span>
                                        )}
                                    </div>
                                    </div>
                                )}
                                <div className="single-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                    </div>
                                    <p>{product.description}</p>
                                    <div className="product-count col-lg-7">
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Price</h6>
                                            <span>Rs.{product?.price}</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Status</h6>
                                            {product?.countInStock > 0 ? (
                                                <span>In Stock</span>
                                            ) : (
                                                <span>Unavailable</span>
                                            )}
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Category</h6>
                                            <span>{product?.category}</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Reviews</h6>
                                            <Rating
                                                value={product?.rating}
                                                text={`${product?.numReviews} reviews`}
                                            />
                                        </div>
                                        {product?.category === "clothes" && (
                                            <>
                                                {product?.type && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Type</h6>
                                                        <span>{product?.type}</span>
                                                    </div>
                                                )}
                                                {product?.size && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Size</h6>
                                                        <span>{product?.size}</span>
                                                    </div>
                                                )}
                                                {product?.color && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Color</h6>
                                                        <span>
                                                            <div
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: product.color
                                                                }}
                                                            ></div>
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {product?.category === "books" && (
                                            <>
                                                {product?.author && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Author</h6>
                                                        <span>{product?.author}</span>
                                                    </div>
                                                )}
                                                {product?.publicationYear && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Publication Year</h6>
                                                        <span>{product?.publicationYear}</span>
                                                    </div>
                                                )}
                                                {product?.pageCount && (
                                                    <div className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Page Count</h6>
                                                        <span>{product?.pageCount}</span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Estimated quality of image</h6>
                                            <span style={{ textAlign: "center" }}>{product?.quality}</span>
                                        </div>
                                        {userInfo && userInfo._id !== product?.user?._id && product?.countInStock > 0 && (
                                            <>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Quantity</h6>
                                                    <select
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product?.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={AddToCartHandle}
                                                    className="round-black-btn button-spacing"
                                                >
                                                    Add To Cart
                                                </button>
                                                {/* Negotiate Section for Buyers */}
                                                <div>
                                                    {showNegotiationInput ? (
                                                        <div>
                                                            <input
                                                                type="number"
                                                                value={negotiationPrice}
                                                                onChange={(e) =>
                                                                    setNegotiationPrice(e.target.value)
                                                                }
                                                                placeholder="Enter your offer"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={initiateNegotiate}
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNegotiationInput(true)}
                                                            className="round-black-btn button-spacing"
                                                        >
                                                            Negotiate
                                                        </button>
                                                    )}
                                                    {negotiationId && <p>Status: pending</p>}
                                                    <button 
                                                        className="round-black-btn button-spacing"
                                                        onClick={toggleBuyerNegotiations}
                                                    >
                                                        Negotiation Status
                                                    </button>
                                                    {showBuyerNegotiations && (
                                                        <BuyerNegotiations productId={productId} />
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {/* Negotiate Section for Sellers */}
                                        {userInfo && userInfo._id === product?.user?._id && (
                                            <div>
                                                {product?.countInStock > 0 && (
                                                    <button 
                                                        className="round-black-btn button-spacing"
                                                        onClick={toggleNegotiationRequests}
                                                    >
                                                        Negotiate Requests {newNegotiationCount > 0 && `(${newNegotiationCount})`}
                                                    </button>
                                                )}
                                                {showNegotiationRequests && (
                                                    <SellerNegotiations productId={productId} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-5">
                            <div className="col-md-6">
                                <h6 className="mb-3">REVIEWS</h6>
                                {product?.reviews.length === 0 && (
                                    <Message variant={"alert-info mt-3"}>No Reviews</Message>
                                )}
                                {product?.reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                    >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <span>{moment(review.createdAt).calendar()}</span>
                                        <div className="alert alert-info mt-3">
                                            {review.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <h6>WRITE A CUSTOMER REVIEW</h6>
                                <div className="my-4">
                                    {loadingCreateReview && <Loading />}
                                    {errorCreateReview && (
                                        <Message variant="alert-danger">
                                            {errorCreateReview}
                                        </Message>
                                    )}
                                </div>
                                {userInfo && hasPurchased() ? (
                                    <form onSubmit={submitHandler}>
                                        <div className="my-4">
                                            <strong>Rating</strong>
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div className="my-4">
                                            <strong>Comment</strong>
                                            <textarea
                                                rows="3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            ></textarea>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                disabled={loadingCreateReview}
                                                className="col-12 bg-black border-0 p-3 rounded text-white"
                                            >
                                                SUBMIT
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="my-3">
                                        <Message variant={"alert-warning"}>
                                            {userInfo ? (
                                                "You need to purchase the product to write a review"
                                            ) : (
                                                <>
                                                    Please{" "}
                                                    <Link to="/login">
                                                        <strong>Login</strong>
                                                    </Link>{" "}
                                                    to write a review
                                                </>
                                            )}
                                        </Message>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row my-5">
                            <div className="col-md-12">
                                <h6 className="mb-3">SELLER REVIEWS</h6>
                                {sellerReviewsLoading ? (
                                    <Loading />
                                ) : sellerReviewsList.length === 0 ? (
                                    <Message variant={"alert-info mt-3"}>No Reviews</Message>
                                ) : (
                                    sellerReviewsList.map((review) => (
                                        <div
                                            key={review._id}
                                            className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                        >
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <span>{moment(review.createdAt).calendar()}</span>
                                            <div className="alert alert-info mt-3">
                                                {review.comment}
                                            </div>
                                        </div>
                                    )))
                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SingleProduct;
