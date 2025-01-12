import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <button onClick={() => navigate('/resturant')}>Add Restaurant</button>
        <button onClick={() => navigate('/menu')}>Manage Menu</button>
      </div>
    </div>
  );
};

export default Dashboard;
