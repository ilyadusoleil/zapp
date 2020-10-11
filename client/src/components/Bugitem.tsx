import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Bug } from '../types/Bug';
import './Bugitem.css';

function Bugitem({ bug }: { bug: Bug }) {
  const [isOpened, setisOpened] = useState(false);

  function priority(level: string) {
    return level === 'High'
      ? 'bg-indigo-600'
      : level === 'Medium'
      ? 'bg-indigo-400'
      : 'bg-indigo-200';
  }

  return (
    <div className=" m-2 bg-gray-100 w-2/5 border-2 border-indigo-200 ">
      <div
        onClick={() => setisOpened(!isOpened)}
        className="bg-gray-100 ml-2 p-1 flex justify-items cursor-pointer"
      >
        <h1>{bug.title}</h1>
        <p
          className={`ml-auto ${priority(
            bug.priority
          )} rounded-full text-xs w-16 pt-1 flex justify-center text-gray-200`}
        >
          {bug.priority}
        </p>
      </div>

      <Collapse  isOpened={isOpened}>
        <div className="p-5 divide-y divide-gray-400 text-gray-800">
            <div className='flex'>
                <p>{bug.id}</p>
                <p className='ml-auto'>Due date: 12/10/2020</p>
          </div>
          <p className="mt-2 py-6">{bug.description}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Bugitem;
