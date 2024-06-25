import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);
// Component to show Pie chart for assigned vs not assigned ticket only on admin side
const AssignedVsNotAssignedPieChart = ({
  assigned,
  notassigned,
  width,
  height,
}) => {
  const data = {
    labels: ["Assigned", "Not Assigned"],
    datasets: [
      {
        label: "# of Tickets",
        data: [assigned, notassigned],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      width={{ base: "100%", md: width }}
      height={{ base: "auto", md: height }}
    >
      <Pie data={data} style={{ width: width, height: height }} />;
    </Box>
  );
};

export default AssignedVsNotAssignedPieChart;
