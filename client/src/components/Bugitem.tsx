import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Bug } from '../types/Bug';

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
    <div className=" rounded-sm m-2 bg-gray-100 w-1/3 border-2 border-indigo-100 ">
      <div
        onClick={() => setisOpened(!isOpened)}
        className="bg-gray-100 p-1 flex justify-items"
      >
        <h1>{bug.title}</h1>
        <p
          className={`ml-auto ${priority(
            bug.priority
          )} rounded-lg p-1 text-xs w-16 justify-self-center`}
        >
          {bug.priority}
        </p>
      </div>

      <Collapse className="" isOpened={isOpened}>
        <div className="p-2 divide-y divide-gray-400 duration-300">
          <p>{bug.id}</p>
          <p className="mt-2 py-6">{bug.description}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Bugitem;
