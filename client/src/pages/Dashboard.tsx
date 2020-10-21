import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import { Bug } from '../types/Bug';
import useBugs from '../hooks/useBugs';

import ProjectHeader from '../components/ProjectHeader';
import TopBar from '../components/TopBar';
import Bugitem from '../components/Bugitem';
import Loading from '../components/Loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import FilterAndSort, {
  ASSIGNEE_FILTER_INFO,
  SORT_INFO,
} from '../components/FilterAndSort';

import Context from '../Context';
import ErrorComponent from '../components/ErrorComponent';

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

  if (isLoading) return <Loading />;

  if (isError || !data) return <ErrorComponent />;

  return (
    <>
      <div>
        <TopBar text="Dashboard" />
        <ProjectHeader projectId={parseInt(projectId)} />

        <FilterAndSort
          setSortIdx={setSortIdx}
          setAssigneeFilterIdx={setAssigneeFilterIdx}
          setIsShowCompleted={setIsShowCompleted}
        />

        <br />
        <button
          onClick={createBug}
          className="shadow bg-purple-600 focus:shadow-outline focus:outline-none text-white font-body px-3 py-1 rounded-full ml-3"
        >
          <FontAwesomeIcon icon={faPlusCircle} size={'sm'} className="mr-1" />
          Create Issue
        </button>
        <div className="flex flex-wrap ml-3 space">
          {[...data]
            .filter((bug) => (isShowCompleted ? true : bug.state == 0))
            .filter((bug) =>
              ASSIGNEE_FILTER_INFO[assigneeFilterIdx].func(
                bug,
                ctx.state.userId
              )
            )
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
