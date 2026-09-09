'use client';

import ReactSelect from 'react-select';
import { cn } from '@/lib/utils';

export type TableSelectOption = {
  value: string;
  label: string;
};

export function TableSelect({
  ariaLabel,
  options,
  value,
  onChange,
  className,
}: {
  ariaLabel: string;
  options: TableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const selected = options.find((option) => option.value === value) ?? null;

  return (
    <ReactSelect<TableSelectOption, false>
      instanceId={ariaLabel}
      aria-label={ariaLabel}
      options={options}
      value={selected}
      onChange={(option) => option && onChange(option.value)}
      isSearchable={false}
      unstyled
      className={cn('w-full sm:w-56', className)}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            'min-h-11 cursor-pointer rounded-lg border bg-white transition-colors',
            isFocused
              ? 'border-[#8fa9ff] ring-3 ring-[#5d87ff]/10'
              : 'border-[#dbe4ee] hover:border-[#b8c8dc]',
          ),
        valueContainer: () => 'px-3.5',
        singleValue: () => 'text-[14px] text-[#34445c]',
        dropdownIndicator: () => 'px-3 text-[#7c8fac]',
        indicatorSeparator: () => 'hidden',
        menu: () =>
          'z-50 mt-2 overflow-hidden rounded-lg border border-[#dbe4ee] bg-white shadow-[0_14px_36px_rgb(37_48_83/0.14)]',
        menuList: () => 'p-0',
        option: ({ isFocused, isSelected }) =>
          cn(
            'cursor-pointer px-3 py-2.5 text-[14px] transition-colors',
            isSelected
              ? 'bg-[#edf3ff] text-[#4774ee]'
              : isFocused
                ? 'bg-[#f4f7fb] text-[#2a3547]'
                : 'text-[#52627a]',
          ),
      }}
    />
  );
}
