import { Button } from "../../../shared/components";
import { downloadCSVFile } from "../../../shared/utils/download/downloadCSVFile";
import { ReportData } from "../api/types";

export interface ReportTableProps {
  reportData: ReportData[];
  selectedDate?: string;
}

export function ReportTable({ reportData, selectedDate }: ReportTableProps) {
  const filename = `carrier_report_${selectedDate ?? "unknown"}.csv`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = reportData.map(({ centroid, ...others }) => ({ ...others }));
  return (
    <div className="flex flex-col w-full mt-9 bg-slate-600 rounded-lg">
      <div className="flex justify-end items-center py-2">
        <Button
          onClick={() => downloadCSVFile({ data, filename })}
          label="Download as CSV"
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Start</th>
              <th className="px-6 py-3">End</th>
              <th className="px-6 py-3">County</th>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3">Duration (seconds)</th>
              <th className="px-6 py-3">Sample Number</th>
              <th className="px-6 py-3">Distance from Previous Record</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td>{new Date(data.start).toLocaleString()}</td>
                <td>{new Date(data.end).toLocaleString()}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.county}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.state}
                </td>
                <td>{data.secondsDuration}</td>
                <td>{data.sampleNumber}</td>
                <td>{data.distanceFromPrevious}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
