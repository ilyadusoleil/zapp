import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Bug } from '../types/Bug';
import './Bugitem.css';

function Bugitem({ bug }: { bug: Bug }) {
  const [isOpened, setisOpened] = useState(false);

  function priority(level: string) {
    return level === 'High'
      ? 'bg-teal-500'
      : level === 'Medium'
      ? 'bg-teal-400'
      : 'bg-teal-200';
  }

  return (
    <div className=" m-1 bg-gray-100 w-72 border b-gray-200 ">
      <div
        onClick={() => setisOpened(!isOpened)}
        className="bg-gray-200  p-1 flex justify-items cursor-pointer"
      >
        <h1 className='uppercase text-xs'>{bug.title}</h1>
        <p
          className={`ml-auto ${priority(
            bug.priority
          )} rounded-full text-xs w-16 flex justify-center text-gray-200`}
        >
          {bug.priority}
        </p>
      </div>

      <Collapse  isOpened={isOpened}>
        <div className="p-5 divide-y divide-gray-400 text-gray-800">
            <div className='flex'>
                <p>{bug.id}</p>
                <p className='ml-auto'>Due date: placeholder</p>
          </div>
          <p className="mt-2 py-6">{bug.description}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Bugitem;
