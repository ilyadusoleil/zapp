import React from 'react';
import moment from 'moment';

import { navigate } from '@reach/router';

import { Bug } from '../types/Bug';

import './Bugitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { PriorityTag } from '../components/Priority';

type Props = {
  bug: Bug;
};

const bugCategoryIcons = [faBug, faLightbulb];

function Bugitem({ bug }: Props) {
  return (
    <div className="flex-grow mt-4 mb-4 p-1 m-1 bg-gray-100  border border-gray-200 rounded-lg shadow-lg md:w-md-container md:flex-grow-0 xl:w-container">
      <div
        role="button"
        tabIndex={0}
        className="p-1 flex justify-items cursor-pointer"
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

      <div className="p-5 divide-y divide-gray-400 text-gray-800">
        <div className="flex align-middle text-base font-bold font-display capitalize mb-4">
          <h1 className="capitalize">Title</h1>
          <span className="ml-4 font-medium">{bug.title}</span>
          <p className="ml-auto">Created date</p>
          <span className="ml-4 font-normal">
            {moment(bug.createdAt).format('MM/DD/YYYY')}
          </span>
        </div>
        <div className="">
          <h1 className="text-base font-bold font-display mt-6">Description</h1>
          <p className="py-2 tracking-wider font-body">{bug.description}</p>
        </div>
      </div>
      <div className="flex">
        <div className="p-4 ml-auto">
          <button
            onClick={() => navigate(`/details/${bug.id}`)}
            className="shadow text-black border-purple-500 border-2 bg-gray-200 hover:bg-purple-500 hover:text-white focus:shadow-outline focus:outline-none  font-body px-2 rounded-full"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bugitem;
