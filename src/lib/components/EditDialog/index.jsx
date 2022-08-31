import { useState } from "react";
import { trigger } from "../../utils/events";

export function EditDialog({ initialValue }) {
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState(initialValue.name);
  const [email, setEmail] = useState(initialValue.email);
  const [role, setRole] = useState(initialValue.role);

  const onCancel = () => {
    trigger("editCancel");
    setIsActive(false);
  };

  const onSubmit = () => {
    trigger("editSubmit", {
      id: initialValue.id,
      name,
      email,
      role,
    });
    setIsActive(false);
  };

  return (
    <dialog
      open={isActive}
      className="border border-gray-100 mt-10 w-full max-w-md rounded-md shadow-xl"
    >
      <div className="flex flex-col gap-5 items-center m-4">
        <h3 className="font-semibold text-xl text-gray-600">Edit info</h3>
        <span className="flex flex-col items-start w-full gap-2">
          <label htmlFor="name" className="text-gray-600 font-semibold text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Edit name"
            className="w-full outline-none border border-gray-300 p-2 focus:border-gray-800"
          />
        </span>
        <span className="flex flex-col items-start w-full gap-2">
          <label
            htmlFor="email"
            className="text-gray-600 font-semibold text-lg"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Edit email"
            className="w-full outline-none border border-gray-300 p-2 focus:border-gray-800"
          />
        </span>
        <span className="flex w-full gap-2">
          <label htmlFor="role" className="text-gray-600 font-semibold text-lg">
            Role:
          </label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="outline-none border-gray-300 border focus:border-gray-800 px-2"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </span>
        <span className="flex flex-col px-8 w-full gap-2 mt-4">
          <button
            onClick={onSubmit}
            className="text-lg rounded-sm bg-blue-400 text-white py-2 hover:bg-blue-500 font-semibold"
          >
            Submit
          </button>
          <button
            className="text-gray-500 hover:underline hover:underline-offset-2 hover:text-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
        </span>
      </div>
    </dialog>
  );
}
