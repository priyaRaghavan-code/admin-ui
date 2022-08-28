import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export function Table({ rows }) {
  return (
    <table className="w-full border-collapse bg-white">
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
        {rows.map((e) => {
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
                <BiEdit className="text-xl text-gray-500 hover:text-gray-900 shadow-2xl" />
                <AiOutlineDelete className="text-xl text-red-800 hover:text-red-500 shadow-2xl" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
