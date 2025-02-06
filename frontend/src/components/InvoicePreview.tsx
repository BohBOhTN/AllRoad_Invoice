import React from 'react';
import type { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  isOpen: boolean;
  onClose: () => void;
}

function InvoicePreview({ invoice, isOpen, onClose }: InvoicePreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg overflow-y-auto max-h-[90vh]">
        {/* Invoice Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">FACTURE</h1>
            <div className="space-y-1">
              <p className="font-bold">ALLROAD</p>
              <p>268-270 rue de brémenent</p>
              <p>93110 Rosny-Sous-Bois, France</p>
              <p>Siret: 84422444400035</p>
              <p>Email: allroad74trans@gmail.com</p>
            </div>
          </div>
          <div className="text-right">
            <img src="/allroad-logo.png" alt="ALLROAD" className="w-32 mb-4" />
            <p className="font-bold">FACTURE N° : {invoice.number}</p>
            <p>DATE : {invoice.date}</p>
            <p>N° TVA : FR82383960135</p>
            <p>N° client : CLT004</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-2">CHRONOPOST</h2>
            <p>2 CHEMIN DES VIGNES</p>
            <p>74330 LA BALME-DE-SILLINGY, FRANCE</p>
            <p>Siret : 38396013501745</p>
          </div>
        </div>

        {/* Invoice Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Libellé</th>
              <th className="text-right py-2">Prix Unitaire</th>
              <th className="text-right py-2">Quantité</th>
              <th className="text-right py-2">Montant HT</th>
              <th className="text-right py-2">TVA</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.itemId}</td>
                <td className="text-right py-2">{item.unitPrice.toFixed(2)}€</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">{item.total.toFixed(2)}€</td>
                <td className="text-right py-2">20.00%</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1">
              <span>TOTAL HT :</span>
              <span>{invoice.subtotal?.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between py-1">
              <span>TVA 20% :</span>
              <span>{invoice.tax?.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between py-1">
              <span>REMISE :</span>
              <span>0.00€</span>
            </div>
            <div className="flex justify-between py-1 font-bold">
              <span>TOTAL TTC :</span>
              <span>{invoice.total?.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        {/* TVA Details */}
        <div className="mb-8">
          <table className="w-full bg-gray-100">
            <thead>
              <tr>
                <th className="text-left p-2">Code</th>
                <th className="text-right p-2">Base HT</th>
                <th className="text-right p-2">Taux</th>
                <th className="text-right p-2">Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Normal</td>
                <td className="text-right p-2">{invoice.subtotal?.toFixed(2)}€</td>
                <td className="text-right p-2">20.00%</td>
                <td className="text-right p-2">{invoice.tax?.toFixed(2)}€</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="mb-8">
          <p className="font-bold">RÈGLEMENT : virement de {invoice.total?.toFixed(2)}€</p>
          <p>ECHÉANCE : {invoice.payments?.[0]?.dueDate}</p>
        </div>

        {/* Bank Details */}
        <div className="bg-red-600 text-white p-4 -mx-8 -mb-8">
          <h3 className="font-bold mb-2">Coordonnées bancaires</h3>
          <p>Nom: SUMLIP</p>
          <p>IBAN: FR11SUMU9903651124369B</p>
          <p>BIC: SUMUJE22XXX</p>
        </div>

        {/* Footer */}
        <div className="text-xs text-center mt-4">
          <p>Code NAF (APE) 5229B - N° RCS 844 224 444 R.C.S. Bobigny - SASU au capital social de 31 500,00 € -</p>
          <p>Siret : 84422444400035 - N° TVA FR46844224444</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default InvoicePreview;