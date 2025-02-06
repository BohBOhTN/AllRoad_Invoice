import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

function App() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handlePaymentMethods = (methods) => {
    setPaymentMethods(methods);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <InvoiceForm onPaymentMethodsChange={handlePaymentMethods} />
      <InvoicePreview paymentMethods={paymentMethods} />
    </div>
  );
}

export default App;