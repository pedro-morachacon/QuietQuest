import React from "react";
import "../css/map.css";

const TabNavItem = ({ id, title, activeTab, onTabChange, imageSrc }) => {
 
 const handleClick = () => {
  onTabChange(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
     { title }
       {imageSrc && <img className={"tab-icon"} src={imageSrc} alt={title} />}
   </li>
 );
};
export default TabNavItem;
