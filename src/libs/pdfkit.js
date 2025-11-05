import PDFdocument from 'pdfkit';


export function buildPDFEstudiante(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.image('./src/img/logousb.png', { align: 'center', valign: 'center' });
  doc.text("Contenido del PDF");
  
  doc.end();

};

export  function buildPDFAdmin(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.image('./src/img/logousb.png', { align: 'center', valign: 'center' });
  doc.text("Contenido del PDF");
  
  doc.end();

};

export  function buildPDFDocenteGuia(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  //doc.image('./src/img/logousb.png', { align: 'center', valign: 'center' });
  doc.text("Contenido del PDF");

  doc.end();

};

export  function buildPDFDocenteRevisor(dataCallback, endCallback) {
  const doc = new PDFdocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.image('./src/img/logousb.png', { align: 'center', valign: 'center' });
  doc.text("Contenido del PDF");
  
  doc.end();

};

