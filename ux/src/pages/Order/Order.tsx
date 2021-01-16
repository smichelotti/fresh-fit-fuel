import React from 'react';
import { BigTitle, MenuItem } from '../../components'
import { useFetch } from '../../services/useFetch';

export const Order: React.FunctionComponent = () => {
    const { data, loading, error } = useFetch('/api/menu-items');
    if (error) throw error;

    return (
        <>
            <BigTitle name='Order Now' />

            <MenuItem />

            <h4>This is the order now page</h4>
            {!loading && <h5>Item Count: {data.length}</h5>}
            <div>
            </div>
        </>
    );
}