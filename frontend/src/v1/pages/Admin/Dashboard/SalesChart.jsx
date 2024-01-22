import React from "react";
import { Line } from "react-chartjs-2";

const SalesChart = ({labels, data}) => {
    const dataSales = {
        labels: labels,
        datasets: [
          {
            label: "Dataset 1",
            data: [60, 70, 82, 50, 40, 60],
            borderColor: "#36a2eb",
            backgroundColor: "#36a2eb",
          },
        ],
      };
      const optionSales = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            display: false,
          },
          title: {
            display: false,
            text: "Sales",
            font: {
              size: 20,
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)", // Màu trắng cho đường kẻ dọc
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)", // Màu trắng cho đường kẻ ngang
            },
          },
        },
      };
  return (
    <>
      <Line data={dataSales} options={optionSales} />
    </>
  );
};

export default SalesChart;
