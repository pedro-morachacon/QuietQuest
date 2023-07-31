
import React from 'react';
import TabNavItem from './TabNavItem';  // ensure you've imported TabNavItem

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className='Tabs'>
        {/* Tab navigation */}
        <ul className="nav">
            <TabNavItem title="Map" id="map-only" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img922/1219/rTg6mE.png"/>
            <TabNavItem title="Noise" id="noise" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img922/2038/gg5i7n.png"/>
            <TabNavItem title="Crowds" id="crowds" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img923/5407/1avNiM.png"/>
            <TabNavItem title="Both" id="both" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img924/8051/NLl8cL.png"/>
        </ul>
        <div className="outlet">
           
        </div>
    </div>
  );
};
 
export default Tabs;