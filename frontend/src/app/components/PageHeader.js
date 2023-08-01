import React, { useEffect, useState } from "react";
import FirebaseUserName from "./FirebaseUserName";
const PageHeader = ({  }) => {
return(
    <div className="page-header">    
    <div className="part">   
    <a href="/" className={"logo"}>
    <img
      src="/Logo1.png"
      alt="QuietQuest Logo"
      width="150"
      height="37.5"
    />
    </a>
    </div> 
    <div className="page-header-right">
    <div className="part">  
        <div className="weather">
            weather
            {/* Insert weather component here */}
        </div>
        </div>

        <div className="part"> 
        <div className="profile">       
        <div className={"user-image"}>
          <FirebaseUserName />
        </div>
        </div>
        </div>
        
        </div>
        <style jsx>{`
        .page-header {
            overflow: hidden;
            background-color: #394B56;
            padding: 20px 10px;
            width: 100%;
          }
        .page-header div.part {
            background-color: #394B56;
            float: left;
            color: black;
            text-align: center;
            text-decoration: none;
            font-size: 18px; 
            line-height: 25px;
            border-radius: 4px;
        }
        .page-header div.part:hover {
            background-color: #B8CBD6;

        }

        .page-header-right {
            float: right;
            }


  .header-right {
    float: none;
  }
}
      `}</style>
        </div>
)

};

export default PageHeader;