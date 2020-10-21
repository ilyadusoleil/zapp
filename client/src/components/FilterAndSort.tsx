import React, { useState } from 'react';
import { Bug } from '../types/Bug';

import { Collapse } from 'react-collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type selectInfo = {
  label: string;
  func: (a: Bug, b: Bug) => number;
};

const sortPriority = (a: Bug, b: Bug) => a.priority - b.priority;
const sortCreated = (a: Bug, b: Bug) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

export const SORT_INFO: selectInfo[] = [
  {
    label: 'High-Low',
    func: (a, b) => sortPriority(a, b) || sortCreated(a, b),
  },
  {
    label: 'Low-High',
    func: (a, b) => sortPriority(b, a) || sortCreated(a, b),
  },
  {
    label: 'First-Last',
    func: (a, b) => sortCreated(a, b),
  },
  {
    label: 'Last-First',
    func: (a, b) => sortCreated(b, a),
  },
];

type selectFilterInfo = {
  label: string;
  func: (a: Bug, userId?: number) => boolean;
};

export const ASSIGNEE_FILTER_INFO: selectFilterInfo[] = [
  {
    label: 'All',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    func: (_a) => true,
  },
  {
    label: 'Just me',
    func: (a, userId) => (a.userId ? a.userId == userId : false),
  },
  { label: 'Unassigned', func: (a) => !a.userId },
];

type FilterAndSortType = {
  setSortIdx: React.Dispatch<React.SetStateAction<number>>;
  setAssigneeFilterIdx: React.Dispatch<React.SetStateAction<number>>;
  setIsShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterAndSort = ({
  setSortIdx,
  setAssigneeFilterIdx,
  setIsShowCompleted,
}: FilterAndSortType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  const updateSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortIdx(parseInt(e.target.value));
  };

  const updateAssigneeFilterSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAssigneeFilterIdx(parseInt(e.target.value));
  };

  return (
    <>
      <div className="bg-gray-200">
        <div
          className="cursor-pointer p-2 ml-2"
          onClick={toggleCollapse}
          onKeyDown={toggleCollapse}
          role="button"
          tabIndex={0}
        >
          Filter and Sort
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="mx-4"
          />
        </div>
      </div>
      <Collapse isOpened={isOpen}>
        <div className="flex ml-4 items-start divide-x mt-4">
          <div className="p-1">
            <label className="font-bold" htmlFor="sort">
              Sort By:
            </label>
            <select
              name="sort"
              className="mr-5"
              onChange={updateSortSelect}
              onBlur={updateSortSelect}
            >
              {SORT_INFO.map((el, i) => (
                <option value={i} key={i}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>
          <div className="p-1 font-bold">
            <label htmlFor="assignee">Assigned to:</label>
            <select
              name="assignee"
              className="mr-5"
              onChange={updateAssigneeFilterSelect}
              onBlur={updateAssigneeFilterSelect}
            >
              {ASSIGNEE_FILTER_INFO.map((el, i) => (
                <option value={i} key={i}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-1 font-bold">
            <label htmlFor="showCompleted">
              Show Completed
              <input
                name="showCompleted"
                className="ml-3"
                type="checkbox"
                onChange={(e) => setIsShowCompleted(e.target.checked)}
              />
            </label>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default FilterAndSort;
