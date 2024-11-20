import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
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
      backgroundColor: '#1976d215',
      tension: 0.4,
    },
    {
      label: 'Potenciální místa',
      data: [25, 32, 28, 41, 35, 48],
      borderColor: '#2e7d32',
      backgroundColor: '#2e7d3215',
      tension: 0.4,
    },
  ],
};

export function PerformanceChart() {
  return <Line options={options} data={data} />;
}