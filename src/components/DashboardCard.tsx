import { Paper, Box, Typography } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export function DashboardCard({ title, value, icon: Icon, color }: DashboardCardProps) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: `${color}15`,
          borderRadius: '50%',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={24} color={color} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}