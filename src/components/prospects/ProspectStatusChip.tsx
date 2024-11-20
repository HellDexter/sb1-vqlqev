import { Chip } from '@mui/material';
import { ProspectStatus } from '../../types/prospect';

const STATUS_COLORS: Record<ProspectStatus, string> = {
  new: '#2196f3',
  contacted: '#ff9800',
  meeting: '#9c27b0',
  negotiation: '#673ab7',
  contract: '#4caf50',
  rejected: '#f44336',
};

const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: 'Nový',
  contacted: 'Kontaktován',
  meeting: 'Schůzka',
  negotiation: 'Jednání',
  contract: 'Smlouva',
  rejected: 'Zamítnuto',
};

interface ProspectStatusChipProps {
  status: ProspectStatus;
}

export function ProspectStatusChip({ status }: ProspectStatusChipProps) {
  return (
    <Chip
      label={STATUS_LABELS[status]}
      sx={{
        backgroundColor: `${STATUS_COLORS[status]}15`,
        color: STATUS_COLORS[status],
        fontWeight: 500,
      }}
    />
  );
}