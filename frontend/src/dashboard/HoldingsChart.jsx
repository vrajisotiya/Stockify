import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HoldingsChart({ holdings }) {
  const chartData = useMemo(() => {
    // Filter out holdings with zero or negative values
    const positiveHoldings = holdings.filter(
      (holding) => holding.currentValue > 0
    );

    // Sort by current value descending to show largest holdings first
    const sortedHoldings = [...positiveHoldings].sort(
      (a, b) => b.currentValue - a.currentValue
    );

    // Take top 8 holdings for visibility, group the rest as "Others"
    let displayHoldings = sortedHoldings.slice(0, 8);
    const otherHoldings = sortedHoldings.slice(8);

    const otherValue = otherHoldings.reduce(
      (sum, holding) => sum + holding.currentValue,
      0
    );

    // Only add "Others" category if there are holdings beyond top 8
    if (otherValue > 0) {
      displayHoldings = [
        ...displayHoldings,
        { symbol: "Others", currentValue: otherValue },
      ];
    }

    // Enhanced color palette with better saturation and contrast
    const colors = [
      "#3B82F6", // Blue
      "#10B981", // Emerald
      "#8B5CF6", // Violet
      "#F59E0B", // Amber
      "#EC4899", // Pink
      "#06B6D4", // Cyan
      "#6366F1", // Indigo
      "#EF4444", // Red
      "#14B8A6", // Teal
      "#84CC16", // Lime
      "#6D28D9", // Purple
      "#F97316", // Orange
    ];

    return {
      labels: displayHoldings.map((holding) => holding.symbol),
      datasets: [
        {
          data: displayHoldings.map((holding) => holding.currentValue),
          backgroundColor: colors.slice(0, displayHoldings.length),
          borderColor: "#FFFFFF",
          borderWidth: 2,
          hoverOffset: 15,
          hoverBorderWidth: 3,
        },
      ],
    };
  }, [holdings]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15,
          font: {
            size: 11,
          },
          color: "#1F2937",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.getDatasetMeta(0).total;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toLocaleString(
              "en-IN"
            )} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
    layout: {
      padding: 10,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-lg font-medium mb-4">Portfolio Distribution</h3>
      <div className="h-80 w-full">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
