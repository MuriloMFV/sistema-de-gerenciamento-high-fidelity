import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

export default function Reports({ sales }) {
  const total = sales.reduce((acc, s) => acc + s.price, 0);

  // Agrupar vendas por disco
  const salesByDisk = sales.reduce((acc, s) => {
    acc[s.disk] = (acc[s.disk] || 0) + s.price;
    return acc;
  }, {});

  // Dados para o gráfico de barras
  const barData = {
    labels: Object.keys(salesByDisk),
    datasets: [
      {
        label: "Faturamento por Disco (R$)",
        data: Object.values(salesByDisk),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de pizza
  const pieData = {
    labels: Object.keys(salesByDisk),
    datasets: [
      {
        label: "Participação nas Vendas",
        data: Object.values(salesByDisk),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

 return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

      {/* Resumo */}
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg mb-8">
        <p>Faturamento total: <strong>R$ {total.toFixed(2)}</strong></p>
        <p>Quantidade de vendas: {sales.length}</p>
      </div>

      <div className="flex gap-6">
        {/* Gráfico de Barras - Mais Largo */}
        <div className="w-[700px] h-96 bg-neutral-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Faturamento por Disco</h2>
          <Bar data={barData} />
        </div>

        {/* Gráfico de Pizza - Mais Alto */}
        <div className="w-80 h-[385px] bg-neutral-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Participação nas Vendas</h2>
          <Pie data={pieData} />
        </div>
      </div>

      <img src="/playlist.gif" alt="Legenda do Gráfico de Pizza" className="mt-4" />
    </div>
  );
}
