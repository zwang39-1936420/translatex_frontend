import React, { useState, useEffect } from 'react';
import Glazing from './Glazings';
import PackSize from './PackSize';


function Product({ imageSrc, product, totalPrice, count, size, timer, glazing, setType, setGlaze, setSize, setTotalPrice, setCount, setCopy, setCart}) {

  const glazings = [
    { option:"Keep Original", adaption: 0},
    { option:"Sugar Milk", adaption: 0},
    { option:"Vanilla Milk", adaption: 0.5},
    { option:"Double Chocolate", adaption: 1.5},
  ];

  const pack_size = [
    { option:"1", adaption: 1},
    { option:"3", adaption: 3},
    { option:"6", adaption: 5},
    { option:"12", adaption: 10},
  ];

  const translator = (number) => {
    let temp = 0.0; 
    pack_size.forEach( pack => {
      if(pack.adaption == number){
        temp = pack.option;
      }
    })
    return (temp);
  };

  const [price, setPrice]= useState(product.price);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  const [currentPackSize, setCurrentPackSize] = useState(1);
  const [currentGlazing, setCurrentGlazing] = useState("Keep Original");

  const toggleReminder = () => {
    setTotalPrice((parseFloat(totalPrice) + parseFloat(price)).toFixed(2));
    setGlaze(currentGlazing);
    setSize(currentPackSize);
    setCopy(price);
    setCount(count+1);
    timer();
    setType(product.type);
    const newElement = { imageSrc: imageSrc, type: product.type, glazing: currentGlazing, size: translator(currentPackSize), price: price}; 
    setCart(prevArray => [...prevArray, newElement]);
  };

  useEffect(() => {
    // This code runs after each render, including when state changes
    let temp = 0.0; 
    glazings.forEach( glaze => {
        if(glaze.option.toLocaleLowerCase() == currentGlazing.toLocaleLowerCase()){
          temp = glaze.adaption;
        }
        }
    )
    setPrice((currentPackSize * (temp + product.price)).toFixed(2));
    }, [currentGlazing]);

  useEffect(() => {
    // This code runs after each render, including when state changes
    glazings.forEach( glaze => {
      if(glaze.option.toLowerCase() == currentGlazing.toLowerCase()){
        setCurrentPackSize(currentPackSize);
        setPrice((currentPackSize * (glaze.adaption  + product.price)).toFixed(2));
      }
    })    
  }, [currentPackSize]);

  return (
    <section className="product">
      <img src={product.imageSrc} alt="Product 1"/>
      <h2>{product.type} Cinnamon Roll</h2>
      <div className = "desc">
        <div className = "left-sec">
          <p>Glazing:</p>
        </div>

      
        <div className = "right-sec">
          <Glazing 
            setGlazing = {setCurrentGlazing} 
            setPrice = {setPrice} 
            price = {price} 
            position = {product} 
            size = {size}/>
        </div>
      </div>

      <div className = "desc">
        <div className = "left-sec">
          <p>Pack size:</p>
        </div>
        <PackSize 
            setSize = {setCurrentPackSize} 
            setPrice = {setPrice} 
            price = {price} 
            glazing = {glazing} 
            position = {product} 
          />
      </div>

      <div className = "add-to-cart">
        <div className = "left-sec">
          <p>${price}</p>
        </div>

        <div className = "right-sec">
          <button onClick={toggleReminder}>Add to Cart</button>
        </div>
      </div>

    </section>
  );
}

export default Product;
