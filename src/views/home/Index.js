import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import SearchBar from '../../components/SearchBar';

function Index() {
    const Rolls = [
        { id: 1, type: "Original", name: "Original Cinnamon Roll", price: 2.49, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/original-cinnamon-roll.jpg" },
        { id: 2, type: "Apple",name: "Apple Cinnamon Roll",  price: 3.49, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/apple-cinnamon-roll.jpg" },
        { id: 3, type: "Raisin",name: "Raisin Cinnamon Roll",  price: 2.99, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/raisin-cinnamon-roll.jpg" },
        { id: 4, type: "Walnut",name: "Walnut Cinnamon Roll",  price: 3.49, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/walnut-cinnamon-roll.jpg" },
        { id: 5, type: "Double-Chocolate",name: "Double-Chocolate Cinnamon Roll",  price: 3.99, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/double-chocolate-cinnamon-roll.jpg" },
        { id: 6, type: "Strawberry",name: "Strawberry Cinnamon Roll",  price: 3.99, glazing: "Keep Original", packSize: 1, imageSrc: "./assets/products/strawberry-cinnamon-roll.jpg" },
    ];

    const ifHasLocalStorage = () => {
        if(localStorage.getItem("cart")){
            console.log(JSON.parse(localStorage.getItem("cart")));
            return JSON.parse(localStorage.getItem("cart"));
        } 
        return [];
    }
    
    const [showReminder, setShowReminder] = useState(false);
    const [currentCart, setCurrentCart] = useState(ifHasLocalStorage());
    const [currentPackSize, setCurrentPackSize] = useState(1);
    const [currentGlazing, setCurrentGlazing] = useState("Keep Original");
    const [currentType, setCurrentType] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [copyCurrentPrice, setCopyCurrentPrice] = useState(0.0);
    const [currentCount, setCount] = useState(0.0);
    const [timerId, setTimerId] = useState(null);
    const [currentList, setFilteredItems] = useState(Rolls);



    const startTimer = () => {
        // Clear any existing timeout (if it exists)
        if (timerId) {
          clearTimeout(timerId);
        }
        setShowReminder(true);
        // Set a new timeout
        const newTimerId = setTimeout(() => {
            setShowReminder(false);
        }, 3000); // 3 seconds
    
        // Store the new timeout ID in state
        setTimerId(newTimerId);
      };

    useEffect (() => {
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(currentCart));
      }
      ,[currentCart])

    return (
        <div className="App">
            <Header 
                toggle={showReminder} 
                type={currentType} 
                size={currentPackSize} 
                glazing={currentGlazing} 
                price={totalPrice} 
                currentPrice = {copyCurrentPrice} 
                count={currentCount} 
                cart = {currentCart}
                setCurrentCart = {setCurrentCart}
            />
            <main>
                {/* Add state to control the list of product  */}
                <SearchBar 
                    items={Rolls}
                    setFilteredItems = {setFilteredItems} 
                /> 

                <ProductList 
                    products={currentList} 
                    size={currentPackSize} 
                    glazing={currentGlazing} 
                    price={totalPrice} 
                    count = {currentCount} 
                    setCount = {setCount} 
                    setType={setCurrentType} 
                    setGlaze={setCurrentGlazing} 
                    setSize={setCurrentPackSize} 
                    setPrice={setTotalPrice} 
                    setCopy={setCopyCurrentPrice} 
                    setCart = {setCurrentCart}
                    timer = {startTimer}
                />
            </main>
            <footer>
                <p>&copy; 2023 Bun Bun Bake Shop Website</p>
            </footer>
        </div>
    );

}

export default Index;