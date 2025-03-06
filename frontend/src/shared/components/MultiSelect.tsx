import Select, { OnChangeValue, StylesConfig } from "react-select";

interface Option {
  value: number;
  label: string;
}

const darkThemeStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgb(55 65 81 / var(--tw-text-opacity))",
    borderColor: "#444",
    color: "rgb(55 65 81 / var(--tw-text-opacity))",
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#333",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#555" : "#333",
    color: state.isSelected ? "#fff" : "#ccc",
    "&:hover": {
      backgroundColor: "#444",
      color: "#fff",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#555",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#aaa",
    "&:hover": {
      color: "#fff",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#aaa",
    "&:hover": {
      color: "#fff",
    },
  }),
};

export interface MultiSelectProps {
  options: Option[];
  setSelectedOptions: (options: number[]) => void;
}

export function MultiSelect({ options, setSelectedOptions }: MultiSelectProps) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-2">
        Users:
      </label>
      <Select
        styles={darkThemeStyles}
        options={options}
        onChange={(values: OnChangeValue<Option, true>) =>
          setSelectedOptions(values.map(({ value }: Option) => value))
        }
        className="w-full"
        isMulti
      />
    </>
  );
}
