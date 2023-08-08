import React from "react";
import "../css/map.css";

const TabNavItem = ({
  id,
  title,
  activeTab,
  onTabChange,
  imageSrc,
  activeImageSrc,
}) => {
  const handleClick = () => {
    onTabChange(id);
  };

  // Use activeImageSrc if the tab is active, otherwise use imageSrc
  const imgSource = activeTab === id ? activeImageSrc : imageSrc;

  return (
    <div>
      <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
        <div className="within-tab-text"> {title}</div>
        <div className="within-tab-image">
          {" "}
          {imageSrc && (
            <img className={"tab-icon"} src={imgSource} alt={title} />
          )}{" "}
        </div>
      </li>
    </div>
  );
};
export default TabNavItem;
