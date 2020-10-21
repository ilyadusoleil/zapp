import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import useUser from '../hooks/useUser';

const UserChip = ({ userId }: { userId?: number }) => {
  if (!userId) userId = 0;

  const { isLoading, data } = useUser(userId);

  if (userId == 0) return <div className="font-bold mx-2">Not Assigned</div>;

  if (isLoading || !data) return <div>unknown user</div>;

  return (
    <div className="flex">
      {data.image ? (
        <img
          src={data.image}
          className="rounded-full h-6 mx-1"
          alt="user avatar"
        />
      ) : (
        <FontAwesomeIcon icon={faUser} size={'lg'} className="mx-1" />
      )}
      <div className="font-bold mx-2">{data.displayName || data.email}</div>
    </div>
  );
};

export default UserChip;
