import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetails, listSellerReviews } from "../Redux/Actions/ProductActions";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import { initiateNegotiation, respondNegotiation, getNegotiationDetails } from "../Redux/Actions/negotiationActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import Message from "./../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import moment from "moment";
import { Link } from "react-router-dom";

const SingleProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [negotiationPrice, setNegotiationPrice] = useState(0);
    const [counterOffer, setCounterOffer] = useState(0);
    const [negotiationId, setNegotiationId] = useState(null);
    const [showNegotiationInput, setShowNegotiationInput] = useState(false);

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
            console.log("Negotiation initiated with ID:", data._id);
        } catch (error) {
            console.error("Error initiating negotiation:", error);
        }
    };

    const respondNegotiate = (status, counterPrice) => {
        if (negotiationId) {
            dispatch(respondNegotiation(negotiationId, status, counterPrice));
        } else {
            console.error("Negotiation ID is not defined");
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
                                    <div className="posted-by">
                                        <h2>Posted by: {product.user.name}</h2>
                                        {product.user.isTrustedSeller && (
                                            <span className="trusted-seller-badge">Trusted Seller</span>
                                        )}
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
                                                        <span>{product?.color}</span>
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
                                        {product?.countInStock > 0 && (
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
                                                    className="round-black-btn"
                                                >
                                                    Add To Cart
                                                </button>
                                                {/* Negotiate Section for Buyers */}
                                                {userInfo && userInfo._id !== product?.user?._id && (
                                                    <div>
                                                        <h6>Negotiate</h6>
                                                        {!showNegotiationInput ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowNegotiationInput(true)}
                                                            >
                                                                Negotiate
                                                            </button>
                                                        ) : (
                                                            <div>
                                                                <input
                                                                    type="number"
                                                                    value={negotiationPrice}
                                                                    onChange={(e) => setNegotiationPrice(e.target.value)}
                                                                    placeholder="Enter your offer"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={initiateNegotiate}
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {negotiationId && <p>Pending</p>}
                                            </>
                                        )}
                                        {/* Negotiate Section for Sellers */}
                                        {userInfo &&
                                            userInfo._id === product?.user?._id &&
                                            negotiation && (
                                                <div>
                                                    <h6>Negotiation</h6>
                                                    <p>Status: {negotiation?.status}</p>
                                                    {negotiation?.status === "pending" && (
                                                        <div>
                                                            <input
                                                                type="number"
                                                                value={counterOffer}
                                                                onChange={(e) => setCounterOffer(e.target.value)}
                                                                placeholder="Counter offer"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => respondNegotiate("accepted", counterOffer)}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => respondNegotiate("rejected")}
                                                            >
                                                                Reject
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => respondNegotiate("countered", counterOffer)}
                                                            >
                                                                Counter
                                                            </button>
                                                        </div>
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
                                                row="3"
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
