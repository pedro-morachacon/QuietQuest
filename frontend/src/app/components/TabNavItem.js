import React from "react";
import "../css/map.css";

const TabNavItem = ({ id, title, activeTab, onTabChange, imageSrc }) => {
 
 const handleClick = () => {
  onTabChange(id);
 };
 
return (
   <div><li onClick={handleClick} className={activeTab === id ? "active" : ""}>
    <div className="within-tab-text"> { title }</div>
    <div className="within-tab-image">  {imageSrc && <img className={"tab-icon"} src={imageSrc} alt={title} />} </div>
   </li>

   <style jsx>{`



      `}</style>
   </div>
 );
};
export default TabNavItem;
