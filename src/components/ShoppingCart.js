import React from "react";
import ProductInCart from './ProductInCart';

function ShoppingCart(props) {

    const calculateTotalPrice = () => {
        let temp = 0;
        props.product.forEach(element => {
            temp = temp + parseFloat(element.price);
        });
        return temp.toFixed(2);
    }
    // Function to add an element to the array
    const deleteElementInCart = ((indexToRemove) => {
        const updatedItems = [...props.product]; // Create a copy of the array
        updatedItems.splice(indexToRemove, 1);
        props.setCurrentCart(updatedItems);
        });

    return (
        <>
            <div className="column">
                <p className = "summary" id = "numberOfItems">Shopping Cart: ({props.product.length} items)</p>
                <p className = "summary" id = "totalPrice">Total: ${calculateTotalPrice()}</p>
            </div>
            <div className="row cart-row">
                {props.product.map((product, index) => (
                    <ProductInCart 
                        key = {index}
                        id = {index}
                        imageSrc = {product.imageSrc}
                        type = {product.type}
                        glazing = {product.glazing}
                        packSize = {product.size}
                        currentPrice = {product.price}
                        removeItem = {deleteElementInCart}
                    />
                ))}
            </div>
            {(props.product.length == 0) && (
                <h2 className="reminder">No items in cart!</h2>
            )
            }
        </>
        
    );
}

export default ShoppingCart;