import React from "react";

export default function InvoiceModal({ sale, onClose }) {
  // Função que usa o recurso de impressão nativo do navegador
  const handlePrint = () => {
    window.print();
  };

  if (!sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 print:bg-transparent print:block">
      {/* Estilos extras apenas para impressão */}
      <style>
        {`
          @media print {
            @page {
              margin: 10mm; /* margem reduzida no papel */
            }
            body {
              margin: 0;
              -webkit-print-color-adjust: exact; /* mantém cores */
              color-adjust: exact;
            }
          }
        `}
      </style>

      {/* Caixa do modal (oculta na impressão, só mostra o conteúdo da nota) */}
      <div className="bg-neutral-800 p-8 rounded-lg max-w-lg w-full print:bg-transparent print:p-0 print:shadow-none">
        {/* Botões de controle - não aparecem na impressão */}
        <div className="flex justify-end gap-3 mb-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Imprimir Nota
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>

        {/* Conteúdo da Nota Fiscal (será impresso) */}
        <div
          id="invoice-content"
          className="p-6 bg-white text-black rounded print:p-0 print:rounded-none print:shadow-none"
        >
          {/* Cabeçalho */}
          <h2 className="text-2xl font-bold mb-2 border-b pb-2 text-center">
            HIGH FIDELITY – RECIBO DE VENDA
          </h2>
          <p className="text-sm text-center mb-6">
            *Não tem valor fiscal. Projeto de Estudo React*
          </p>

          {/* Dados da venda */}
          <div className="mb-6">
            <p>
              <strong>Nº do Recibo:</strong> {sale.id}
            </p>
            <p>
              <strong>Data da Venda:</strong> {sale.date}
            </p>
            <p>
              <strong>Cliente:</strong> {sale.client}
            </p>
            <p>
              <strong>Vendedor:</strong> Rob Gordon (Sistema Fictício)
            </p>
          </div>

          {/* Tabela */}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">Item</th>
                <th className="p-2 border text-left">Cod.</th>
                <th className="p-2 border text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">{sale.disk}</td>
                <td className="p-2 border">{sale.diskId}</td>
                <td className="p-2 border text-right">
                  R$ {sale.price.toFixed(2)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan="2" className="p-2 border text-right">
                  Total Pago:
                </td>
                <td className="p-2 border text-right">
                  R$ {sale.price.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Mensagem final */}
          <div className="mt-8 pt-4 border-t text-center text-sm">
            Obrigado por comprar na <strong>High Fidelity</strong>!  
            <br />
            Esperamos que este disco entre para sua lista de{" "}
            <em>"Top Fives"</em>!
          </div>
        </div>
      </div>
    </div>
  );
}
