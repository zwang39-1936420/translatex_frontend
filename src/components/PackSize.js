import React, {useState} from 'react';


function PackSize(props) {

    const slice = props.position.type.slice(0, 3);
    const shortName = "set-" + slice.toLowerCase();
    const shortIdOne = "radio-" + slice.toLowerCase() + "-1";
    const shortIdThree = "radio-" + slice.toLowerCase() + "-3";
    const shortIdSix = "radio-" + slice.toLowerCase() + "-6";
    const shortIdTwelve = "radio-" + slice.toLowerCase() + "-12";

    const handlePackSizeChanges = (e) => {
        // Update the current glazing
        props.setSize(e.target.value);
      };

    const [selectedOption, setSelectedOption] = useState("1"); // Set the default selected option

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (

    <ul className="right-sec" onChange={(e) => handlePackSizeChanges(e)}>
        <li >  
                <input type="radio" name={shortName} value="1"  onChange={handleOptionChange} id= {shortIdOne}/>
                <label className={selectedOption === "1" ? "checked":""} htmlFor={shortIdOne}> 1 </label>
        </li>
        <li className={selectedOption === "3" ? "checked":""} >
                <input type="radio" name={shortName} value="3"  onChange={handleOptionChange} id= {shortIdThree}/> 
                <label htmlFor={shortIdThree}> 3 </label>
        </li>
        <li className={selectedOption === "5" ? "checked":""} >
                <input type="radio" name={shortName} value="5"  onChange={handleOptionChange} id= {shortIdSix}/>
                <label htmlFor={shortIdSix}>6</label>
        </li>
        <li className={selectedOption === "10" ? "checked":""} >
                <input type="radio" name={shortName} value="10" onChange={handleOptionChange} id= {shortIdTwelve}/>
                <label htmlFor={shortIdTwelve}> 12 </label>
        </li>
    </ul>
  );
}

export default PackSize;
