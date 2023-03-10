import React, { useState } from "react";

function OPLSettings() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs); // TODO: Save to DB
  }

  return (
    <form className="user__profile" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Products</legend>
        <label>Number of Products:
          <input 
              type="number" 
              name="age" 
              value={inputs.age || ""} 
              onChange={handleChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Marketplaces</legend>
        <select value="mktplaces" onChange={handleChange}>
          <option value="Amazon">Amazon</option>
          <option value="Flipkart">Flipkart</option>
        </select>
      </fieldset>
      <input type="submit" />
    </form>
  );
}

export default OPLSettings;