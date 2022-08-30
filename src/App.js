import { useState } from "react";
import { SearchBar } from "./lib/components/SearchBar";
import { Table } from "./lib/components/Table";
import { mockResponseData } from "./lib/utils/data";

function App() {
  let [responseData, setResponseData] = useState(mockResponseData);

  const searchOnChange = (value) => {
    const filter_ = (value) => {
      return mockResponseData.filter((e) => {
        const val = value.toLowerCase();
        return (
          e.name.toLowerCase().includes(val) ||
          e.role.toLowerCase().includes(val) ||
          e.email.toLowerCase().includes(val)
        );
      });
    };

    setResponseData(filter_(value));
  };

  const deleteRow = (id) => {
    setResponseData(responseData.filter((e) => e.id !== id));
  };

  return (
    <main className="flex flex-col items-center max-w-6xl mx-auto m-4 gap-4">
      <SearchBar onChangeCallBack={searchOnChange} />
      {responseData.length > 0 ? (
        <Table rows={responseData} onDelete={deleteRow} />
      ) : (
        <p className="text-md text-red-600">No results found for the Query</p>
      )}
    </main>
  );
}

export default App;
