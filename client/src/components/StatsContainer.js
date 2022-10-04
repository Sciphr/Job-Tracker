import React from 'react';
import StatItem from './StatItem';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'Pending Applications',
      count: stats.Pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Interviews Scheduled',
      count: stats.Interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Jobs Declined',
      count: stats.Declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
