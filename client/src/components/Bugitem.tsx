import React, { useState } from 'react';

import { Collapse } from 'react-collapse';

import { navigate } from '@reach/router';

import { Bug } from '../types/Bug';

import './Bugitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { PriorityTag } from '../components/Priority';

type Props = {
  bug: Bug;
};

function Bugitem({ bug }: Props) {
  const [isOpened, setisOpened] = useState(false);

  const toggleOpen = () => {
    setisOpened(!isOpened);
  };

  return (
    <div className="mt-4 mb-4 p-4 m-1 bg-gray-200 w-72 border b-gray-200 ">
      <div
        onClick={toggleOpen}
        onKeyDown={toggleOpen}
        role="button"
        tabIndex={0}
        className="bg-gray-200  p-1 flex justify-items cursor-pointer"
      >
        <h1 className="Capitalize text-s">{bug.title}</h1>
        <div className="flex ml-auto">
          <FontAwesomeIcon
            onClick={() => navigate(`/details/${bug.id}`)}
            icon={faEdit}
            size={'sm'}
            className="mr-10 text-gray-900"
          />
          <PriorityTag priority={bug.priority} />
        </div>
      </div>

      <Collapse isOpened={isOpened}>
        <div className="p-5 divide-y divide-gray-400 text-gray-800">
          <div className="flex">
            <p>{bug.id}</p>
            <p className="ml-auto">Due date: placeholder</p>
          </div>
          <p className="mt-2 py-6">{bug.description}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Bugitem;
