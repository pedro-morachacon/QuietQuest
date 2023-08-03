import React, { useEffect, useState } from "react";
import FirebaseUserName from "./FirebaseUserName";
import WeatherTemp from "./WeatherTemp";
import Weather from "@/app/weather2/Weather";

const PageHeaderTable = ({}) => {
  return (
    <div>
      <ul className="header-list">
        <li>
          <a href="/">
            <img
              src="/logo1.png"
              alt="QuietQuest Logo"
              width="145"
              height="40"
            />
          </a>
        </li>
        <li className="right">
          <FirebaseUserName />
        </li>
        <li className="right">
          {/*<WeatherTemp />*/}
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
          color: #d9d9d9;
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
