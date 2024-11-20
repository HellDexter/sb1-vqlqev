import { Grid, Paper, Typography, Box } from '@mui/material';
import { Users, MapPin, Calendar, FileText } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { RecentActivities } from '../components/RecentActivities';
import { PerformanceChart } from '../components/PerformanceChart';

export default function Dashboard() {
  const stats = [
    {
      title: 'Aktivní místa',
      value: '156',
      icon: MapPin,
      color: '#1976d2',
    },
    {
      title: 'Schůzky tento týden',
      value: '12',
      icon: Calendar,
      color: '#2e7d32',
    },
    {
      title: 'Nové smlouvy',
      value: '8',
      icon: FileText,
      color: '#ed6c02',
    },
    {
      title: 'Potenciální zákazníci',
      value: '45',
      icon: Users,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <DashboardCard {...stat} />
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Výkon prodeje
            </Typography>
            <PerformanceChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Nedávné aktivity
            </Typography>
            <RecentActivities />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}