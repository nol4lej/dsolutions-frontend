import { useState, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { ReusableTable, Spinner } from '@/components/common';
import { User } from '@/types';
import axios from 'axios';

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor('name', { header: 'Nombre' }),
    columnHelper.accessor('username', { header: 'Usuario' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('phone', { header: 'Teléfono' }),
    columnHelper.accessor('company.name', { header: 'Compañía' }),
];

export const UserTable = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                    headers: {
                        Authorization: import.meta.env.VITE_API_TOKEN
                    }
                });
                setData(response.data);
            } catch (e: any) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <ReusableTable data={data} columns={columns} />;
};