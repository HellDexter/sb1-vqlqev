import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};

const labels = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen'];

const data = {
  labels,
  datasets: [
    {
      label: 'Uzavřené smlouvy',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Aktivní jednání',
      data: [25, 32, 28, 41, 35, 48],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46, 125, 50, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export function PerformanceChart() {
  return (
    <div style={{ height: '400px' }}>
      <Line options={options} data={data} />
    </div>
  );
}