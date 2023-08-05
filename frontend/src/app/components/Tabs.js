
import React from 'react';
import TabNavItem from './TabNavItem';  // ensure you've imported TabNavItem

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className='Tabs'>
        {/* Tab navigation */}
        <ul className="nav">
            <TabNavItem title="Map" id="map-only" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./map.svg" activeImageSrc="./map-active.svg" />
            <TabNavItem title="Noise" id="noise" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./noise.svg" activeImageSrc="./noise-active.svg" />
            <TabNavItem title="Crowds" id="crowds" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./people.svg" activeImageSrc="./people-active.svg" />
            <TabNavItem title="Both" id="both" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./both.svg" activeImageSrc="./both-active.svg" />
        </ul>
        <div className="outlet">
           
        </div>
    </div>
  );
};
 
export default Tabs;