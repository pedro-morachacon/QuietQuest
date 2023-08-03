import React, { useEffect, useState } from "react";
import FirebaseUserName from "./FirebaseUserName";
import WeatherTemp from "./WeatherTemp";
import Weather from "../weather2/Weather";

const PageHeaderTable = ({}) => {
  return (
    <div>
      <ul className="header-list">
        <li >
          <img src="/logo1.png" alt="QuietQuest Logo" width="145" height="40" />
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
          margin: 0;
          padding: 10px;
          overflow: hidden;
          background-color: #394b56;
          position: fixed;
          width: 100%;
          color: #D9D9D9;
        }
        .header-list li {
          margin-right: 10px;
          color: #D9D9D9;
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
