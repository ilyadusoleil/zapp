import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import Bugitem from '../components/Bugitem';
import Sidebar from '../components/Sidebar';

import ProjectHeader from '../components/ProjectHeader';

import Context from '../Context';

interface DashboardProps extends RouteComponentProps {
  id?: string;
}

type selectInfo = {
  label: string;
  func: (a: Bug, b: Bug) => number;
};

const sortPriority = (a: Bug, b: Bug) => a.priority - b.priority;
const sortCreated = (a: Bug, b: Bug) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

const SORT_INFO: selectInfo[] = [
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
  func: (a: Bug) => boolean;
};

const Dashboard = ({ id: projectId }: DashboardProps) => {
  if (!projectId) projectId = '0';

  const ctx = useContext(Context);
  const { isLoading, isError, data } = useBugs(parseInt(projectId));

  const [sortIdx, setSortIdx] = useState(0);
  const [assigneeFilterIdx, setAssigneeFilterIdx] = useState(0);
  const [isShowCompleted, setIsShowCompleted] = useState(false);

  const ASSIGNEE_FILTER_INFO: selectFilterInfo[] = [
    {
      label: 'All',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      func: (_a) => true,
    },
    {
      label: 'Just me',
      func: (a) => (a.userId ? a.userId == ctx.state.userId : false),
    },
    { label: 'Unassigned', func: (a) => !a.userId },
  ];

  const updateSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortIdx(parseInt(e.target.value));
  };
  const updateAssigneeFilterSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAssigneeFilterIdx(parseInt(e.target.value));
  };

  useEffect(() => {
    ctx.dispatch({ type: 'setCurrentProjectId', payload: projectId });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  return (
    <>
      <Sidebar currentPath="/dashboard" />

      <div className="ml-16">
        <h1>Bugs Dashboard</h1>
        <ProjectHeader projectId={parseInt(projectId)} />

        <h1 className="mb-5">Dashboard</h1>

        <select
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

        <select
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

        <label>
          Show Completed
          <input
            className="ml-3"
            type="checkbox"
            onChange={(e) => setIsShowCompleted(e.target.checked)}
          />
        </label>

        <div className="flex flex-wrap justify-between">
          {[...data]
            .filter((bug) => (isShowCompleted ? true : bug.state == 0))
            .filter(ASSIGNEE_FILTER_INFO[assigneeFilterIdx].func)
            .sort(SORT_INFO[sortIdx].func)
            .map((bug: Bug, index) => (
              <Bugitem key={index} bug={bug} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;