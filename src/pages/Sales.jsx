import { useState } from "react";
import InvoiceModal from "./InvoiceModal"; 

export default function Sales({ catalog, clients, sales, setSales }) {
  const [client, setClient] = useState("");
  const [disk, setDisk] = useState("");
  const [price, setPrice] = useState("");
  const [invoiceData, setInvoiceData] = useState(null); 

  // NOVA FUNÇÃO: Gerencia a mudança de disco e define o preço
  const handleDiskChange = (e) => {
    const selectedTitle = e.target.value;
    setDisk(selectedTitle); // Salva o título selecionado

    // 1. Encontra o disco completo no catálogo
    const selectedDisk = catalog.find(d => d.title === selectedTitle);
    
    if (selectedDisk) {
      // 2. Define o preço automaticamente (e formata para duas casas decimais)
      setPrice(selectedDisk.price.toFixed(2)); 
    } else {
      setPrice(""); // Limpa o preço se nada for selecionado
    }
  };


  const addSale = () => {
    // Agora o preço já estará preenchido (ou vazio, se for "Selecione o disco")
    if (!client || !disk || !price) return alert("Preencha todos os campos!");
    
    // Encontra o objeto completo do disco baseado no título
    const selectedDisk = catalog.find(d => d.title === disk);

    if (!selectedDisk) return alert("Disco selecionado não encontrado no catálogo. Tente novamente.");

    const newSale = { 
      id: Date.now(), 
      client, 
      disk: selectedDisk.title, 
      diskId: selectedDisk.id, 
      // Usa o preço do estado, que já foi formatado/preenchido
      price: parseFloat(price), 
      date: new Date().toLocaleDateString('pt-BR'), 
    };

    setSales([...sales, newSale]);
    setClient("");
    setDisk("");
    setPrice("");
  };

  const issueInvoice = (sale) => {
    setInvoiceData(sale);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vendas</h1>
      <div className="flex gap-3 mb-6">
        {/* Seletor de Cliente (inalterado) */}
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="p-2 rounded bg-neutral-800 text-white"
        >
          <option value="">Selecione o cliente</option>
          {clients.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Seletor de Disco (AGORA COM handleDiskChange) */}
        <select
          value={disk}
          // CHAME a nova função aqui!
          onChange={handleDiskChange} 
          className="p-2 rounded bg-neutral-800 text-white"
        >
          <option value="">Selecione o disco</option>
          {catalog.map((d) => (
            <option key={d.id} value={d.title}>{d.title}</option>
          ))}
        </select>

        {/* Campo de Preço (Agora preenchido, mas ainda editável se necessário) */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço"
          type="number"
          className="p-2 rounded bg-neutral-800 text-white w-24"
        />

        <button onClick={addSale} className="bg-orange-600 px-4 py-2 rounded">
          Registrar Venda
        </button>
      </div>
      
      {/* ... O restante do componente permanece o mesmo ... */}
      <ul className="space-y-2">
        {sales.map((s) => (
          <li key={s.id} className="p-3 bg-neutral-900 rounded-lg shadow flex justify-between items-center">
            <span>
                {s.client} comprou <strong>{s.disk}</strong> por R$ {s.price.toFixed(2)} ({s.date})
            </span>
            <button 
                onClick={() => issueInvoice(s)} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
                Emitir Nota
            </button>
          </li>
        ))}
      </ul>

      {invoiceData && (
        <InvoiceModal sale={invoiceData} onClose={() => setInvoiceData(null)} />
      )}
    </div>
  );
}