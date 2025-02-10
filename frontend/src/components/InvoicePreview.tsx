import React from 'react';
import type { Invoice } from '../types';
import html2pdf from 'html2pdf.js';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  isOpen: boolean;
  onClose: () => void;
}

function InvoicePreview({ invoice, isOpen, onClose }: InvoicePreviewProps) {
  if (!isOpen) return null;

  const handleDownloadInvoice = () => {
    const element = document.getElementById("invoice-content");
    if (!element) return;
    // Adjust the space between "FACTURE" and invoice number for the PDF
    const invoiceNumberEl = element.querySelector('.invoice-number');
    const originalMargin = invoiceNumberEl ? invoiceNumberEl.style.marginTop : '';
    if (invoiceNumberEl) {
      invoiceNumberEl.style.marginTop = "20px"; // Increase space for PDF
    }
    const opt = {
      margin: 0,
      filename: `invoice_${invoice.number || "unknown"}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf: any) => {
      const pageCount = pdf.internal.getNumberOfPages();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(8);
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text(`Page ${i}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
      }
      pdf.save(opt.filename);
      // Revert the inline style change after PDF creation
      if (invoiceNumberEl) {
        invoiceNumberEl.style.marginTop = originalMargin;
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg overflow-auto max-w-[90%] max-h-[90%]">
        {/* Modal Header */}
        <div className="flex justify-end p-4">
          <button 
            onClick={handleDownloadInvoice}
            className="mr-2 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Download
          </button>
          <button 
            onClick={onClose}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Close
          </button>
        </div>
        {/* Modal Content */}
        <div id="invoice-content">
          {/* Added style for PDF-only header spacing */}
          <style>
            {`
              @media print {
                .invoice-number {
                  margin-top: 20px !important;
                }
              }
            `}
          </style>
          <div className="min-h-screen bg-white p-8">
            <div className="max-w-[800px] mx-auto border border-gray-200 shadow-sm">
              {/* Header Section */}
              <div className="p-6 flex justify-between items-start avoid-break">
                <div className="flex gap-6">
                  <div>
                    <h1 className="font-bold text-xl tracking-wide">ALLROAD</h1>
                    <p className="text-sm leading-5">268-270 rue de brémenét</p>
                    <p className="text-sm leading-5">93110 Rosny-Sous-Bois, France</p>
                    <p className="text-sm leading-5">Siret: 84422444400035</p>
                    <p className="text-sm leading-5 text-[#C41E3A]">Email: allroad74trans@gmail.com</p>
                  </div>
                  <div className="w-20 h-20">
                    <img 
                      src="/allroad-logo.png" 
                      alt="ALLROAD" 
                      className="w-full h-full" 
                    />
                  </div>
                </div>
                <div className="text-right">
                  <h1 className="text-7xl font-bold tracking-tight">FACTURE</h1>
                  <p className="text-sm mt-2 invoice-number">FACTURE N° : {invoice.number || "N/A"}</p>
                </div>
              </div>

              {/* Client Info Section */}
              <div className="px-6 py-4 avoid-break">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-0.5">
                    <p className="text-sm">DATE: {invoice.date || "N/A"}</p>
                    <p className="text-sm">N° TVA: FR82383960135</p>
                    <p className="text-sm">N° client: {invoice.clientId || "N/A"}</p>
                  </div>
                  <div>
                    <h2 className="font-bold text-base mb-1">
                      {invoice.clientName || "Client"}
                    </h2>
                    <p className="text-sm leading-5">
                      {invoice.clientAddress || "Client Address"}
                    </p>
                    <p className="text-sm leading-5">
                      {invoice.clientCity || "Client City"}
                    </p>
                    <p className="text-sm leading-5">
                      {invoice.clientSiret || "Client Siret"}
                    </p>
                    <img 
                      src={invoice.clientLogo || "https://picsum.photos/80"} 
                      alt="Client Logo" 
                      className="w-24 mt-4" 
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="px-6 py-4">
                <table className="w-full text-sm">
                  <thead className="avoid-break">
                    <tr>
                      <th className="text-left py-2 font-normal border-y border-black">Libellé</th>
                      <th className="text-right py-2 font-normal border-y border-black">Prix Unitaire</th>
                      <th className="text-right py-2 font-normal border-y border-black">Quantité</th>
                      <th className="text-right py-2 font-normal border-y border-black">Montant HT</th>
                      <th className="text-right py-2 font-normal border-y border-black">TVA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items?.map((item, index) => (
                      <tr key={index} className="border-b border-gray-300 avoid-break">
                        <td className="py-3">{item.customName || item.itemId || "Item"}</td>
                        <td className="text-right">
                          {item.unitPrice !== undefined ? item.unitPrice.toFixed(2) + "€" : "-"}
                        </td>
                        <td className="text-right">
                          {item.quantity || "-"}
                        </td>
                        <td className="text-right">
                          {item.total !== undefined ? item.total.toFixed(2) + "€" : "0.00€"}
                        </td>
                        <td className="text-right">20.00%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="px-6 py-4 avoid-break">
                <div className="flex justify-end">
                  <div className="w-64 text-right space-y-1">
                    <div className="flex justify-between">
                      <span>TOTAL HT:</span>
                      <span className="font-bold">
                        {invoice.subtotal !== undefined ? invoice.subtotal.toFixed(2) + "€" : "0.00€"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA 20%:</span>
                      <span className="font-bold">
                        {invoice.tax !== undefined ? invoice.tax.toFixed(2) + "€" : "0.00€"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>REMISE:</span>
                      <span className="font-bold">0.00€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TOTAL TTC:</span>
                      <span className="font-bold">
                        {invoice.total !== undefined ? invoice.total.toFixed(2) + "€" : "0.00€"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TVA Details */}
              <div className="px-6 py-4 bg-[#E5E5E5] avoid-break">
                <p className="font-bold mb-2">Détail de la TVA:</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left font-normal">Code</th>
                      <th className="text-right font-normal">Base HT</th>
                      <th className="text-right font-normal">Taux</th>
                      <th className="text-right font-normal">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="avoid-break">
                      <td>Normal</td>
                      <td className="text-right">
                        {invoice.subtotal !== undefined ? invoice.subtotal.toFixed(2) + "€" : "0.00€"}
                      </td>
                      <td className="text-right">20.00%</td>
                      <td className="text-right">
                        {invoice.tax !== undefined ? invoice.tax.toFixed(2) + "€" : "0.00€"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Details */}
              <div className="px-6 py-4 avoid-break">
                <p className="font-bold">
                  RÈGLEMENT : virement de {invoice.total !== undefined ? invoice.total.toFixed(2) + "€" : "0.00€"}
                </p>
                <p>
                  ECHÉANCE : {invoice.payments && invoice.payments[0] ? invoice.payments[0].dueDate : "N/A"}
                </p>
              </div>

              {/* Bank Details */}
              <div className="relative overflow-hidden avoid-break">
                <div className="absolute left-0 top-0 bottom-0 w-[400px] bg-[#C41E3A] transform origin-top-left skew-x-[20deg] -translate-x-[85px]"></div>
                <div className="px-6 py-4 relative z-10">
                  <p className="font-bold mb-2 text-black">Coordonnées bancaires:</p>
                  <div className="text-white">
                    <p>Nom: {invoice.bankDetails?.name || "N/A"}</p>
                    <p>IBAN: {invoice.bankDetails?.iban || "N/A"}</p>
                    <p>BIC: {invoice.bankDetails?.bic || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 text-center border-t border-gray-200 avoid-break">
                <p className="text-sm leading-6">
                  Code NAF (APE) 5229B - N° RCS 844 224 444 R.C.S. Bobigny - SASU au capital social de 31 500,00 € -
                </p>
                <p className="text-sm leading-6">
                  Siret: 84422444400035 - N° TVA FR46844224444
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;