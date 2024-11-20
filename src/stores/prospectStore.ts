import { create } from 'zustand';
import { Prospect } from '../types/prospect';

interface ProspectStore {
  prospects: Prospect[];
  addProspect: (prospect: Prospect) => void;
  updateProspect: (prospect: Prospect) => void;
  removeProspect: (id: string) => void;
  getProspectById: (id: string) => Prospect | undefined;
}

export const useProspectStore = create<ProspectStore>((set, get) => ({
  prospects: [
    {
      id: '1',
      name: 'Bar U Modré hvězdy',
      type: 'Bar',
      address: 'Hlavní 123',
      city: 'Praha',
      status: 'new',
      contactPerson: 'Jan Novák',
      phone: '+420 123 456 789',
      email: 'jan@modrahvezda.cz',
      lastContact: '2024-02-15T14:30:00.000Z',
      notes: 'Zajímavá lokalita v centru města',
    },
    {
      id: '2',
      name: 'Restaurace Na Růžku',
      type: 'Restaurace',
      address: 'Nádražní 456',
      city: 'Brno',
      status: 'contacted',
      contactPerson: 'Marie Svobodová',
      phone: '+420 987 654 321',
      email: 'marie@naruzku.cz',
      lastContact: '2024-02-14T10:00:00.000Z',
      notes: 'Vysoká návštěvnost, dobrá lokalita',
    },
  ],
  addProspect: (prospect) =>
    set((state) => ({
      prospects: [...state.prospects, prospect],
    })),
  updateProspect: (prospect) =>
    set((state) => ({
      prospects: state.prospects.map((p) =>
        p.id === prospect.id ? prospect : p
      ),
    })),
  removeProspect: (id) =>
    set((state) => ({
      prospects: state.prospects.filter((p) => p.id !== id),
    })),
  getProspectById: (id) => get().prospects.find((p) => p.id === id),
}));