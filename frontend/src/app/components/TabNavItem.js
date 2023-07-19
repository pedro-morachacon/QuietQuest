import React from "react";
const TabNavItem = ({ id, title, activeTab, onTabChange }) => {
 
 const handleClick = () => {
  onTabChange(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
     { title }
   </li>
 );
};
export default TabNavItem;