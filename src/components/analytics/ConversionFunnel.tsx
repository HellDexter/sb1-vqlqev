import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const data = {
  labels: ['Nové', 'Kontaktované', 'Schůzky', 'Jednání', 'Smlouvy'],
  datasets: [
    {
      data: [100, 75, 50, 30, 15],
      backgroundColor: [
        'rgba(25, 118, 210, 0.8)',
        'rgba(46, 125, 50, 0.8)',
        'rgba(237, 108, 2, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(76, 175, 80, 0.8)',
      ],
      borderRadius: 4,
    },
  ],
};

export function ConversionFunnel() {
  return (
    <div style={{ height: '300px' }}>
      <Bar options={options} data={data} />
    </div>
  );
}