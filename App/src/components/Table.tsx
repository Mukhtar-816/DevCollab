import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyState?: React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyState,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-900 bg-zinc-900/30">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-5 py-3 text-xs font-semibold text-zinc-400 select-none ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900/50">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row, rowIdx)}
                className="hover:bg-zinc-900/20 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-5 py-3.5 text-xs text-zinc-300 ${col.className || ''}`}
                  >
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center">
                {emptyState || (
                  <span className="text-zinc-500 text-xs">No records available</span>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
