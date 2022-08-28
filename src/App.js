import { SearchBar } from "./lib/components/SearchBar";
import { Table } from "./lib/components/Table";
import { mockResponseData } from "./lib/utils/data";

function App() {
  return (
    <main className="flex flex-col items-center max-w-6xl mx-auto m-4 gap-4">
      <SearchBar />
      <Table rows={mockResponseData} />
    </main>
  );
}

export default App;
