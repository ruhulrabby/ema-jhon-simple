import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewAllItem from '../ReviewAllItem/ReviewAllItem';

const Review = () => {

    const [cart, setCart] = useState([]);

    useEffect(() =>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts =  productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])
    return (
        <div>
            <h2>Cart Items: {cart.length}</h2>
            {
                cart.map(pd => <ReviewAllItem key= {pd.key} product= {pd} ></ReviewAllItem>)
            }
            
            
            
        </div>
    );
};

export default Review;