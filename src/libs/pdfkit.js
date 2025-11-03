import PDFdocument from 'pdfkit';

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.text("Contenido del PDF");
  doc.end();

}
export default buildPDF;