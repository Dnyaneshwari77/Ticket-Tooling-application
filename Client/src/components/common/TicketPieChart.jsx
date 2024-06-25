import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

//  Common PieChart for Employee admin and client
const TicketPieChart = ({ solved, pending, total, width, height }) => {
  const data = {
    labels: ['Solved', 'Pending', 'Unsolved'],
    datasets: [
      {
        label: '# of Tickets',
        data: [solved, pending, total - solved - pending], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 1000, 
      easing: 'easeOutBounce', 
    },
  };

  return (
    <Box width={{ base: '100%', md: width }} height={{ base: 'auto', md: height }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default TicketPieChart;
