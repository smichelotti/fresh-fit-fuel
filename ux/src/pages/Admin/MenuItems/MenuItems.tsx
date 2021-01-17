import React from 'react';
import { BigTitle } from '../../../components';
import { useFetch } from '../../../services/useFetch';

export const MenuItems: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch('/api/menu-items');
  if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Menu Items' />
      <h4>Admin Menu Items page!</h4>
      {!loading && <h5>Count: {data.length}</h5>}
    </>
  );
}