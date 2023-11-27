import React from 'react';
import Product from './Product';



function ProductList(props) {

  return (
    <>
      <div className="row">
        {props.products.map((product) => (
          <Product 
            key={product.id}
            count = {props.count} 
            glazing = {props.glazing} 
            imageSrc = {product.imageSrc}
            product={product} 
            setCount = {props.setCount} 
            setType = {props.setType} 
            setGlaze = {props.setGlaze} 
            setSize = {props.setSize} 
            setTotalPrice = {props.setPrice} 
            setCopy = {props.setCopy}
            setCart = {props.setCart}
            size = {props.size} 
            timer = {props.timer}
            totalPrice = {props.price} 
          />
        ))}
      </div>
      {(props.products.length == 0) && (
          <h2 className="reminder">No match found!</h2>
        )
        }
    </>
  );
}

export default ProductList;

