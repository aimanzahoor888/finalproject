import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  SELLER_REVIEWS_REQUEST,
  SELLER_REVIEWS_SUCCESS,
  SELLER_REVIEWS_FAIL,
  PRODUCT_RECOMMENDATIONS_REQUEST,
  PRODUCT_RECOMMENDATIONS_SUCCESS,
  PRODUCT_RECOMMENDATIONS_FAIL,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";
//import { URL } from "../../components/Url";
import { URL } from "../Url";



// PRODUCT LIST
export const listProduct = (keyword = '', pageNumber = '', filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Construct query parameters for filters
    const filterQuery = Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join('&');

    const { data } = await axios.get(
      `${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&${filterQuery}`
    );

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`${URL}/api/products/${productId}/review`, review, config);
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

// FETCH SELLER REVIEWS
export const listSellerReviews = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_REVIEWS_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/seller/${sellerId}/reviews`);
    dispatch({ type: SELLER_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = (
  name, price, description, image, countInStock, category, type, size, color, author, publicationYear, pageCount, quality
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${URL}/api/products/`,
      { name, price, description, image, countInStock, category, type, size, color, author, publicationYear, pageCount, quality },
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listRecommendedProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_RECOMMENDATIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/products/recommendations`, config);

    dispatch({ type: PRODUCT_RECOMMENDATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_RECOMMENDATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};