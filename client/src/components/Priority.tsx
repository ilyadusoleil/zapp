import React from 'react';

type priorityDataType = {
  label: string;
  color: string;
};

const PRIORITY_DATA: priorityDataType[] = [
  { label: 'High', color: 'bg-teal-500' },
  { label: 'Medium', color: 'bg-teal-400' },
  { label: 'Low', color: 'bg-teal-200' },
];

function priorityColor(level: number) {
  if (level < PRIORITY_DATA.length) return PRIORITY_DATA[level].color;
  return 'bg-teal-100';
}

const mapPriorityToString = (level: number) => {
  if (level < PRIORITY_DATA.length) return PRIORITY_DATA[level].label;
  return 'unknown';
};

const PriorityTag = ({ priority }: { priority: number }) => {
  return (
    <div
      className={`${priorityColor(
        priority
      )} p-1 rounded-full text-xs w-16 flex justify-center text-gray-200`}
    >
      {mapPriorityToString(priority)}
    </div>
  );
};

const PrioritySelect = ({
  prioityValue,
  setValue,
}: {
  prioityValue: number;
  setValue: (key: string, value: string) => void;
}) => {
  return (
    <div className="inline-block relative w-32">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        name="priority"
        value={prioityValue}
        onBlur={(e) => setValue('priority', e.target.value)}
        required
      >
        {PRIORITY_DATA.map((info, i) => (
          <option key={i} value={i}>
            {info.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export { PriorityTag, PrioritySelect };
