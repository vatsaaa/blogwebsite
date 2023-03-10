import React, { useState } from 'react';

function Profile() {
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
      <label>OPL User:
        <input 
          type="text"
          name="username"
          className="opl__user"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>Email:
        <input 
            type="email" 
            name="email"
            id="opl_user_email" 
            value={inputs.email || ""} 
            onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default Profile;


// reference: https://www.w3schools.com/react/react_forms.asp