import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

interface ReusableTableProps<T> {
    data: T[];
    columns: any[];
}

export const ReusableTable = <T,>({ data, columns }: ReusableTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="w-full border-collapse border border-gray-200 text-left text-gray-700">
            <thead className="bg-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="p-3 border-b border-gray-300">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-100">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-3 border-b border-gray-200">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};