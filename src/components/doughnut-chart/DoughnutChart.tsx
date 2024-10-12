import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  labels: string[];
  ratio: number[];
}

const DoughnutChart: React.FC<Props> = ({ labels, ratio }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: ratio,
        backgroundColor: [
          "#4C7BFF",
          "#FF485C",
          "#FE8F5F",
          "#FFD74E",
          "#05B682",
          "#9B4DFF",
        ],
        borderColor: [
          "#4C7BFF",
          "#FF485C",
          "#FE8F5F",
          "#FFD74E",
          "#05B682",
          "#9B4DFF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "#fff",
        backgroundColor: "#00000085",
        font: {
          size: matchMedia("screen and (max-width: 2280px)").matches ? 16 : 20,
        },
        padding: matchMedia("screen and (max-width: 2280px)").matches ? 8 : 12,
        borderRadius: 4,
      },
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: matchMedia("screen and (max-width: 2280px)").matches
              ? 14
              : 18,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: matchMedia("screen and (max-width: 2280px)").matches ? 35 : 60,
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
