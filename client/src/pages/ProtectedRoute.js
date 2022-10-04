import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/landing');
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
