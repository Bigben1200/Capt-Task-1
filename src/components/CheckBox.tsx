import { Checkbox } from "antd";

interface ICheckBox {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<ICheckBox> = ({ label, checked, onChange }) => {
  return (
    <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)}>
      {label}
    </Checkbox>
  );
};

export default CheckBox;
