import React from 'react';
import { Sectors } from '../atoms/SearchFilters/SectorFilter';

interface CheckboxProps {
  CheckBox: Sectors;
  setActiveItems: (value: string[]) => void;
  activeItems: string[];
}

const CheckboxItem = ({ CheckBox, setActiveItems, activeItems }: CheckboxProps) => {
  const isChecked = activeItems.includes(CheckBox?.text);
  const addItem = (value: string) => {
    const newItemsList = [...activeItems];
    newItemsList.push(value);
    setActiveItems(newItemsList);
  };
  const removeItem = (value: string) => {
    const newItemsList = [...activeItems].filter((item) => item !== value);
    setActiveItems(newItemsList);
  };
  return (
    <li className="mb-[10px]">
      <label className="space-x-1 flex">
        <input
          type="checkbox"
          className="form-checkbox text-gray-600"
          onChange={() => (isChecked ? removeItem(CheckBox?.text) : addItem(CheckBox?.text))}
          checked={isChecked}
        />
        <span className={isChecked ? 'body-text font-bold' : 'body-text'}>{CheckBox?.text}</span>
      </label>
    </li>
  );
};

export default CheckboxItem;
