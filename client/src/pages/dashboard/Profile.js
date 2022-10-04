import React, { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { AnimatePresence, motion } from 'framer-motion';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, clearAlert } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        clearAlert();
        break;
      case 'lastName':
        setLastName(e.target.value);
        clearAlert();
        break;
      case 'email':
        setEmail(e.target.value);
        clearAlert();
        break;
      case 'location':
        setLocation(e.target.value);
        clearAlert();
        break;
      default:
        clearAlert();
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper>
          <form className="form" onSubmit={handleSubmit}>
            <h3>Profile</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              <FormRow
                type="text"
                name="name"
                value={name}
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                labelText="Last Name"
                name="lastName"
                value={lastName}
                handleChange={handleChange}
              />
              <FormRow
                type="email"
                name="email"
                value={email}
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="location"
                value={location}
                handleChange={handleChange}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait....' : 'Save Changes'}
              </button>
            </div>
          </form>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default Profile;
