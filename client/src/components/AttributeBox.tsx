import React from 'react';

type AttributeBoxProps = {
  label: string;
  // ValueComponent: (val: number) => JSX.Element;
}

const AttributeBox = ({label}: AttributeBoxProps) => {

  return (
    <div className="flex-grow">
      <div className="p-5 divide-y divide-gray-400 text-gray-800"></div>
      <div className="flex">
        <div>{label}</div>
       {/* {<ValueComponent/>} */}
      </div>
    </div>
  )
}

export default AttributeBox