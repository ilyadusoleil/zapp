import React, {useContext} from 'react';
import Logo from '../assets/zapp.png';

import Context from '../Context';

const Header = () => {
  const ctx = useContext(Context);
  return (
    <div className="inset-x-0 top-0 bg-gray-200 h-12 flex">
      <img
        src={Logo}
        className="h-12 ml-1 self-center"
      ></img>
      <div className="ml-auto mr-3">
        {ctx.state.userId}
      </div>
    </div>
  );
};

export default Header;
