import { useEffect, useState } from "react";
import { SearchBar } from "./lib/components/SearchBar";
import { Table } from "./lib/components/Table";
import { mockResponseData } from "./lib/utils/data";
import { EditDialog } from "./lib/components/EditDialog";
import { off, on } from "./lib/utils/events";

function App() {
  let [responseData, setResponseData] = useState(mockResponseData);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

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

  const editRequest = (id) => {
    setEditRowData(mockResponseData.find((e) => e.id === id));
    setShowEditDialog(true);
  };

  useEffect(() => {
    const edit = (event) => {
      setResponseData(
        responseData.map((e) => {
          if (e.id === event.detail.id) return event.detail;
          return e;
        })
      );
      setShowEditDialog(false);
      setEditRowData(null);
    };

    const cancelEdit = () => {
      setEditRowData(null);
      setShowEditDialog(false);
    };

    on("editSubmit", edit);
    on("editCancel", cancelEdit);

    return () => {
      off("editSubmit", edit);
      off("editCancel", cancelEdit);
    };
  });

  return (
    <main className="flex flex-col items-center max-w-6xl mx-auto m-4 gap-4">
      <SearchBar onChangeCallBack={searchOnChange} />
      {responseData.length > 0 ? (
        <Table rows={responseData} onDelete={deleteRow} onEdit={editRequest} />
      ) : (
        <p className="text-md text-red-600">No results found for the Query</p>
      )}
      {showEditDialog && <EditDialog initialValue={editRowData} />}
    </main>
  );
}

export default App;
