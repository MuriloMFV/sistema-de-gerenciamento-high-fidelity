import { useState } from "react";

// Clientes de exemplo
const initialClients = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-1234",
    address: "Rua das Flores, 123 - São Paulo, SP",
    cpf: "123.456.789-00",
    birthDate: "1990-05-15"
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(21) 98888-5678",
    address: "Av. Brasil, 456 - Rio de Janeiro, RJ",
    cpf: "987.654.321-00",
    birthDate: "1985-08-22"
  },
  {
    id: 3,
    name: "Marina Costa",
    email: "marina.costa@email.com",
    phone: "(31) 97777-9012",
    address: "Praça da Liberdade, 789 - Belo Horizonte, MG",
    cpf: "456.789.123-00",
    birthDate: "1992-12-03"
  }
];

export default function Clients({ clients, setClients }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Inicializa com clientes de exemplo se a lista estiver vazia
  useState(() => {
    if (clients.length === 0) {
      setClients(initialClients);
    }
  }, []);

  // Filtrar clientes baseado na busca
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf.includes(searchTerm)
  );

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const addClient = () => {
    if (!name || !email) return alert("Preencha pelo menos nome e e-mail!");
    
    const newClient = {
      id: Date.now(),
      name,
      email,
      phone: phone || "Não informado",
      address: address || "Não informado",
      cpf: cpf || "Não informado",
      birthDate: birthDate || "Não informado"
    };
    
    setClients([...clients, newClient]);
    resetForm();
  };

  const updateClient = () => {
    if (!name || !email) return alert("Preencha pelo menos nome e e-mail!");
    
    const updatedClients = clients.map(client =>
      client.id === editingId
        ? {
            ...client,
            name,
            email,
            phone: phone || client.phone,
            address: address || client.address,
            cpf: cpf || client.cpf,
            birthDate: birthDate || client.birthDate
          }
        : client
    );
    
    setClients(updatedClients);
    cancelEdit();
  };

  const deleteClient = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const editClient = (client) => {
    setEditingId(client.id);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone !== "Não informado" ? client.phone : "");
    setAddress(client.address !== "Não informado" ? client.address : "");
    setCpf(client.cpf !== "Não informado" ? client.cpf : "");
    setBirthDate(client.birthDate !== "Não informado" ? client.birthDate : "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCpf("");
    setBirthDate("");
  };

  const clearAll = () => {
    if (window.confirm("Tem certeza que deseja limpar toda a lista de clientes?")) {
      setClients([]);
    }
  };

  const resetToDefault = () => {
    setClients(initialClients);
  };

  const formatDate = (dateString) => {
    if (dateString === "Não informado") return dateString;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cadastro de Clientes</h1>
        <div className="flex gap-2">
          <button 
            onClick={clearAll}
            className="bg-orange-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Limpar Campos
          </button>
          <button 
            onClick={resetToDefault}
            className="bg-orange-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Restaurar Clientes
          </button>
        </div>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Pesquisar por nome, e-mail ou CPF..."
          className="w-full p-3 rounded bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700"
        />
      </div>

      {/* Formulário de adição/edição */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Editar Cliente" : "Adicionar Novo Cliente"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo *"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail *"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="Telefone (opcional)"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
            maxLength={15}
          />
          <input
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            placeholder="CPF (opcional)"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
            maxLength={14}
          />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Data de nascimento"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Endereço completo (opcional)"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400 md:col-span-2 lg:col-span-1"
          />
        </div>
        <div className="flex gap-2">
          {editingId ? (
            <>
              <button 
                onClick={updateClient} 
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Atualizar Cliente
              </button>
              <button 
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button 
              onClick={addClient} 
              className="bg-orange-600 hover:bg-green-700 px-6 py-3 rounded font-semibold transition-colors"
            >
              Adicionar Cliente
            </button>
          )}
        </div>
        <p className="text-sm text-neutral-400 mt-2">* Campos obrigatórios</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">{clients.length}</p>
          <p className="text-neutral-400">Total de Clientes</p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">
            {clients.filter(client => client.phone !== "Não informado").length}
          </p>
          <p className="text-neutral-400">Com Telefone</p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">
            {clients.filter(client => client.cpf !== "Não informado").length}
          </p>
          <p className="text-neutral-400">Com CPF</p>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">
                    {client.name}
                  </h3>
                  <p className="text-green-400 font-semibold">{client.email}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => editClient(client)}
                    className="bg-blue-600 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    title="Editar cliente"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    title="Deletar cliente"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">📞</span>
                  <span className="text-neutral-300">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">🆔</span>
                  <span className="text-neutral-300">{client.cpf}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">🎂</span>
                  <span className="text-neutral-300">{formatDate(client.birthDate)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-400 mt-1">📍</span>
                  <span className="text-neutral-300 text-xs flex-1">{client.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          {searchTerm ? (
            <>
              <p className="text-neutral-400 text-lg">Nenhum cliente encontrado para "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Limpar Pesquisa
              </button>
            </>
          ) : (
            <>
              <p className="text-neutral-400 text-lg">Nenhum cliente cadastrado</p>
              <button 
                onClick={resetToDefault}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Carregar Clientes de Exemplo
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}