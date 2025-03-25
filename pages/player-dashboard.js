import FindPlayer from '../components/FindPlayer'; // We will create this component

export default function PlayerDashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Player Dashboard</h1>
      <p>Welcome to your personal player dashboard. Find players and send challenges!</p>

      {/* Find Player Component */}
      <FindPlayer />
    </div>
  );
}
