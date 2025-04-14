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

  const recordsDuration: Record<string, number> = reportData.reduce(
    (acc, { state, secondsDuration }) => {
      acc[state] = acc[state] ? acc[state] + secondsDuration : secondsDuration;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <>
      <div className="mt-5 p-5 flex flex-col w-1/3 gap-5 bg-slate-600 rounded-lg">
        <h2>Records Count Per State</h2>
        <div className="flex flex-col">
          {Object.entries(recordsCountPerState)
            .sort(([, a], [, b]) => b - a)
            .map(([state, count]) => (
              <div key={state} className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: stateColorMap[state] }}
                  className="w-5 h-5 rounded-full"
                ></div>
                {state}: {count}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-5 p-5 flex flex-col w-1/3 gap-5 bg-slate-600 rounded-lg">
        <h2>Duration Per State</h2>
        <div className="flex flex-col">
          {Object.entries(recordsDuration)
            .sort(([, a], [, b]) => b - a)
            .map(([state, count]) => (
              <div key={state} className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: stateColorMap[state] }}
                  className="w-5 h-5 rounded-full"
                ></div>
                {state}: {count}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
