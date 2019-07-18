import React from 'react';

import './home.css';
import tumoColorLogo from './tumo-color-logo.png';

import { Link } from "react-router-dom";

export default () => (
  <div className="full-background">
    <div className="caption">
      <img className="tumo-logo-caption" src={tumoColorLogo}  alt="tumo"/>
      <p className={"display-4 text-black font-weight-bold"}>
        <span className="orangetext">Click</span> <Link to="/login"><span className="text-white">here</span></Link> <span className="bluetext">to</span> <span className="greentext">start</span> 
      </p>
    </div>
  </div>
);
