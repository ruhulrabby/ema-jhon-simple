import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewAllItem from '../ReviewAllItem/ReviewAllItem';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setorderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setorderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    } 

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

    let thankYou;
    if(orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>;
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewAllItem key= {pd.key}
                        removeProduct = {removeProduct} product= {pd} ></ReviewAllItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;