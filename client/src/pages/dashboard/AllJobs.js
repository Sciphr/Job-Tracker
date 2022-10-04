import React from 'react';
import { JobsContainer, SearchContainer } from '../../components';
import { AnimatePresence, motion } from 'framer-motion';

const AllJobs = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <SearchContainer />
        <JobsContainer />
      </motion.div>
    </AnimatePresence>
  );
};

export default AllJobs;
