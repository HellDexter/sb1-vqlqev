import { Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Calendar, Phone, RefreshCw, HelpCircle } from 'lucide-react';
import { Appointment } from '../../types/appointment';

const TYPE_ICONS = {
  meeting: Calendar,
  call: Phone,
  'follow-up': RefreshCw,
  other: HelpCircle,
};

const TYPE_COLORS = {
  meeting: '#1976d2',
  call: '#2e7d32',
  'follow-up': '#ed6c02',
  other: '#9c27b0',
};

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export default function AppointmentCard({
  appointment,
  onClick,
}: AppointmentCardProps) {
  const Icon = TYPE_ICONS[appointment.type];
  const color = TYPE_COLORS[appointment.type];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: `${color}08`,
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon size={16} color={color} />
        <Typography variant="body2" noWrap>
          {format(new Date(appointment.startTime), 'HH:mm', { locale: cs })}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
        {appointment.title}
      </Typography>
    </Paper>
  );
}