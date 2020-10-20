import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import TopBar from '../components/TopBar';
import Bugitem from '../components/Bugitem';

import ProjectHeader from '../components/ProjectHeader';
import FilterAndSort, {
  ASSIGNEE_FILTER_INFO,
  SORT_INFO,
} from '../components/FilterAndSort';

import { BUTTON_STYLE } from '../constants';

import Context from '../Context';

interface DashboardProps extends RouteComponentProps {
  id?: string;
}

const Dashboard = ({ id: projectId }: DashboardProps) => {
  if (!projectId) projectId = '0';

  const ctx = useContext(Context);
  const { isLoading, isError, data } = useBugs(parseInt(projectId));

  const [sortIdx, setSortIdx] = useState(0);
  const [assigneeFilterIdx, setAssigneeFilterIdx] = useState(0);
  const [isShowCompleted, setIsShowCompleted] = useState(false);

  const createBug = () => {
    navigate('/new', {
      state: { oldLocation: JSON.parse(JSON.stringify(location)) },
    });
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
      <div>
        <TopBar text="Dashboard" />
        <ProjectHeader projectId={parseInt(projectId)} />

        <FilterAndSort
          sortIdx={sortIdx}
          setSortIdx={setSortIdx}
          assigneeFilterIdx={assigneeFilterIdx}
          setAssigneeFilterIdx={setAssigneeFilterIdx}
          isShowCompleted={isShowCompleted}
          setIsShowCompleted={setIsShowCompleted}
        />

        <br />
        <button onClick={createBug} className={`${BUTTON_STYLE}`}>
          Create Bug
        </button>
        <div className="flex flex-wrap justify-between">
          {[...data]
            .filter((bug) => (isShowCompleted ? true : bug.state == 0))
            .filter((bug) => ASSIGNEE_FILTER_INFO[assigneeFilterIdx].func(bug, ctx.state.userId))
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
