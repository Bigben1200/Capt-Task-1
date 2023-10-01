import { Select } from "antd";

interface ISelectInput {
  label?: string;
  value?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const SelectInput: React.FC<ISelectInput> = ({
  value,
  label,
  options,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full">
      {label ? <p className="pb-1">{label}</p> : null}
      <Select
        value={value}
        className="w-full h-11"
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectInput;
