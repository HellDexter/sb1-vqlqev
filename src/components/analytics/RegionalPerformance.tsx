import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};

const data = {
  labels: ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(25, 118, 210, 0.8)',
        'rgba(46, 125, 50, 0.8)',
        'rgba(237, 108, 2, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(76, 175, 80, 0.8)',
      ],
      borderWidth: 1,
    },
  ],
};

export function RegionalPerformance() {
  return (
    <div style={{ height: '300px' }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}