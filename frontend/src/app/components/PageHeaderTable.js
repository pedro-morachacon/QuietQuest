import React, { useEffect, useState } from "react";
import FirebaseUserName from "./FirebaseUserName";

import Weather from "@/app/weather/Weather";


const PageHeaderTable = ({}) => {
  return (
    <div>
      <ul className="header-list">
        <li>
          <a href="/">
            <picture>
              <source
                  media="(max-width: 768px)"
                  srcSet="https://imagizer.imageshack.com/img922/686/WoPABY.png"
                  width="30"
                  height="20"/>
              <img
              src="https://imagizer.imageshack.com/img922/9458/vax7kt.png"
              alt="QuietQuest Logo"
              width="145"
              height="40"
            />
            </picture>
          </a>
        </li>
        <li className="right">
          <FirebaseUserName />
        </li>
        <li className="right">
          <style>{`
            svg {
              fill: #b8cbd6;
            }
          `}</style>

          <Weather />
        </li>
      </ul>

      <style jsx>{`
        .header-list {
          margin: 0px;
          padding: 10px;
          padding-bottom: 5px;
          overflow: hidden;
          background-color: #394b56;
          position: fixed;
          width: 100%;
          color: #d9d9d9;
          z-index: 1;
        }

        .header-list li {
          margin-right: 10px;
          color: #d9d9d9;
          float: left;
        }

        .header-list li.right {
          float: right;
        }
      `}</style>
    </div>
  );
};

export default PageHeaderTable;
