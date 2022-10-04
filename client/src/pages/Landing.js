import React from 'react';
import Main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Landing = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper>
          <nav>
            <Logo />
          </nav>
          <div className="container page">
            <div className="info">
              <h1>
                Job <span>tracking</span> app
              </h1>
              <p>
                I'm baby locavore semiotics irony yuccie ugh sustainable
                portland Brooklyn snackwave. Yes plz 8-bit vape marfa. Everyday
                carry +1 thundercats seitan heirloom pitchfork narwhal. Plaid
                sartorial pug normcore +1 ramps iceland vinyl gochujang.
              </p>
              <Link to="/register" className="btn btn-hero">
                Login/Register
              </Link>
            </div>
            <img src={Main} alt="Main" className="img main-img" />
          </div>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default Landing;
