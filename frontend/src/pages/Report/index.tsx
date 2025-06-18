import { LoadingPage } from "../../shared/components/LoadingContainer";
import { ChartView } from "../CarrierReport/components/ChartView";
import { Mapboxs } from "../CarrierReport/components/map";
import { CentroidSource } from "../CarrierReport/components/map/components/CentroidSource";
import { PointSource } from "../CarrierReport/components/map/components/PointSource";
import { ReportTable } from "../CarrierReport/components/ReportTable";
import { StateCountInformation } from "../CarrierReport/components/StateCountInformation";
import { StateCountInformationNonUnique } from "../CarrierReport/components/StateCountInformationNonUnique";
import { useUsaFeatures } from "../CarrierReport/hooks/useUsaFeatures";
import { useSelectedDay } from "./hooks/useSelectedDay";
import { useServerState } from "./hooks/useServerState";

export function SummaryReport(){
    const { reportData, reportDataIsLoading} = useServerState();
    const {
        mapBounds,
        stateColorMap,
        recordsCountPerState,
        selectedDate,
        showDetails,
        setDate,
        carrierInformation,
        carrierInformationIsLoading,
    } = useSelectedDay();
    const { usaFeatures, useFeaturesAreLoading } = useUsaFeatures();
    const isLoadingDetails = carrierInformationIsLoading || useFeaturesAreLoading;
    return <LoadingPage loading={reportDataIsLoading}>
        <div>
            <div className="flex w-full gap-4">
                <div className="w-2/5 h-[800px] overflow-y-scroll">
                    <div className="flex flex-col w-full bg-slate-600 rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Day</th>
                                    <th className="px-6 py-3">States</th>
                                    <th className="px-6 py-3">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData?.map((item) => {
                                    const isSelected = item.day.toISOString().startsWith(selectedDate??"PP");
                                    console.log(item.day.toISOString(), selectedDate);
                                    return <tr 
                                        key={item.day.toString()}
                                        onClick={() => setDate(item.day)}
                                        className={`${isSelected? 'dark:bg-gray-200': 'dark:bg-gray-800'} bg-white border-b  dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:cursor-pointer`}
                                    >
                                        <td>{item.day.toLocaleDateString()}</td>
                                        <td>{item.locations.map(x => x.state ).join(' | ')}</td>
                                        <td>{item.isConsiderStacionary? 'Static': 'Moving'}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-3/5 h-[800px] overflow-y-scroll">
                {
                    showDetails && (
                        <LoadingPage loading={isLoadingDetails}>
                                <div className="flex flex-col gap-5">
                                    <Mapboxs bounds={mapBounds} usaFeatures={usaFeatures} className="w-full">
                                      <>
                                        {carrierInformation?.records.map((record, index) => (
                                          <PointSource
                                            key={index}
                                            showLabel={false}
                                            stateColorMap={stateColorMap}
                                            record={record}
                                          />
                                        ))}
                                        {carrierInformation && (
                                          <CentroidSource
                                            centroid={carrierInformation.centroid}
                                            showLabel={false}
                                          />
                                        )}
                                      </>
                                    </Mapboxs>
                                    {carrierInformation && (
                                      <ChartView
                                        className="w-full"
                                        stateColorMap={stateColorMap}
                                        data={carrierInformation.records}
                                      />
                                    )}
                                </div>
                                  {carrierInformation && (
                                    <div className="flex gap-5">
                                      <StateCountInformation {...{ stateColorMap, recordsCountPerState }} />
                                      <StateCountInformationNonUnique
                                        {...{ stateColorMap, reportData: carrierInformation.report }}
                                      />
                                    </div>
                                  )}
                                  {carrierInformation && (
                                    <ReportTable
                                      {...{ reportData: carrierInformation.report, selectedDate }}
                                    />
                                  )}
                        </LoadingPage>
                    )
                }
                </div>
            </div>
        </div>
    </LoadingPage>
}