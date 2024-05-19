import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyerNegotiations } from '../Redux/Actions/negotiationActions';
import Loading from './LoadingError/Loading';
import Message from './LoadingError/Error';

const BuyerNegotiations = ({ productId }) => {
    const dispatch = useDispatch();

    const buyerNegotiations = useSelector((state) => state.buyerNegotiations);
    const { loading, error, negotiations = [] } = buyerNegotiations;

    useEffect(() => {
        dispatch(getBuyerNegotiations());
    }, [dispatch]);

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
                            
                            {negotiation.counterPrice && <p>Counter Price: {negotiation.counterPrice}</p>}
                            <br></br>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyerNegotiations;

//<p>Product: {negotiation.productId.name}</p>
//<p>Seller: {negotiation.sellerId.name} ({negotiation.sellerId.email})</p>