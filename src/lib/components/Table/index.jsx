import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useMemo } from "react";
import { Pagination } from "../Pagination";

export function Table({ rows, onDelete, onEdit }) {
  const deleteRow = (id) => {
    onDelete(id);
  };

  const editRow = (id) => {
    onEdit(id);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const PageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return rows.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, rows]);

  return (
    <>
      <table className="w-full table-fixed border-collapse bg-white">
        <thead>
          <tr className="font-bold text-gray-600 text-lg border-b">
            <th className="px-4 py-2 text-left">
              <input type="checkbox" name="select-all" id="select-all" />
            </th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((e) => {
            return (
              <tr
                key={e.id}
                className="border-b text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <td className="px-4 py-3 my-2">
                  <input type="checkbox" name="select-a" id="select-a" />
                </td>
                <td className="px-4 py-3 my-2">{e.name}</td>
                <td className="px-4 py-3 my-2">{e.email}</td>
                <td className="px-4 py-3 my-2">{e.role}</td>
                <td className="px-4 py-3 my-2 flex flex-row justify-start items-center gap-6">
                  <BiEdit
                    onClick={() => editRow(e.id)}
                    className="text-xl text-gray-500 hover:text-gray-900 shadow-2xl"
                  />
                  <AiOutlineDelete
                    onClick={() => deleteRow(e.id)}
                    className="text-xl text-red-800 hover:text-red-500 shadow-2xl"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={rows.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
