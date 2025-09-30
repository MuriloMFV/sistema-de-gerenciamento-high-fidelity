export default function Dashboard({ sales }) {
  const totalVendas = sales.reduce((acc, s) => acc + s.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6" ></h1>
      <h1 className="text-2xl font-bold mt-10">Bem-vindo ao High Fidelity</h1>
      <p className="mt-4 text-neutral-300">
        Explore nosso sistema de gerenciamento de vendas de discos, onde você pode gerenciar seu catálogo, clientes e acompanhar suas vendas com facilidade.

Este projeto foi desenvolvido como um estudo prático em React, inspirado na loja Championship Vinyl do filme "Alta Fidelidade" (High Fidelity). Embora seja uma loja fictícia, o sistema apresenta funcionalidades robustas de gestão, com o objetivo de aplicar e aprofundar conhecimentos em desenvolvimento front-end.

      </p>
      <h2 className="text-xl font-semibold mt-10 mb-4">Resumo de Vendas</h2>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
        <p>Total de vendas: <strong>R$ {totalVendas.toFixed(2)}</strong></p>
        <p>Número de transações: {sales.length}</p>
      </div>
      
      
      <img src="./src/assets/high_fidelity_t.jpg" alt="Dashboard Visual" className="mt-6 rounded-lg shadow-lg"  />
    </div>

    
  );
}
