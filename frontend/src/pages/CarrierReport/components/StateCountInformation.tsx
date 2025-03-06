interface StateCountInformationProps {
  recordsCountPerState: Record<string, number>;
  stateColorMap: Record<string, string>;
}

export function StateCountInformation({
  recordsCountPerState,
  stateColorMap,
}: StateCountInformationProps) {
  return (
    <div className="mt-5 p-5 flex flex-col gap-5 w-1/2 bg-slate-600 rounded-lg">
      <h2>Unique Records Count Per State</h2>
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
