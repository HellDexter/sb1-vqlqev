import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Prospects from '../pages/Prospects';
import Calendar from '../pages/Calendar';
import Contracts from '../pages/Contracts';
import Analytics from '../pages/Analytics';
import Communication from '../pages/Communication';
import Training from '../pages/Training';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/prospects" element={<Prospects />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/training" element={<Training />} />
    </Routes>
  );
}