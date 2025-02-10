import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import type { Invoice } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  isOpen: boolean;
  onClose: () => void;
}

function InvoicePreview({ invoice, isOpen, onClose }: InvoicePreviewProps) {
  if (!isOpen) return null;

  const handleDownloadInvoice = () => {
    const input = document.getElementById("invoice-content");
    if (!input) return;
    html2canvas(input, { useCORS: true, allowTaint: false }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const bottomMargin = 15; // reserve space for page number and safe margin
      const availableHeight = pageHeight - bottomMargin;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= availableHeight;
      
      // Add remaining pages with margin at top
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + bottomMargin;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= availableHeight;
      }
      
      // Add page numbers at the bottom of each page
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
      }
      pdf.save(`invoice_${invoice.number || "unknown"}.pdf`);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h4" component="div">FACTURE</Typography>
        {/* Download Button */}
        <IconButton
          aria-label="download"
          onClick={handleDownloadInvoice}
          sx={{
            position: 'absolute',
            right: 48,
            top: 8,
          }}
        >
          <DownloadIcon />
        </IconButton>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Card variant="outlined" sx={{ p: 2 }}>
          <CardContent id="invoice-content">
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={3}>
              {/* Left: Company Info */}
              <Box>
                <img src="/allroad-logo.png" alt="ALLROAD" style={{ width: 120 }} />
                <Typography variant="h5" fontWeight="bold">ALLROAD</Typography>
                <Typography variant="body2">268-270 rue de brémenent</Typography>
                <Typography variant="body2">93110 Rosny-Sous-Bois, France</Typography>
                <Typography variant="body2">Siret: 84422444400035</Typography>
                <Typography variant="body2">Email: allroad74trans@gmail.com</Typography>
              </Box>
              {/* Right: Invoice and Client Info */}
              <Box textAlign="right">
                {/* Invoice Info */}
                <Box mb={2}>
                  <Typography variant="h5" fontWeight="bold">FACTURE N° : {invoice.number}</Typography>
                  <Typography variant="h6" fontWeight="bold">DATE : {invoice.date}</Typography>
                  <Typography variant="body2">N° TVA : FR82383960135</Typography>
                </Box>
                {/* Client Info and Logo */}
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                  <Box mr={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {invoice.clientName || "Acme Corp"}
                    </Typography>
                    <Typography variant="body2">
                      {invoice.clientAddress || "268-270 rue de brémenent"}
                    </Typography>
                    <Typography variant="body2">
                      {invoice.clientCity || "93110 Rosny-Sous-Bois, France"}
                    </Typography>
                    <Typography variant="body2">
                      {invoice.clientSiret || "Siret: 84422444400035"}
                    </Typography>
                    <Typography variant="body2">
                      {invoice.clientEmail || "Email: allroad74trans@gmail.com"}
                    </Typography>
                  </Box>
                  <Box>
                    <img 
                      src="https://picsum.photos/80" 
                      alt="Client Logo" 
                      crossOrigin="anonymous"
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} 
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Invoice Items */}
            <Table sx={{ mb: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Libellé</TableCell>
                  <TableCell align="right">Prix Unitaire</TableCell>
                  <TableCell align="right">Quantité</TableCell>
                  <TableCell align="right">Montant HT</TableCell>
                  <TableCell align="right">TVA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.customName || 'N/A'}</TableCell>
                    <TableCell align="right">{item.unitPrice.toFixed(2)}€</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.total.toFixed(2)}€</TableCell>
                    <TableCell align="right">20.00%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totals */}
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <Box width={240}>
                <Box display="flex" justifyContent="space-between" py={0.5}>
                  <Typography variant="body2">TOTAL HT :</Typography>
                  <Typography variant="body2">{invoice.subtotal?.toFixed(2)}€</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" py={0.5}>
                  <Typography variant="body2">TVA 20% :</Typography>
                  <Typography variant="body2">{invoice.tax?.toFixed(2)}€</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" py={0.5}>
                  <Typography variant="body2">REMISE :</Typography>
                  <Typography variant="body2">0.00€</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" py={0.5} fontWeight="bold">
                  <Typography variant="body1">TOTAL TTC :</Typography>
                  <Typography variant="body1">{invoice.total?.toFixed(2)}€</Typography>
                </Box>
              </Box>
            </Box>

            {/* TVA Details */}
            <Box mb={3}>
              <Table size="small" sx={{ backgroundColor: 'grey.100' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell align="right">Base HT</TableCell>
                    <TableCell align="right">Taux</TableCell>
                    <TableCell align="right">Montant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Normal</TableCell>
                    <TableCell align="right">{invoice.subtotal?.toFixed(2)}€</TableCell>
                    <TableCell align="right">20.00%</TableCell>
                    <TableCell align="right">{invoice.tax?.toFixed(2)}€</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            {/* Payment Details */}
            <Box mb={3}>
              <Typography variant="body2" fontWeight="bold">
                RÈGLEMENT : virement de {invoice.total?.toFixed(2)}€
              </Typography>
              <Typography variant="body2">
                ECHÉANCE : {invoice.payments?.[0]?.dueDate}
              </Typography>
            </Box>

            {/* Bank Details */}
            <Box mb={3} p={2} bgcolor="error.main" color="white" borderRadius={1}>
              <Typography variant="h6" fontWeight="bold" mb={1}>Coordonnées bancaires</Typography>
              <Typography variant="body2">
                Nom: {invoice.bankDetails?.name || 'N/A'}
              </Typography>
              <Typography variant="body2">
                IBAN: {invoice.bankDetails?.iban || 'N/A'}
              </Typography>
              <Typography variant="body2">
                BIC: {invoice.bankDetails?.bic || 'N/A'}
              </Typography>
            </Box>

            {/* Footer */}
            <Box textAlign="center">
              <Typography variant="caption">
                Code NAF (APE) 5229B - N° RCS 844 224 444 R.C.S. Bobigny - SASU au capital social de 31 500,00 € -
              </Typography>
              <Typography variant="caption">
                Siret : 84422444400035 - N° TVA FR46844224444
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default InvoicePreview;