/* eslint-disable no-useless-escape */

import React, {
  useState,
  ChangeEvent,
  useContext,
  ClipboardEvent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons';
import { FORM_LABEL } from '../constants';

import fetchRequest from '../services/ApiService';
import Context from '../Context';

const defaultChips: {
  id?: number;
  email: string;
  picture?: string;
}[] = [];

const EmailChips = ({
  projectUsers,
  setProjectUsers,
}: {
  projectUsers: (string | number)[];
  setProjectUsers: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}) => {
  const [collaborator, setCollaborator] = useState('');
  const [error, setError] = useState('');
  const [chips, setChips] = useState(defaultChips);
  const ctx = useContext(Context);

  const handleChangeCollaborator = (e: ChangeEvent<HTMLInputElement>) => {
    setCollaborator(e.target.value);
    setError('');
  };

  const handleAddCollaborator = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();

      const email = collaborator.trim().toLowerCase();

      if (email && isValidEmail(email)) {
        addCollaborator(email);
      }
      setCollaborator('');
    }
  };

  const addCollaborator = async (email: string) => {
    const userDetails = await fetchRequest(`/user/email?email=${email}`);
    if (!userDetails) {
      setChips((oldChips) => [
        ...oldChips,
        { id: undefined, email: email, picture: undefined },
      ]);
      setProjectUsers((oldProjectUsers) => [...oldProjectUsers, email]);
    } else {
      setChips((oldChips) => [
        ...oldChips,
        {
          id: userDetails.id,
          email: userDetails.email,
          picture: userDetails.image ? userDetails.image : undefined,
        },
      ]);
      setProjectUsers((oldProjectUsers) => [
        ...oldProjectUsers,
        userDetails.id,
      ]);
    }
  };

  const handleRemoveCollaborator = (toBeRemoved: {
    id?: number;
    email: string;
    picture?: string;
  }) => {
    setProjectUsers(
      projectUsers.filter(
        (user) => user !== toBeRemoved.id && user !== toBeRemoved.email
      )
    );
    setChips(chips.filter((chip) => chip !== toBeRemoved));
  };

  const handlePaste = async (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const paste = e.clipboardData?.getData('text');
    const emails = paste?.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const newEmails = emails.filter((email: string) => isValidEmail(email));
      for (let i = 0; i < newEmails.length; i++) {
        const email = newEmails[i].toLowerCase();
        await addCollaborator(email);
      }
    }
  };

  const isValidEmail = (email: string) => {
    let error = null;

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (ctx.state.user?.email === email) {
      error = `You do not need to add your own email`;
    }

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  const isEmail = (email: string) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  const isInList = (email: string) => {
    const match = chips.filter((chip) => chip.email === email);
    if (match.length > 0) return true;
    else return false;
  };

  return (
    <div>
        <label className={`${FORM_LABEL}`} htmlFor="projectUsers">Collaborators</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Type or paste email addresses separate with a comma..."
        value={collaborator}
        onChange={handleChangeCollaborator}
        onKeyDown={handleAddCollaborator}
        onPaste={handlePaste}
      />
      {error && <p className="text-red-400">{error}</p>}
      <div className="bg-gray-100 h-24 flex flex-wrap justify-center items-center overflow-y-scroll mt-2">
        {chips.map((chip) => {
          return (
            <div
              key={chip.email}
              className={`${
                chip.id ? 'bg-teal-400' : 'bg-gray-300'
              } m-1 p-2 rounded-full inline-block`}
            >
              <div className="flex justify-around">
                {chip.picture ? (
                  <img
                    src={chip.picture}
                    className="rounded-full h-6 mx-1"
                    alt="user avatar"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faGrinAlt}
                    size={'lg'}
                    className="mx-1"
                  />
                )}
                <div className="font-bold mx-2 flex-grow">{chip.email}</div>
                <button
                  className=" font-bold h-6 w-6 leading-none flex justify-center items-center mx-1 bg-white rounded-full cursor-pointer"
                  type="button"
                  onClick={() => handleRemoveCollaborator(chip)}
                >
                  &times;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmailChips;
