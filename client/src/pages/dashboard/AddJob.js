import React from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import { AnimatePresence, motion } from 'framer-motion';

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    handleChange,
    clearValues,
    clearAlert,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    clearAlert();
    handleChange({ name, value });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper>
          <form className="form">
            <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              <FormRow
                type="text"
                name="position"
                value={position}
                handleChange={handleJobInput}
              />
              <FormRow
                type="text"
                name="company"
                value={company}
                handleChange={handleJobInput}
              />
              <FormRow
                type="text"
                labelText="Location"
                name="jobLocation"
                value={jobLocation}
                handleChange={handleJobInput}
              />
              <FormRowSelect
                name="status"
                value={status}
                handleChange={handleJobInput}
                list={statusOptions}
              />
              <FormRowSelect
                name="jobType"
                labelText="Job Type"
                value={jobType}
                handleChange={handleJobInput}
                list={jobTypeOptions}
              />
              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-block clear-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    clearValues();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddJob;
