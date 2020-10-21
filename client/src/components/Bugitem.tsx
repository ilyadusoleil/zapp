import React from 'react';

import { navigate } from '@reach/router';

import { Bug } from '../types/Bug';

import './Bugitem.css';
import UserChip from './UserChip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { PriorityTag } from '../components/Priority';

type Props = {
  bug: Bug;
};

const bugCategoryIcons = [faBug, faLightbulb];



function Bugitem({ bug }: Props) {

    function topBar () {
        return (bug.state === 0) ? 'bg-gradient-to-r from-teal-500  to-teal-400' : 'bg-gradient-to-r from-gray-500  to-gray-400'
    }

    function bugItemComplete () {
        return (bug.state !== 0) ? 'opacity-50' : '';
    }

   const goToBugDetails = () => {
        return navigate(`/details/${bug.id}`)
    }

  return (
    <div onClick={goToBugDetails} onKeyDown={goToBugDetails} tabIndex={0}  className={`w-full flex-grow ${bugItemComplete()} cursor-pointer mt-4 mb-4 m-1 ml-3 bg-gray-100 shadow-lg hover:shadow-2xl hover:cursor-pointer md:w-md-container md:flex-grow-0 xl:w-container`}>
      <div className={`${topBar()} h-1`}></div>
      <div
        className="p-1 flex justify-items"
      >
        <div className="flex items-center justify-center mt-1 ml-2 bg-gradient-to-r from-indigo-800 to-purple-500 rounded-full w-8 h-8">
          <FontAwesomeIcon
            className="text-center text-gray-100"
            size={'lg'}
            icon={bugCategoryIcons[bug.category]}
          />
        </div>

        <div className="flex ml-auto">
          <div className="p-2">
            <PriorityTag priority={bug.priority} />
          </div>
        </div>
      </div>

      <div className="p-3 divide-y divide-gray-400 text-gray-800">
        <div className="flex align-middle text-base font-bold font-display capitalize mb-4">
          <h1 className="capitalize">Title</h1>
          <span className="ml-4 font-medium">{bug.title}</span>
        </div>
        <div className="">
          <h1 className="text-base font-bold font-display mt-4">Description</h1>
          <p className="py-2 tracking-wider font-body h-16 overflow-y-auto">{bug.description}</p>
        </div>
      </div>
      <div className="flex p-1 mb-1">
        <div className="ml-auto p-1 bg-gradient-to-r from-gray-200  to-gray-300 rounded-full">
            <UserChip userId={bug.userId} />
        </div>
      </div>
    </div>
  );
}

export default Bugitem;
