
import React from 'react';
import TabNavItem from './TabNavItem';  // ensure you've imported TabNavItem

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className='Tabs'>
        {/* Tab navigation */}
        <ul className="nav">
            <TabNavItem title="Map" id="map-only" activeTab={activeTab} onTabChange={onTabChange}/>
            <TabNavItem title="Noise" id="noise" activeTab={activeTab} onTabChange={onTabChange}/>
            <TabNavItem title="Crowds" id="crowds" activeTab={activeTab} onTabChange={onTabChange}/>
            <TabNavItem title="Both" id="both" activeTab={activeTab} onTabChange={onTabChange}/>
        </ul>
        <div className="outlet">
           
        </div>
    </div>
  );
};
 
export default Tabs;