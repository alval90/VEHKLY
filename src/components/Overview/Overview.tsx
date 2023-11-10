import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextProps, useAuth } from '../../contexts/AuthContext';

export const Overview: React.FC<{}> = () => {
  const { user } = useAuth();
  const { week } = useParams();
  const navigate = useNavigate();

  /*useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  })*/

  return <div>{week}</div>;
};
