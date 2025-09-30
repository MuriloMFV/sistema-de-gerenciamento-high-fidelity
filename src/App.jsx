import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import { useDB } from "./hooks/useDB";

export default function App() {
  const { catalog, setCatalog, clients, setClients, sales, setSales } = useDB();
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-neutral-950 text-white font-[Space_Grotesk]">
      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {page === "dashboard" && <Dashboard sales={sales} />}
        {page === "catalog" && <Catalog catalog={catalog} setCatalog={setCatalog} />}
        {page === "clients" && <Clients clients={clients} setClients={setClients} />}
        {page === "sales" && (
          <Sales
            catalog={catalog}
            clients={clients}
            sales={sales}
            setSales={setSales}
          />
        )}
        {page === "reports" && <Reports sales={sales} />}
      </main>
    </div>
  );
}
