import React from 'react';

function ProductInCart(props) {

  return (
    
    <section className="product cart">
          <img src={props.imageSrc} alt="Product 1"/>
          <p className = "cart-headline"> {props.type} cinnamon roll</p>
          <p>{props.glazing}</p>
          <p>Pack of {props.packSize}</p>
          <br></br>
          <p className='cart-display'>${props.currentPrice}</p>

          {/* This is the is the state update function that updates the [] in Index */}
          <button onClick={() => {props.removeItem(props.id)}}>Remove</button>
    </section>

    
  );
}

export default ProductInCart;
