import axios from 'axios';
import {
    INITIATE_NEGOTIATION_REQUEST,
    INITIATE_NEGOTIATION_SUCCESS,
    INITIATE_NEGOTIATION_FAIL,
    RESPOND_NEGOTIATION_REQUEST,
    RESPOND_NEGOTIATION_SUCCESS,
    RESPOND_NEGOTIATION_FAIL,
    GET_NEGOTIATION_DETAILS_REQUEST,
    GET_NEGOTIATION_DETAILS_SUCCESS,
    GET_NEGOTIATION_DETAILS_FAIL,
    GET_SELLER_NEGOTIATIONS_REQUEST,
    GET_SELLER_NEGOTIATIONS_SUCCESS,
    GET_SELLER_NEGOTIATIONS_FAIL,
    GET_BUYER_NEGOTIATIONS_REQUEST,
  GET_BUYER_NEGOTIATIONS_SUCCESS,
  GET_BUYER_NEGOTIATIONS_FAIL,
} from '../Constants/negotiationConstants';
import { URL } from '../Url';

export const initiateNegotiation = (productId, initialPrice) => async (dispatch, getState) => {
    try {
        dispatch({ type: INITIATE_NEGOTIATION_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${URL}/api/negotiations/initiate`, { productId, initialPrice }, config);

        dispatch({ type: INITIATE_NEGOTIATION_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({
            type: INITIATE_NEGOTIATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};

export const respondNegotiation = (negotiationId, status, counterPrice) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESPOND_NEGOTIATION_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${URL}/api/negotiations/respond/${negotiationId}`, { status, counterPrice }, config);

        dispatch({ type: RESPOND_NEGOTIATION_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({
            type: RESPOND_NEGOTIATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};

export const getNegotiationDetails = (negotiationId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_NEGOTIATION_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${URL}/api/negotiations/${negotiationId}`, config);

        dispatch({ type: GET_NEGOTIATION_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_NEGOTIATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getSellerNegotiations = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_SELLER_NEGOTIATIONS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${URL}/api/negotiations/seller`, config);

        dispatch({ type: GET_SELLER_NEGOTIATIONS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_SELLER_NEGOTIATIONS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const getBuyerNegotiations = () => async (dispatch, getState) => {
  try {
      dispatch({ type: GET_BUYER_NEGOTIATIONS_REQUEST });

      const { userLogin: { userInfo } } = getState();

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          },
      };

      const { data } = await axios.get(`${URL}/api/negotiations/buyer`, config);

      dispatch({ type: GET_BUYER_NEGOTIATIONS_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type: GET_BUYER_NEGOTIATIONS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
  }
};
