import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default Dashboard;
