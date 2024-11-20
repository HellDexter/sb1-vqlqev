import { Grid, Paper, Typography, Box } from '@mui/material';
import { PerformanceChart } from '../components/analytics/PerformanceChart';
import { RegionalPerformance } from '../components/analytics/RegionalPerformance';
import { ConversionFunnel } from '../components/analytics/ConversionFunnel';
import { TopPerformers } from '../components/analytics/TopPerformers';

export default function Analytics() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analýzy
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Výkon prodeje v čase
            </Typography>
            <PerformanceChart />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Konverzní trychtýř
            </Typography>
            <ConversionFunnel />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Výkon podle regionů
            </Typography>
            <RegionalPerformance />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Nejlepší obchodníci
            </Typography>
            <TopPerformers />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}