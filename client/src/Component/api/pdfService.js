import html2canvas from 'html2canvas';
import { PDFDocument, PageSizes } from 'pdf-lib';

class PDFService {
  static A4_DIMENSIONS = {
    width: PageSizes.A4[0],
    height: PageSizes.A4[1]
  };

  static DEFAULT_OPTIONS = {
    margins: { top: 40, right: 40, bottom: 40, left: 40 },
    backgroundColor: '#ffffff',
    rowHeight: 30,
    headerHeight: 100,
    scale: 2
  };

  // Maintain backward compatibility with the old method name
  static async downloadComponentAsPDF(elementId, filename = 'download.pdf', options = {}) {
    return this.generatePDF(elementId, filename, options);
  }

  static async generatePDF(elementId, filename = 'download.pdf', options = {}) {
    const settings = { ...this.DEFAULT_OPTIONS, ...options };
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element "${elementId}" not found`);

    try {
      const pages = await this.#preparePages(element, settings);
      const pdfDoc = await this.#createPDFDocument(pages, settings);
      await this.#downloadPDF(pdfDoc, filename);
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  }

  static #createContainer(settings) {
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: `${this.A4_DIMENSIONS.width}px`,
      backgroundColor: settings.backgroundColor
    });
    return container;
  }

  static #cloneElement(element) {
    const clone = element.cloneNode(true);
    Object.assign(clone.style, {
      margin: '0',
      padding: '0',
      transform: 'none',
      position: 'relative',
      width: '100%'
    });
    return clone;
  }

  static async #preparePages(element, settings) {
    const clone = this.#cloneElement(element);
    const tableBody = clone.querySelector('tbody');
    if (!tableBody) return [clone];

    const rows = Array.from(tableBody.children);
    const rowsPerPage = Math.floor(
      (this.A4_DIMENSIONS.height - settings.margins.top - settings.margins.bottom - settings.headerHeight) 
      / settings.rowHeight
    );

    return Array.from({ length: Math.ceil(rows.length / rowsPerPage) }, (_, i) => {
      const pageContent = clone.cloneNode(true);
      const pageTableBody = pageContent.querySelector('tbody');
      pageTableBody.innerHTML = '';
      const pageRows = rows.slice(i * rowsPerPage, (i + 1) * rowsPerPage);
      pageRows.forEach(row => pageTableBody.appendChild(row.cloneNode(true)));
      return pageContent;
    });
  }

  static #addPageNumber(container, pageNum, totalPages) {
    const pageNumber = document.createElement('div');
    Object.assign(pageNumber.style, {
      textAlign: 'center',
      marginTop: '10px'
    });
    pageNumber.innerText = `Page ${pageNum} of ${totalPages}`;
    container.appendChild(pageNumber);
  }

  static async #capturePageContent(container, settings) {
    return html2canvas(container, {
      scale: settings.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: settings.backgroundColor,
      width: this.A4_DIMENSIONS.width,
      height: this.A4_DIMENSIONS.height
    });
  }

  static async #createPDFDocument(pages, settings) {
    const pdfDoc = await PDFDocument.create();
    const container = this.#createContainer(settings);
    document.body.appendChild(container);

    for (let i = 0; i < pages.length; i++) {
      container.innerHTML = '';
      container.appendChild(pages[i]);
      this.#addPageNumber(container, i + 1, pages.length);

      const canvas = await this.#capturePageContent(container, settings);
      const page = pdfDoc.addPage(PageSizes.A4);
      const pngImage = await pdfDoc.embedPng(canvas.toDataURL('image/png'));

      const contentWidth = this.A4_DIMENSIONS.width - settings.margins.left - settings.margins.right;
      const scaleFactor = contentWidth / canvas.width;
      const scaledHeight = canvas.height * scaleFactor;

      page.drawImage(pngImage, {
        x: settings.margins.left,
        y: this.A4_DIMENSIONS.height - scaledHeight - settings.margins.top,
        width: contentWidth,
        height: scaledHeight
      });
    }

    document.body.removeChild(container);
    return pdfDoc;
  }

  static async #downloadPDF(pdfDoc, filename) {
    const blob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }
}

export default PDFService;