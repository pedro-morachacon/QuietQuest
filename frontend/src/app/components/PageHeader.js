import React, { useEffect, useState } from "react";
import FirebaseUserName from "./FirebaseUserName";
const PageHeader = ({  }) => {
return(
    <div className="page-header">    
    <div className="header-part">   
    <a href="/" className={"logo"}>
    <img
      src="/Logo1.png"
      alt="QuietQuest Logo"
      width="150"
      height="20"
    />
    </a>
    </div> 
    <div className="page-header-right">
    <div className="header-part">  
        <div className="weather">
            weather
            {/* Insert weather component here */}
        </div>
        </div>

        <div className="header-part"> 
        <div className="profile">       
        <div className={"user-image"} width="150"
      height="20">
            
          <FirebaseUserName width="150"
      height="20"/>
        </div>
        </div>
        </div>
        
        </div>
        <style jsx>{`
        .page-header {
            overflow: hidden;
            background-color: #394B56;
            padding: 20px 0px;
            width: 100%;
            position: fixed;
            font-size: 20px; 

          }
        .page-header div.part {
            background-color: #394B56;
            float: left;
            color: black;
            text-align: center;
            text-decoration: none;
            font-size: 20px; 
            line-height: 20px;
            border-radius: 4px;
        }
        .page-header div.part:hover {
            background-color: #B8CBD6;

        }

        .page-header-right {
            float: right;
            }
        .user-image {

        }


  }
}
      `}</style>
        </div>
)

};

export default PageHeader;