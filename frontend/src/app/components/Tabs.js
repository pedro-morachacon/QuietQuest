
import React from 'react';
import TabNavItem from './TabNavItem';  // ensure you've imported TabNavItem

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className='Tabs'>
        {/* Tab navigation */}
        <ul className="nav">
            <TabNavItem title="Map" id="map-only" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./map1.svg" />
            <TabNavItem title="Noise" id="noise" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./noise1.svg"/>
            <TabNavItem title="Crowds" id="crowds" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./people2.svg"/>
            <TabNavItem title="Both" id="both" activeTab={activeTab} onTabChange={onTabChange} imageSrc="./both7.svg"/>
        </ul>
        <div className="outlet">
           
        </div>
    </div>
  );
};
 
export default Tabs;