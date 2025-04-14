import { ReportData } from "../api/types";

interface StateCountInformationNonUniqueProps {
  reportData: ReportData[];
  stateColorMap: Record<string, string>;
}

export function StateCountInformationNonUnique({
  reportData,
  stateColorMap,
}: StateCountInformationNonUniqueProps) {
  const recordsCountPerState: Record<string, number> = reportData.reduce(
    (acc, { state, sampleNumber }) => {
      acc[state] = acc[state] ? acc[state] + sampleNumber : sampleNumber;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="mt-5 p-5 flex flex-col gap-5 w-1/2 bg-slate-600 rounded-lg">
      <h2>Records Count Per State</h2>
      <ul>
        {Object.entries(recordsCountPerState)
          .sort(([, a], [, b]) => b - a)
          .map(([state, count]) => (
            <li key={state} className="flex items-center gap-2">
              <div
                style={{ backgroundColor: stateColorMap[state] }}
                className="w-5 h-5 rounded-full"
              ></div>
              {state}: {count}
            </li>
          ))}
      </ul>
    </div>
  );
}
