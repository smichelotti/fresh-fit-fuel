import React from 'react';
import { useFetch } from '../../../services/useFetch';

export const MenuItems: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch('/api/menu-items');
  if (error) throw error;
  
  return (
    <>
      <h4>Admin Menu Items page!</h4>
      <h5>Count: {data.length}</h5>
    </>
  );
}