import type { ReactNode } from "react";

interface TableProps {
  headers: ReactNode[];
  children: ReactNode;
}

const Table = ({
  headers,
  children,
}: TableProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b px-4 py-3 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;