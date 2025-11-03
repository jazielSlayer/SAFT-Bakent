import PDFdocument from 'pdfkit';


function buildPDF(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.text("Contenido del PDF");
  doc.image('./img/logousb.png', { fit: [250, 300], align: 'center', valign: 'center' });
  
  doc.end();

}
export default buildPDF;