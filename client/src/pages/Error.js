import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={ErrorImage} alt="Not Found" />
        <h3>How did you get here!?</h3>
        <p>I'd go back. I mean, what would you even do here?</p>
        <Link to="/">Lets go back to safety</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
