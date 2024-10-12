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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface Props {
  barData: BarChartData;
  className: string;
}

const VerticalBarChart: React.FC<Props> = ({ barData, className }) => {
  const options = {
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 50,
      },
    },
    responsive: true,
    plugins: {
      datalabels:
        className === "gender"
          ? {
              color: "#fff",
              backgroundColor: "#00000085",
              font: {
                size: matchMedia("screen and (max-width: 2280px)").matches
                  ? 14
                  : 16,
              },
              padding: 8,
              borderRadius: 4,
            }
          : { display: false },
      legend: {
        position: "bottom" as const,
        display: false,
      },
    },
    barThickness:
      className === "gender"
        ? 45
        : matchMedia("screen and (max-width: 2280px)").matches
        ? 15
        : 20,
    maxBarThickness:
      className === "gender"
        ? 25
        : matchMedia("screen and (max-width: 2280px)").matches
        ? 10
        : 15,
    scales: {
      x: {
        ticks: {
          font: {
            size: 18,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: matchMedia("screen and (max-width: 2280px)").matches
              ? 16
              : 20,
          },
        },
      },
    },
  };

  const bgColor = [
    "#A5BDFF",
    "#FFA3AE",
    "#FFC7AF",
    "#FFEBA6",
    "#82DBC0",
    "#CDA6FF",
  ];
  const borderColor = [
    "#A5BDFF",
    "#FFA3AE",
    "#FFC7AF",
    "#FFEBA6",
    "#82DBC0",
    "#CDA6FF",
  ];

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

export default VerticalBarChart;
