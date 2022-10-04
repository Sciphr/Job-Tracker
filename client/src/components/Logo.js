import React from 'react';
import LogoPicture from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoPicture} alt="Job Tracker" className="logo" />
    </Link>
  );
};

export default Logo;
