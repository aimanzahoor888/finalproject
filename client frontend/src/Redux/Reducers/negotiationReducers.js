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

export const negotiationInitiateReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIATE_NEGOTIATION_REQUEST:
            return { loading: true };
        case INITIATE_NEGOTIATION_SUCCESS:
            return { loading: false, success: true, negotiation: action.payload };
        case INITIATE_NEGOTIATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const negotiationRespondReducer = (state = {}, action) => {
    switch (action.type) {
        case RESPOND_NEGOTIATION_REQUEST:
            return { loading: true };
        case RESPOND_NEGOTIATION_SUCCESS:
            return { loading: false, success: true, negotiation: action.payload };
        case RESPOND_NEGOTIATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const negotiationDetailsReducer = (state = { negotiation: {} }, action) => {
    switch (action.type) {
        case GET_NEGOTIATION_DETAILS_REQUEST:
            return { loading: true, ...state };
        case GET_NEGOTIATION_DETAILS_SUCCESS:
            return { loading: false, negotiation: action.payload };
        case GET_NEGOTIATION_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const sellerNegotiationsReducer = (state = { negotiations: [] }, action) => {
    switch (action.type) {
        case GET_SELLER_NEGOTIATIONS_REQUEST:
            return { loading: true, negotiations: [] };
        case GET_SELLER_NEGOTIATIONS_SUCCESS:
            return { loading: false, negotiations: action.payload };
        case GET_SELLER_NEGOTIATIONS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const buyerNegotiationsReducer = (state = { negotiations: [] }, action) => {
  switch (action.type) {
    case GET_BUYER_NEGOTIATIONS_REQUEST:
      return { loading: true, negotiations: [] };
    case GET_BUYER_NEGOTIATIONS_SUCCESS:
      return { loading: false, negotiations: action.payload };
    case GET_BUYER_NEGOTIATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};