import { useEffect, useState } from "react";

export function SearchBar({ onChangeCallBack }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    onChangeCallBack(searchQuery);
  }, [searchQuery]);

  return (
    <input
      onChange={(e) => setSearchQuery(e.target.value)}
      type="text"
      placeholder="Search by name, email or role"
      className="w-full rounded-none border-gray-300 border p-2 focus:outline-none focus:border-gray-600"
    />
  );
}
