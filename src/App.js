import { useEffect, useState } from "react";
import { SearchBar } from "./lib/components/SearchBar";
import { Table } from "./lib/components/Table";
import { EditDialog } from "./lib/components/EditDialog";
import { off, on } from "./lib/utils/events";

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let [workbenchData, setWorkbenchData] = useState(originalData);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

  const searchOnChange = (value) => {
    const filter_ = (value) => {
      return originalData.filter((e) => {
        const val = value.toLowerCase();
        return (
          e.name.toLowerCase().includes(val) ||
          e.role.toLowerCase().includes(val) ||
          e.email.toLowerCase().includes(val)
        );
      });
    };

    setWorkbenchData(filter_(value));
  };

  const deleteRow = (id) => {
    setWorkbenchData(workbenchData.filter((e) => e.id !== id));
  };

  const deleteSelected = (selected) => {
    setWorkbenchData(workbenchData.filter((e) => !selected.includes(e.id)));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (response.ok) {
        const result = await response.json();
        setOriginalData(result);
        setWorkbenchData(result);
      } else {
        setErrorMessage("Unable to fetch user data, try again later.");
      }
      setIsLoading(false);
    };
    setErrorMessage("");
    setIsLoading(true);
    fetchUsers();
  }, []);

  const editRequest = (id) => {
    setEditRowData(originalData.find((e) => e.id === id));
    setShowEditDialog(true);
  };

  useEffect(() => {
    const edit = (event) => {
      setWorkbenchData(
        workbenchData.map((e) => {
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

  let toShow = isLoading ? (
    <p className="text-sm">Loading...</p>
  ) : errorMessage ? (
    <p className="text-sm text-red-400">{errorMessage}</p>
  ) : workbenchData.length > 0 ? (
    <Table
      rows={workbenchData}
      onDelete={deleteRow}
      onEdit={editRequest}
      deleteSelected={deleteSelected}
    />
  ) : (
    <p className="text-sm text-red-600">No records found</p>
  );

  if (errorMessage)
    return <p className="text-sm text-red-400">{errorMessage}</p>;
  else if (isLoading) return;

  return (
    <main className="flex flex-col items-center max-w-6xl mx-auto m-4 gap-4">
      <SearchBar onChangeCallBack={searchOnChange} />
      {toShow}
      {showEditDialog && <EditDialog initialValue={editRowData} />}
    </main>
  );
}

export default App;
