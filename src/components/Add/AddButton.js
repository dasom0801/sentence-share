import React from 'react';
import { NavLink } from 'react-router-dom';


const AddButton = () => {
  return ( 
    <NavLink className="add-button" to="/add">+</NavLink>
   );
}
 
export default AddButton;