import { create } from 'zustand';
import { Appointment } from '../types/appointment';
import { addDays, setHours, setMinutes } from 'date-fns';

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
}

const today = new Date();

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [
    {
      id: '1',
      title: 'Schůzka - Bar U Modré hvězdy',
      description: 'První setkání s majitelem',
      startTime: setMinutes(setHours(today, 14), 30).toISOString(),
      endTime: setMinutes(setHours(today, 15), 30).toISOString(),
      location: 'Hlavní 123, Praha',
      prospectId: '1',
      type: 'meeting',
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Telefonát - Restaurace Na Růžku',
      description: 'Follow-up po první schůzce',
      startTime: setMinutes(setHours(addDays(today, 1), 10), 0).toISOString(),
      endTime: setMinutes(setHours(addDays(today, 1), 10), 30).toISOString(),
      location: 'Telefonicky',
      prospectId: '2',
      type: 'call',
      status: 'scheduled',
    },
  ],
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),
  updateAppointment: (appointment) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointment.id ? appointment : a
      ),
    })),
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),
  getAppointmentById: (id) => get().appointments.find((a) => a.id === id),
}));