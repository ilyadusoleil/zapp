import React, { useState, useContext } from 'react';

import { Collapse } from 'react-collapse';

import { navigate } from '@reach/router';

import { Bug } from '../types/Bug';

import './Bugitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Context from '../Context';

type Props = {
  bug: Bug;
};

function Bugitem({ bug }: Props) {
  const ctx = useContext(Context);
  const [isOpened, setisOpened] = useState(false);

  // FIXME: Update all equality checks to === below once server returns number??
  function priority(level: number) {
    return level == 0
      ? 'bg-teal-500'
      : level == 1
      ? 'bg-teal-400'
      : 'bg-teal-200';
  }

  const mapPriorityToString = (level: number) => {
    if (level == 0) return 'High';
    if (level == 1) return 'Medium';
    return 'Low';
  };

  return (
    <div className=" m-1 bg-gray-100 w-72 border b-gray-200 ">
      <div
        onClick={() => setisOpened(!isOpened)}
        className="bg-gray-200  p-1 flex justify-items cursor-pointer"
      >
        <h1 className="uppercase text-xs">{bug.title}</h1>
        <div className="flex ml-auto">
          <FontAwesomeIcon
            onClick={() =>
              navigate(`/edit/${bug.id}`, {
                state: { oldLocation: JSON.parse(JSON.stringify(location)) },
              })
            }
            icon={faEdit}
            size={'sm'}
            className="mr-10 text-gray-900"
          />
          <p
            className={` ${priority(
              bug.priority
            )} rounded-full text-xs w-16 flex justify-center text-gray-200`}
          >
            {mapPriorityToString(bug.priority)}
          </p>
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
