import React from 'react';
import { useAuth } from '../../hooks/Auth';

import { Header, Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Header>
      <h1>Oi</h1>
      <button onClick={signOut} type="submit">
        Sign off
      </button>
    </Header>
  );
};

export default Dashboard;
