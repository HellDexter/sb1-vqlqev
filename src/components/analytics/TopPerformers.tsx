import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';

const performers = [
  {
    name: 'Jan Novák',
    deals: 15,
    revenue: 450000,
    progress: 85,
  },
  {
    name: 'Marie Svobodová',
    deals: 12,
    revenue: 380000,
    progress: 75,
  },
  {
    name: 'Petr Dvořák',
    deals: 10,
    revenue: 320000,
    progress: 65,
  },
  {
    name: 'Eva Procházková',
    deals: 8,
    revenue: 250000,
    progress: 55,
  },
  {
    name: 'Tomáš Novotný',
    deals: 7,
    revenue: 220000,
    progress: 45,
  },
];

export function TopPerformers() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Obchodník</TableCell>
            <TableCell align="right">Uzavřené smlouvy</TableCell>
            <TableCell align="right">Obrat (Kč)</TableCell>
            <TableCell align="right">Plnění cíle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {performers.map((performer) => (
            <TableRow key={performer.name}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar>{performer.name[0]}</Avatar>
                  <Typography variant="body2">{performer.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">{performer.deals}</TableCell>
              <TableCell align="right">
                {performer.revenue.toLocaleString('cs-CZ')}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={performer.progress}
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography variant="body2">{performer.progress}%</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}