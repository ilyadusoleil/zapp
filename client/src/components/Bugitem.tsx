import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

function Bugitem({ bug, index: number }) {
  const [isOpened, setisOpened] = useState(false);

  return (
    <div
      className="rounded-lg m-2 bg-gray-200 w-2/3"
      onClick={() => setisOpened(!isOpened)}
    >
      <div className="bg-blue-400 p-1">
        <h1>{bug.title}</h1>
      </div>
      <Collapse isOpened={isOpened}>
        <div className="p-2">
          <p>{bug.id}</p>
          <p>{bug.category}</p>
          <p>{bug.priority}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Bugitem;
