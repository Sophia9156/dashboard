import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  barData: BarChartData;
}

const HorizontalBarChart: React.FC<Props> = ({ barData }) => {
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 50,
      },
    },
    responsive: true,
    plugins: {
      datalabels: {
        color: "#fff",
        backgroundColor: "#00000085",
        font: {
          size: matchMedia("screen and (max-width: 2280px)").matches ? 14 : 16,
        },
        padding: 8,
        borderRadius: 4,
      },
      legend: {
        display: false,
        position: "right" as const,
      },
    },
    barThickness: 35,
    maxBarThickness: 25,
    scales: {
      x: {
        ticks: {
          font: {
            size: matchMedia("screen and (max-width: 2280px)").matches
              ? 16
              : 20,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 18,
          },
        },
      },
    },
  };

  const bgColor = ["#94B0FF"];
  const borderColor = ["#94B0FF"];

  const chartData = {
    labels: barData.labels,
    datasets: barData.datasets?.map((dataset, key) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: bgColor[key],
      borderColor: borderColor[key],
    })),
  };

  return <Bar options={options} data={chartData} />;
};

export default HorizontalBarChart;
