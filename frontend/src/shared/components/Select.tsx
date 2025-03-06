import Select, { OnChangeValue, StylesConfig } from "react-select";

interface Option {
  value: string;
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

export interface SelectProps {
  label: string;
  options: Option[];
  setSelectedOptions: (options: string) => void;
  value?: string;
}

export function SelectWrapper({
  options,
  setSelectedOptions,
  label,
  value,
}: SelectProps) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <Select
        value={options.find((option) => option.value === value)}
        styles={darkThemeStyles}
        options={options}
        onChange={(selected: OnChangeValue<Option, false>) => {
          if (selected) {
            setSelectedOptions(selected.value);
          }
        }}
        className="w-full"
      />
    </>
  );
}
