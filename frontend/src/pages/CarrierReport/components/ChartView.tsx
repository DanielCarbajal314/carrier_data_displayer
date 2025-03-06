import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(TimeScale, LinearScale, PointElement, Tooltip, Legend);

interface DataPoint {
  date: string;
  state: string;
  distance: number;
}

interface ChartViewProps {
  data: DataPoint[];
  stateColorMap: Record<string, string>;
}

export function ChartView({ data, stateColorMap }: ChartViewProps) {
  const datasets = Object.entries(
    data.reduce<Record<string, { x: string; y: number }[]>>(
      (acc, { state, date, distance }) => {
        if (!acc[state]) acc[state] = [];
        acc[state].push({ x: date, y: distance });
        return acc;
      },
      {},
    ),
  ).map(([state, points]) => ({
    label: state,
    data: points,
    backgroundColor: stateColorMap[state] || "gray",
    pointRadius: 6,
  }));

  return (
    <div className="bg-slate-100 p-10 rounded-lg w-1/2 h-[400px] mt-4">
      <h2>Distance Over Time</h2>
      <Scatter
        id="chart"
        data={{ datasets }}
        options={{
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: { unit: "hour" },
              title: { display: true, text: "Date" },
            },
            y: { title: { display: true, text: "Distance" } },
          },
        }}
      />
    </div>
  );
}
