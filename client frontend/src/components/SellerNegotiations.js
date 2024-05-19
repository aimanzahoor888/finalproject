import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerNegotiations, respondNegotiation } from '../Redux/Actions/negotiationActions';
import Loading from './LoadingError/Loading';
import Message from './LoadingError/Error';

const SellerNegotiations = ({ productId }) => {
    const dispatch = useDispatch();
    const [counterOffers, setCounterOffers] = useState({});

    const sellerNegotiations = useSelector((state) => state.sellerNegotiations);
    const { loading, error, negotiations = [] } = sellerNegotiations;

    const respondNegotiationState = useSelector((state) => state.negotiationRespond);
    const { success: successRespond } = respondNegotiationState;

    useEffect(() => {
        dispatch(getSellerNegotiations());
    }, [dispatch, successRespond]);

    const handleResponse = (negotiationId, status, counterPrice) => {
        dispatch(respondNegotiation(negotiationId, status, counterPrice));
    };

    const handleCounterOfferChange = (negotiationId, value) => {
        setCounterOffers({ ...counterOffers, [negotiationId]: value });
    };

    const filteredNegotiations = negotiations.filter(negotiation => negotiation.productId._id === productId);

    return (
        <div className="negotiations">
           
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div>
                    {filteredNegotiations.map(negotiation => (
                        <div key={negotiation._id} className="negotiation">
                           
                            <p>Initial Price: {negotiation.initialPrice}</p>
                            <p>Status: {negotiation.status}</p>
                            
                            {negotiation.status === 'pending' && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleResponse(negotiation._id, 'accepted', counterOffers[negotiation._id])}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleResponse(negotiation._id, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                            {negotiation.status === 'accepted' && (
                                <div>
                                    <p>Accepted Price: {negotiation.finalPrice || negotiation.counterPrice}</p>
                                    <br></br>
                                </div>
                            )}
                            {negotiation.status === 'rejected' && (
                                <div>
                                    <p>Rejected Price: {negotiation.initialPrice}</p>
                                    <br></br>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerNegotiations;
//<p>Product: {negotiation.productId.name}</p>
//<p>Buyer: {negotiation.buyerId.name} ({negotiation.buyerId.email})</p>