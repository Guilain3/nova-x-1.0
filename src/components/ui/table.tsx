// components/ui/table.tsx

import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-700">{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
    {children}
  </thead>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left">{children}</th>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`border-b border-gray-200 ${className}`}>{children}</tr>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2">{children}</td>
);
