import * as Select from '@radix-ui/react-select';
import { Ref, forwardRef } from 'react';

interface SelectItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  value: number;
}
const SelectItem: React.FC<SelectItemProps> = forwardRef(
  ({ children, onClick, value, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:cursor-pointer"
        {...props}
        ref={forwardedRef as Ref<HTMLDivElement>}
        onClick={onClick}
        value={value?.toString()}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);
SelectItem.displayName = 'SelectItem';

export default SelectItem;
