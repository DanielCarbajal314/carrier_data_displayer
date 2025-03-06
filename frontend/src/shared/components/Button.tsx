import { Spinner } from "./Spinner";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
  isLoading?: boolean;
};

export function Button({ label, isLoading, ...buttonProps }: ButtonProps) {
  return (
    <div>
      <button
        {...buttonProps}
        className="disabled:opacity-10 w-36 relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative w-36 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex gap-2 justify-center">
          {label} {isLoading && <Spinner size="sm" />}
        </span>
      </button>
    </div>
  );
}
