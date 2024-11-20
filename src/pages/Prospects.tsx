import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { ProspectStatus } from '../types/prospect';
import ProspectDialog from '../components/prospects/ProspectDialog';
import { useProspectStore } from '../stores/prospectStore';
import { ProspectStatusChip } from '../components/prospects/ProspectStatusChip';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

export default function Prospects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<string | null>(null);
  
  const { prospects, removeProspect } = useProspectStore();

  const handleOpenDialog = (id?: string) => {
    if (id) setSelectedProspect(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProspect(null);
    setDialogOpen(false);
  };

  const filteredProspects = prospects.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Název', flex: 1 },
    { field: 'type', headerName: 'Typ', width: 130 },
    { field: 'city', headerName: 'Město', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <ProspectStatusChip status={params.value as ProspectStatus} />
      ),
    },
    { field: 'contactPerson', headerName: 'Kontaktní osoba', width: 150 },
    {
      field: 'lastContact',
      headerName: 'Poslední kontakt',
      width: 150,
      valueFormatter: (params) => 
        format(new Date(params.value), 'Pp', { locale: cs }),
    },
    {
      field: 'actions',
      headerName: 'Akce',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Zobrazit detail">
            <IconButton onClick={() => handleOpenDialog(params.row.id)} size="small">
              <Eye size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upravit">
            <IconButton onClick={() => handleOpenDialog(params.row.id)} size="small">
              <Edit size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Smazat">
            <IconButton onClick={() => removeProspect(params.row.id)} size="small" color="error">
              <Trash2 size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Potenciální místa</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenDialog()}
        >
          Přidat místo
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Vyhledat podle názvu, města nebo kontaktní osoby..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <DataGrid
          rows={filteredProspects}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>

      <ProspectDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        prospectId={selectedProspect}
      />
    </Box>
  );
}