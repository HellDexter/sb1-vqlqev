import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { cs } from 'date-fns/locale';
import { useAppointmentStore } from '../stores/appointmentStore';
import AppointmentDialog from '../components/calendar/AppointmentDialog';
import AppointmentCard from '../components/calendar/AppointmentCard';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  
  const { appointments } = useAppointmentStore();

  const handlePreviousWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1));
  };

  const handleNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1));
  };

  const handleOpenDialog = (id?: string) => {
    if (id) setSelectedAppointment(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedAppointment(null);
    setDialogOpen(false);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(selectedDate, { locale: cs }), i)
  );

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        format(new Date(appointment.startTime), 'yyyy-MM-dd') ===
        format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Kalendář</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenDialog()}
        >
          Nová událost
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handlePreviousWeek}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" sx={{ mx: 2 }}>
            {format(weekDays[0], 'MMMM yyyy', { locale: cs })}
          </Typography>
          <IconButton onClick={handleNextWeek}>
            <ChevronRight />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          {weekDays.map((day) => (
            <Grid item xs={12} sm={6} md={12 / 7} key={day.toISOString()}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  backgroundColor: (theme) =>
                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                      ? theme.palette.primary.light + '15'
                      : theme.palette.background.default,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight:
                      format(day, 'yyyy-MM-dd') ===
                      format(new Date(), 'yyyy-MM-dd')
                        ? 'bold'
                        : 'normal',
                  }}
                >
                  {format(day, 'EEEE', { locale: cs })}
                  <br />
                  {format(day, 'd. M.', { locale: cs })}
                </Typography>
                {getAppointmentsForDay(day).map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onClick={() => handleOpenDialog(appointment.id)}
                  />
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <AppointmentDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        appointmentId={selectedAppointment}
        selectedDate={selectedDate}
      />
    </Box>
  );
}