import React from 'react';
import { useFetch } from '../../../services/useFetch';

export const MenuItems: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch('/api/menu-items');
  if (error) throw error;
  
  return (
    <>
      <h4>Admin Menu Items page!</h4>
      {!loading && <h5>xCount: {data.length}</h5>}
    </>
  );
}