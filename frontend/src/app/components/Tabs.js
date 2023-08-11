
import React from 'react';
import TabNavItem from './TabNavItem';  // ensure you've imported TabNavItem

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className='Tabs'>
        {/* Tab navigation */}
        <ul className="nav">
            <TabNavItem title="Map" id="map-only" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img923/7396/udkZhs.png" activeImageSrc="https://imagizer.imageshack.com/img923/6056/HqJWf0.png" />
            <TabNavItem title="Noise" id="noise" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img924/5226/0cQw2A.png" activeImageSrc="https://imagizer.imageshack.com/img923/1011/TLvESe.png" />
            <TabNavItem title="Crowds" id="crowds" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img922/7509/b2QFJP.png" activeImageSrc="https://imagizer.imageshack.com/img924/6083/0nCBHV.png" />
            <TabNavItem title="Both" id="both" activeTab={activeTab} onTabChange={onTabChange} imageSrc="https://imagizer.imageshack.com/img922/8149/Rm8hMR.png" activeImageSrc="https://imagizer.imageshack.com/img924/6083/0nCBHV.png" />
        </ul>
        <div className="outlet">
           
        </div>
    </div>
  );
};
 
export default Tabs;