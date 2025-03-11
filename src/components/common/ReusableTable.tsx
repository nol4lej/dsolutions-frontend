import { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Modal } from './Modal';
import { Spinner } from './Spinner';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

interface ReusableTableProps<T extends User> {
    data: T[];
    columns: any[];
}

export const ReusableTable = <T extends User,>({ data, columns }: ReusableTableProps<T>) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const table = useReactTable({
        data,
        columns: [
            ...columns,
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs flex items-center"
                        onClick={() => handleViewMore(row.original.id)}
                    >
                        <FaEye className="" />
                    </button>
                ),
            },
        ],
        getCoreRowModel: getCoreRowModel(),
    });

    const handleViewMore = async (userId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setSelectedUser(response.data);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full border-collapse text-left text-gray-700">
                <thead className="bg-gray-800 text-white">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-3 border-b border-gray-700 font-semibold text-sm">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-3 border-b border-gray-200 text-sm">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-3">Detalles del Usuario</h2>
                {loading && (
                    <div className="flex justify-center items-center mb-3">
                        <Spinner />
                    </div>
                )}
                {selectedUser && !loading && (
                    <div>
                        <p className="text-sm"><strong>Nombre:</strong> {selectedUser.name}</p>
                        <p className="text-sm"><strong>Usuario:</strong> {selectedUser.username}</p>
                        <p className="text-sm"><strong>Email:</strong> {selectedUser.email}</p>
                        <p className="text-sm"><strong>Dirección:</strong> {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                        <p className="text-sm"><strong>Teléfono:</strong> {selectedUser.phone}</p>
                        <p className="text-sm"><strong>Sitio Web:</strong> {selectedUser.website}</p>
                        <p className="text-sm"><strong>Compañía:</strong> {selectedUser.company.name}</p>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded mt-3 text-xs" onClick={closeModal}>Cerrar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};