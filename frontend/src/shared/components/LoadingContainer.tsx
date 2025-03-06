import { Spinner } from "./Spinner";

export function LoadingPage({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  const nonLoadingClasses = "m-20 min-h-max";
  const loadingClasses = "flex justify-center w-full min-h-72 items-center";
  return (
    <div className={loading ? loadingClasses : nonLoadingClasses}>
      {loading ? (
        <div className="mt-[20%]">
          <Spinner size="lg" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
