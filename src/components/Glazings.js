import React from 'react';


function Glazing(props) {
    const glazings = [
        { option:"Keep Original", adaption: 0},
        { option:"Sugar Milk", adaption: 0},
        { option:"Vanilla Milk", adaption: 0.5},
        { option:"Double Chocolate", adaption: 1.5},
      ];

    const handleGlazingChanges = (e) => {
        // Update the current glazing
        glazings.forEach( glaze => {
            if(glaze.option.toLocaleLowerCase() == e.target.value.toLocaleLowerCase()){
                props.setGlazing(glaze.option);
            }
            }
        )
      };

    return (
        <select className="dropdown" onChange={(e) => {handleGlazingChanges(e)}}>
            <option value="Keep original">Keep original</option>
            <option value="Sugar milk">Sugar milk</option>
            <option value="Vanilla milk">Vanilla milk</option>
            <option value="Double chocolate">Double chocolate</option>
        </select>
    );
}

export default Glazing;
