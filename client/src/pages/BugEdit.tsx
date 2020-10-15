import React from 'react';

import { RouteComponentProps } from '@reach/router';

import useBug from '../hooks/useBug';
import useEditBug from '../hooks/useEditBug';

import BugEditForm from '../components/BugEditForm';

import Context from '../Context'

interface BugEditProps extends RouteComponentProps
{
  id?: string;
}

const BugEdit = (props: BugEditProps) => {
  if (!props.id) return (<h1>Hmm no id</h1>)

  const { isLoading, isError, data } = useBug(parseInt(props.id));

  const [editBug, { status: editBugStatus }] = useEditBug();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: </span>;
  }

  return (
    <>
      <h1>Edit woohoo</h1>
      <BugEditForm
        onSubmit={editBug}
        submitText={
          editBugStatus === 'loading'
            ? 'Saving...'
            : editBugStatus === 'error'
            ? 'Error!'
            : editBugStatus === 'success'
            ? 'Saved!'
            : 'Edit Issue'
        }
        initialValues={data}
      />
    </>
  );
};


export default BugEdit;
