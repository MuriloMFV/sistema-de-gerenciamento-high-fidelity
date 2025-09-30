import { Disc, Users, ShoppingCart, BarChart, Home } from "lucide-react";

export default function Sidebar({ setPage }) {
  return (
    <aside className="w-64 bg-neutral-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-6 border-b border-neutral-800">
        <img src="./src/assets/High-fidelity-movie-logo.webp" alt="Logo" />
      </h2>
      <nav className="flex flex-col gap-2 p-4">
        <button
          onClick={() => setPage("dashboard")}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg"
        >
          <Home size={20} /> Dashboard
        </button>
        <button
          onClick={() => setPage("catalog")}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg"
        >
          <Disc size={20} /> Catálogo
        </button>
        <button
          onClick={() => setPage("clients")}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg"
        >
          <Users size={20} /> Clientes
        </button>
        <button
          onClick={() => setPage("sales")}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg"
        >
          <ShoppingCart size={20} /> Vendas
        </button>
        <button
          onClick={() => setPage("reports")}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 rounded-lg"
        >
          <BarChart size={20} /> Relatórios
        </button>
      </nav>
    </aside>
  );
}
