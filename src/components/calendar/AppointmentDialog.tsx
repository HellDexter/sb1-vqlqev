import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { cs } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { useProspectStore } from '../../stores/prospectStore';
import { Appointment } from '../../types/appointment';
import { addHours } from 'date-fns';

const INITIAL_APPOINTMENT: Appointment = {
  id: '',
  title: '',
  description: '',
  startTime: new Date().toISOString(),
  endTime: addHours(new Date(), 1).toISOString(),
  location: '',
  type: 'meeting',
  status: 'scheduled',
};

interface AppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  appointmentId: string | null;
  selectedDate: Date;
}

export default function AppointmentDialog({
  open,
  onClose,
  appointmentId,
  selectedDate,
}: AppointmentDialogProps) {
  const [appointment, setAppointment] = useState<Appointment>(INITIAL_APPOINTMENT);
  const { addAppointment, updateAppointment, getAppointmentById } = useAppointmentStore();
  const { prospects } = useProspectStore();

  useEffect(() => {
    if (appointmentId) {
      const existingAppointment = getAppointmentById(appointmentId);
      if (existingAppointment) {
        setAppointment(existingAppointment);
      }
    } else {
      setAppointment({
        ...INITIAL_APPOINTMENT,
        startTime: selectedDate.toISOString(),
        endTime: addHours(selectedDate, 1).toISOString(),
      });
    }
  }, [appointmentId, getAppointmentById, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointmentId) {
      updateAppointment(appointment);
    } else {
      addAppointment({
        ...appointment,
        id: Math.random().toString(36).substr(2, 9),
      });
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {appointmentId ? 'Upravit událost' : 'Nová událost'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Název"
                  name="title"
                  value={appointment.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Začátek"
                  value={new Date(appointment.startTime)}
                  onChange={(newValue) => {
                    if (newValue) {
                      setAppointment((prev) => ({
                        ...prev,
                        startTime: newValue.toISOString(),
                      }));
                    }
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Konec"
                  value={new Date(appointment.endTime)}
                  onChange={(newValue) => {
                    if (newValue) {
                      setAppointment((prev) => ({
                        ...prev,
                        endTime: newValue.toISOString(),
                      }));
                    }
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Místo"
                  name="location"
                  value={appointment.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Typ"
                  name="type"
                  value={appointment.type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="meeting">Schůzka</MenuItem>
                  <MenuItem value="call">Telefonát</MenuItem>
                  <MenuItem value="follow-up">Follow-up</MenuItem>
                  <MenuItem value="other">Jiné</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Potenciální místo"
                  name="prospectId"
                  value={appointment.prospectId || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="">Žádné</MenuItem>
                  {prospects.map((prospect) => (
                    <MenuItem key={prospect.id} value={prospect.id}>
                      {prospect.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Popis"
                  name="description"
                  value={appointment.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Zrušit</Button>
            <Button type="submit" variant="contained">
              {appointmentId ? 'Uložit změny' : 'Vytvořit událost'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
}