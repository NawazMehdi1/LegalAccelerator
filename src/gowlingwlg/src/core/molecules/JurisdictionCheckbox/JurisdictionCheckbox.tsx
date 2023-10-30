interface CheckboxProps {
  checkbox: {
    text: string;
    id: string;
  };
  isChecked: boolean;
  toggleIsChecked: (id: string) => void;
}

const CheckboxItem = ({ checkbox, isChecked, toggleIsChecked }: CheckboxProps) => {
  return (
    <li className="pl-[12px] pb-[8px] pt-[8px] hover:bg-extraLightGrey hover:text-black">
      <label className="space-x-1 flex items-center">
        <input
          type="checkbox"
          className="text-gray-600 w-[18px] h-[18px]"
          onChange={() => toggleIsChecked(checkbox.id)}
          checked={isChecked}
        />
        <span className={isChecked ? 'body-text font-bold' : 'body-text'}>{checkbox?.text}</span>
      </label>
    </li>
  );
};

export default CheckboxItem;
