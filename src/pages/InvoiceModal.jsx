// Crie este arquivo na mesma pasta que Sales.jsx
import React from 'react';

export default function InvoiceModal({ sale, onClose }) {

  // Função que usa o recurso de impressão nativo do navegador
  const handlePrint = () => {
    window.print();
  };

  if (!sale) return null;

  return (
    // O modal (A parte que não deve ser impressa)
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 print:hidden">
      <div className="bg-neutral-800 p-8 rounded-lg max-w-lg w-full">
        
        {/* Botão de Fechar e Imprimir (Não visível na impressão) */}
        <div className="flex justify-end gap-3 mb-4">
            <button 
                onClick={handlePrint} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Imprimir Nota
            </button>
            <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Fechar
            </button>
        </div>

        {/* Conteúdo da Nota Fiscal (Div que será impressa) */}
        <div id="invoice-content" className="p-6 bg-white text-black print:block print:w-full print:p-0">
          
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-center">
            VINYL VIBE RECIBO DE VENDA
          </h2>
          <p className="text-sm text-center mb-4">
            *Não tem valor fiscal. Projeto de Estudo React*
          </p>

          <div className="mb-4">
            <p><strong>Nº do Recibo:</strong> {sale.id}</p>
            <p><strong>Data da Venda:</strong> {sale.date}</p>
            <p><strong>Cliente:</strong> {sale.client}</p>
            <p><strong>Vendedor:</strong> Rob Gordon (Sistema Fictício)</p>
          </div>

          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Cod.</th>
                <th className="p-2 border text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">{sale.disk}</td>
                <td className="p-2 border">{sale.diskId}</td>
                <td className="p-2 border text-right">R$ {sale.price.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan="2" className="p-2 border text-right">Total Pago:</td>
                <td className="p-2 border text-right">R$ {sale.price.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-8 pt-4 border-t text-center text-sm">
            Obrigado por comprar na Championship Vinyl!
            <br/>
            Esperamos que este disco entre para sua lista de "Top Fives"!
          </div>
        </div>

      </div>
    </div>
  );
}