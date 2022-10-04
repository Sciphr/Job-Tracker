import React, { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const {
    isLoading,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    user,
    loginUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    clearAlert();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    clearAlert();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
        clearAlert();
      }, 1000);
    }
  }, [user, navigate, clearAlert]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper className="full-page">
          <form className="form" onSubmit={onSubmit}>
            <Logo />
            <h3>{values.isMember ? 'Login' : 'Register'}</h3>
            {showAlert && <Alert />}
            {!values.isMember && (
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
            )}
            <FormRow
              type="email"
              name="email"
              labelText="Email"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="password"
              labelText="Password"
              value={values.password}
              handleChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              Submit
            </button>
            <p>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}
              <button
                type="button"
                onClick={toggleMember}
                className="member-btn"
              >
                {values.isMember ? 'Register here' : 'Login here'}
              </button>
            </p>
          </form>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
