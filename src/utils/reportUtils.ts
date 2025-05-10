// utils/reportUtils.ts
import { generateCreditScoreReport } from './reportGenerator';
import { FinancialDocument, FinancialHealthDashboard, CreditScore } from '@/types/types';
import { Inconsistency } from '@/utils/financialInconsistencyDetector';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates and downloads a credit score report as PDF
 * 
 * This function creates an HTML report using the report generator,
 * converts it to a PDF using html2canvas and jsPDF,
 * and triggers a download of the resulting PDF file.
 */
export const generateAndDownloadReport = async (
  creditScore: CreditScore | null,
  financialHealth: FinancialHealthDashboard | null,
  documents: FinancialDocument[],
  inconsistencies: Inconsistency[]
): Promise<void> => {
  if (!creditScore) {
    console.error('Cannot generate report: Credit score data is missing');
    return;
  }

  // Generate HTML report
  const reportHtml = generateCreditScoreReport(
    creditScore,
    financialHealth,
    documents,
    inconsistencies
  );

  // Create a temporary container to render the HTML
  const reportContainer = document.createElement('div');
  reportContainer.innerHTML = reportHtml;
  reportContainer.style.position = 'absolute';
  reportContainer.style.left = '-9999px';
  document.body.appendChild(reportContainer);

  try {
    // Render the report to canvas
    const canvas = await html2canvas(reportContainer, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Initialize PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate dimensions to fit the page
    const imgWidth = 200; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add canvas content to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // If the report is longer than one page, handle pagination
    if (imgHeight > 297) { // A4 height in mm
      let heightLeft = imgHeight;
      let position = 0;
      
      // Reset the PDF
      pdf.deletePage(1);
      
      // Add pages as needed
      heightLeft = imgHeight;
      position = 0;
      
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
        position -= 297;
      }
    }

    // Download the PDF with a meaningful filename
    const fileName = `Credit_Score_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating your report. Please try again.');
    
    // Fallback to HTML download if PDF generation fails
    downloadReportAsHtml(creditScore, financialHealth, documents, inconsistencies);
  } finally {
    // Clean up the temporary container
    document.body.removeChild(reportContainer);
  }
};

/**
 * Alternative method to generate and download report as HTML
 * Used as a fallback if PDF generation fails
 */
export const downloadReportAsHtml = (
  creditScore: CreditScore | null,
  financialHealth: FinancialHealthDashboard | null,
  documents: FinancialDocument[],
  inconsistencies: Inconsistency[]
): void => {
  if (!creditScore) {
    console.error('Cannot generate report: Credit score data is missing');
    return;
  }

  // Generate HTML report
  const reportHtml = generateCreditScoreReport(
    creditScore,
    financialHealth,
    documents,
    inconsistencies
  );

  // Create a blob with the HTML content
  const blob = new Blob([reportHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `Credit_Score_Report_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};