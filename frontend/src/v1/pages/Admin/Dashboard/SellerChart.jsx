import React from "react";
import { Bar } from "react-chartjs-2";

const SellerChart = ({labels}) => {
  const barState = {
    labels: labels,
    datasets: [
      {
        label: "profit: ",
        backgroundColor: "#475be8",
        borderRadius: 2,
        hoverBackgroundColor: "#36429e",
        // hoverBorderColor: "rgba(75,192,192,1)",
        data: [40, 60, 80, 100, 60, 20, 70, 90, 30],
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
        labels: {
          color: "#fff",
        },
      },

    },
    
    scales: {
      x: {
        grid: {
          display: true, // màu của đường kẻ trên trục x
        },
        barPercentage: 0.8,
        categoryPercentage: 1,
        ticks: {
          font: {
            size: 14, // kích thước chữ trên trục x
            family: "Arial", // font chữ trên trục x
          },
          color: "#7f7f8c", // màu của chữ trên trục x
        },
      },
      y: {
        grid: {
          display: true, // màu của đường kẻ trên trục y
        },
        ticks: {
          min: 0,
          stepSize: 20,
          callback: function (value) {
            return value.toLocaleString() + "k"; // Hiển thị giá trị chia 1000 và thêm 'K'
          },
          font: {
            size: 14, // kích thước chữ trên trục y
            family: "Arial", // font chữ trên trục y
          },
          color: "#7f7f8c", // màu của chữ trên trục y
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <Bar options={optionsBar} data={barState} />
    </>
  );
};

export default SellerChart;
