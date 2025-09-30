import { useState } from "react";

// Discos pré-cadastrados
const initialCatalog = [
  {
    id: 1,
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "https://vinils3.s3.amazonaws.com/wp-content/uploads/2019/03/11125200/michael-jackson-thriller3.jpg",
    year: 1982,
    price: 89.90
  },
  {
    id: 2,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover: "https://upload.wikimedia.org/wikipedia/pt/3/3b/Dark_Side_of_the_Moon.png",
    year: 1973,
    price: 79.90
  },
  {
    id: 3,
    title: "Abbey Road",
    artist: "The Beatles",
    cover: "https://m.media-amazon.com/images/I/81sBKBIcwvL._UF1000,1000_QL80_.jpg",
    year: 1969,
    price: 95.50
  },
  {
    id: 4,
    title: "Back in Black",
    artist: "AC/DC",
    cover: "https://upload.wikimedia.org/wikipedia/pt/b/b6/Back_in_Black.jpg",
    year: 1980,
    price: 69.90
  },

  {
    id: 5,
    title: "Rumours",
    artist: "Fleetwood Mac",
    cover: "https://m.media-amazon.com/images/I/71274uOsBUL._UF1000,1000_QL80_.jpg",
    year: 1977,
    price: 74.90
  },

  {
    id: 6,
    title: "The Score",
    artist: "FUgees",
    cover: "https://images.tcdn.com.br/img/img_prod/435678/lp_vinil_fugees_the_score_7539_1_8a410fb6280a0ce5dfef427ec24895cd.jpg",
    year: 1996,
    price: 82.00
  },

  {
    id: 7,
    title: "Hotel California",
    artist: "Eagles",   
    cover: "https://m.media-amazon.com/images/I/71rYYgYnr2L._UF1000,1000_QL80_.jpg",
    year: 1976,
    price: 78.90
  },

  {
    id: 8,
    title: "Acustico MTV - Marcelo D2",
    artist: "Marcelo D2",    
    cover: "https://bazardolivrousado.com.br/wp-content/uploads/2025/08/download-5.jpg",
    year: 2004,
    price: 88.00
  }


];

export default function Catalog({ catalog, setCatalog }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Inicializa com discos pré-cadastrados se o catálogo estiver vazio
  useState(() => {
    if (catalog.length === 0) {
      setCatalog(initialCatalog);
    }
  }, []);

  // Filtrar discos baseado na busca
  const filteredCatalog = catalog.filter(disk =>
    disk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disk.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addDisk = () => {
    if (!title || !artist) return alert("Preencha pelo menos título e artista!");
    
    const newDisk = {
      id: Date.now(),
      title,
      artist,
      cover: cover || "https://via.placeholder.com/150x150/333333/FFFFFF?text=Sem+Capa",
      year: year || new Date().getFullYear(),
      price: price ? parseFloat(price) : 0
    };
    
    setCatalog([...catalog, newDisk]);
    resetForm();
  };

  const updateDisk = () => {
    if (!title || !artist) return alert("Preencha pelo menos título e artista!");
    
    const updatedCatalog = catalog.map(disk =>
      disk.id === editingId
        ? {
            ...disk,
            title,
            artist,
            cover: cover || disk.cover,
            year: year || disk.year,
            price: price ? parseFloat(price) : disk.price
          }
        : disk
    );
    
    setCatalog(updatedCatalog);
    cancelEdit();
  };

  const deleteDisk = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este disco?")) {
      setCatalog(catalog.filter(disk => disk.id !== id));
    }
  };

  const editDisk = (disk) => {
    setEditingId(disk.id);
    setTitle(disk.title);
    setArtist(disk.artist);
    setCover(disk.cover);
    setYear(disk.year);
    setPrice(disk.price.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setCover("");
    setYear("");
    setPrice("");
  };

  const clearAll = () => {
    if (window.confirm("Tem certeza que deseja limpar todo o catálogo?")) {
      setCatalog([]);
    }
  };

  const resetToDefault = () => {
    setCatalog(initialCatalog);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estoque de Discos</h1>
        <div className="flex gap-2">
          <button 
            onClick={clearAll}
            className="bg-orange-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Limpar Tudo
          </button>
          <button 
            onClick={resetToDefault}
            className="bg-orange-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Restaurar Catálogo
          </button>
        </div>
      </div>

      {/* Barra de pesquisa */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Pesquisar por título ou artista..."
          className="w-full p-3 rounded bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700"
        />
      </div>

      {/* Formulário de adição/edição */}
      <div className="bg-neutral-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Editar Disco" : "Adicionar Novo Disco"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do álbum *"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artista *"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="URL da capa (opcional)"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ano"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
            min="1900"
            max={new Date().getFullYear()}
          />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço R$"
            className="p-3 rounded bg-neutral-700 text-white placeholder-neutral-400"
            min="0"
          />
        </div>
        <div className="flex gap-2">
          {editingId ? (
            <>
              <button 
                onClick={updateDisk} 
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Atualizar Disco
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
              onClick={addDisk} 
              className="bg-orange-600 hover:bg-red-700 px-6 py-3 rounded font-semibold transition-colors"
            >
              Adicionar Disco
            </button>
          )}
        </div>
        <p className="text-sm text-neutral-400 mt-2">* Campos obrigatórios</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">{catalog.length}</p>
          <p className="text-neutral-400">Total de Discos</p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">
            {formatPrice(catalog.reduce((total, disk) => total + disk.price, 0))}
          </p>
          <p className="text-neutral-400">Valor Total</p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">
            {catalog.length > 0 
              ? formatPrice(catalog.reduce((total, disk) => total + disk.price, 0) / catalog.length)
              : formatPrice(0)
            }
          </p>
          <p className="text-neutral-400">Preço Médio</p>
        </div>
      </div>

      {/* Lista de discos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCatalog.map((disk) => (
          <div
            key={disk.id}
            className="bg-neutral-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="relative">
              <img
                src={disk.cover}
                alt={`Capa do álbum ${disk.title}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x150/333333/FFFFFF?text=Sem+Capa";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => editDisk(disk)}
                  className="bg-blue-600 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  title="Editar disco"
                >
                  ✎
                </button>
                <button
                  onClick={() => deleteDisk(disk.id)}
                  className="bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  title="Deletar disco"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-white mb-1 truncate">
                {disk.title}
              </h3>
              <p className="text-neutral-300 mb-2 truncate">
                {disk.artist}
              </p>
              <div className="flex justify-between items-center">
                {disk.year && (
                  <p className="text-sm text-neutral-400">
                    {disk.year}
                  </p>
                )}
                <p className="text-lg font-bold text-green-400">
                  {formatPrice(disk.price)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCatalog.length === 0 && (
        <div className="text-center py-12">
          {searchTerm ? (
            <>
              <p className="text-neutral-400 text-lg">Nenhum disco encontrado para "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Limpar Pesquisa
              </button>
            </>
          ) : (
            <>
              <p className="text-neutral-400 text-lg">Nenhum disco no catálogo</p>
              <button 
                onClick={resetToDefault}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition-colors"
              >
                Carregar Discos de Exemplo
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}