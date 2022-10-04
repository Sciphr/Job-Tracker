import React, { useEffect } from 'react';
import {
  StatsContainer,
  ChartsContainer,
  // Loading
} from '../../components';
import { useAppContext } from '../../context/appContext';
import { AnimatePresence, motion } from 'framer-motion';

const Stats = () => {
  const {
    showStats,
    // isLoading,
    monthlyApplications,
  } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* {isLoading && <Loading center />} */}
        <StatsContainer />
        {monthlyApplications.length > 0 && <ChartsContainer />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Stats;
