import { createColumnHelper } from '@tanstack/react-table';
import { ReusableTable } from '@/components/common';
import { User } from '@/types';

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor('firstName', { header: 'Nombre' }),
    columnHelper.accessor('lastName', { header: 'Apellido' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('status', {
        header: 'Estado',
        cell: ({ getValue }) => {
            const status = getValue();
            const color = status === 'ACTIVO' ? 'green' : 'red';
            return <span style={{ color }}>{status}</span>;
        },
    }),
];

const data = [
    { firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', status: 'ACTIVO' },
    { firstName: 'Ana', lastName: 'Gómez', email: 'ana@example.com', status: 'INACTIVO' },
];

export const UserTable = () => {
    return <ReusableTable data={data} columns={columns} />;
}