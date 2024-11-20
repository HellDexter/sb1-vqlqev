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
import { useEffect, useState } from 'react';
import { useProspectStore } from '../../stores/prospectStore';
import { Prospect, ProspectStatus } from '../../types/prospect';

const INITIAL_PROSPECT: Prospect = {
  id: '',
  name: '',
  type: '',
  address: '',
  city: '',
  status: 'new',
  contactPerson: '',
  phone: '',
  email: '',
  lastContact: new Date().toISOString(),
  notes: '',
};

const STATUS_OPTIONS: { value: ProspectStatus; label: string }[] = [
  { value: 'new', label: 'Nový' },
  { value: 'contacted', label: 'Kontaktován' },
  { value: 'meeting', label: 'Schůzka' },
  { value: 'negotiation', label: 'Jednání' },
  { value: 'contract', label: 'Smlouva' },
  { value: 'rejected', label: 'Zamítnuto' },
];

interface ProspectDialogProps {
  open: boolean;
  onClose: () => void;
  prospectId: string | null;
}

export default function ProspectDialog({
  open,
  onClose,
  prospectId,
}: ProspectDialogProps) {
  const [prospect, setProspect] = useState<Prospect>(INITIAL_PROSPECT);
  const { addProspect, updateProspect, getProspectById } = useProspectStore();

  useEffect(() => {
    if (prospectId) {
      const existingProspect = getProspectById(prospectId);
      if (existingProspect) {
        setProspect(existingProspect);
      }
    } else {
      setProspect(INITIAL_PROSPECT);
    }
  }, [prospectId, getProspectById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prospectId) {
      updateProspect(prospect);
    } else {
      addProspect({
        ...prospect,
        id: Math.random().toString(36).substr(2, 9),
        lastContact: new Date().toISOString(),
      });
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProspect((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {prospectId ? 'Upravit místo' : 'Přidat nové místo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Název"
                name="name"
                value={prospect.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Typ"
                name="type"
                value={prospect.type}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresa"
                name="address"
                value={prospect.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Město"
                name="city"
                value={prospect.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={prospect.status}
                onChange={handleChange}
                required
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kontaktní osoba"
                name="contactPerson"
                value={prospect.contactPerson}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefon"
                name="phone"
                value={prospect.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={prospect.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poznámky"
                name="notes"
                value={prospect.notes}
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
            {prospectId ? 'Uložit změny' : 'Přidat místo'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}