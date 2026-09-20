import { ResumeData } from '@/types/resume';

export async function downloadPDF(resume: ResumeData): Promise<void> {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;

    // Temporarily scale up for better quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const pageHeightInPx = (pdfHeight / pdfWidth) * imgWidth;

    let position = 0;
    let remainingHeight = imgHeight;
    let pageNum = 0;

    while (remainingHeight > 0) {
      const sliceHeight = Math.min(pageHeightInPx, remainingHeight);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = imgWidth;
      sliceCanvas.height = sliceHeight;
      const ctx = sliceCanvas.getContext('2d');
      if (!ctx) break;

      ctx.drawImage(canvas, 0, position, imgWidth, sliceHeight, 0, 0, imgWidth, sliceHeight);
      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.95);

      if (pageNum > 0) pdf.addPage();
      const sliceHeightMM = (sliceHeight / imgWidth) * pdfWidth;
      pdf.addImage(sliceData, 'JPEG', 0, 0, pdfWidth, sliceHeightMM);

      position += sliceHeight;
      remainingHeight -= sliceHeight;
      pageNum++;
    }

    const name = resume.personalInfo.fullName?.replace(/\s+/g, '-') || 'Resume';
    pdf.save(`${name}-Resume.pdf`);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}
