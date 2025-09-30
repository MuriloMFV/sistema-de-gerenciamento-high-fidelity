export default function Reports({ sales }) {
  const total = sales.reduce((acc, s) => acc + s.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
        <p>Faturamento total: <strong>R$ {total.toFixed(2)}</strong></p>
        <p>Quantidade de vendas: {sales.length}</p>
      </div>
      <img src="./src/assets/playlist.gif" alt="Relatórios" className="mt-6 w-full max-w-md" />
    </div>
  );
}
