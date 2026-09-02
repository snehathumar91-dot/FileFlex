import { 
  FileStack, Split, Trash2, FileOutput, ArrowDownUp, Scan, 
  Minimize, Wrench, FileSearch, FileImage, FileText, Presentation, 
  Table, Globe, RotateCw, Hash, Droplet, Crop, FileEdit, FormInput,
  Unlock, Lock, PenTool, Eraser, GitCompare, FileCheck, Layers
} from "lucide-react";
import { Tool } from "../types";

export const tools: Tool[] = [
  // Organize PDF
  { id: "merge-pdf", title: "Merge PDF", description: "Combine multiple PDFs into one document easily.", category: "ORGANIZE PDF", icon: FileStack, color: "bg-red-50 text-red-600", multipleFiles: true, acceptedTypes: ".pdf", apiEndpoint: "/api/merge-pdf" },
  { id: "split-pdf", title: "Split PDF", description: "Extract pages or split one PDF into multiple files.", category: "ORGANIZE PDF", icon: Split, color: "bg-orange-50 text-orange-600", acceptedTypes: ".pdf", apiEndpoint: "/api/split-pdf" },
  { id: "remove-pages", title: "Remove pages", description: "Remove pages from a PDF document in a flash.", category: "ORGANIZE PDF", icon: Trash2, color: "bg-red-50 text-red-500", acceptedTypes: ".pdf", apiEndpoint: "/api/remove-pages" },
  { id: "extract-pages", title: "Extract pages", description: "Extract pages from your PDF document easily.", category: "ORGANIZE PDF", icon: FileOutput, color: "bg-orange-50 text-orange-500", acceptedTypes: ".pdf", apiEndpoint: "/api/extract-pages" },
  { id: "organize-pdf", title: "Organize PDF", description: "Sort, add and delete PDF pages.", category: "ORGANIZE PDF", icon: Layers, color: "bg-red-50 text-red-600", acceptedTypes: ".pdf", apiEndpoint: "/api/organize-pdf" },
  { id: "scan-to-pdf", title: "Scan to PDF", description: "Capture document scans from your mobile device and send them instantly to your browser.", category: "ORGANIZE PDF", icon: Scan, color: "bg-orange-50 text-orange-600", acceptedTypes: "image/*,.pdf", apiEndpoint: "/api/scan-to-pdf" },

  // Optimize PDF
  { id: "compress-pdf", title: "Compress PDF", description: "Reduce file size while optimizing for quality via Ghostscript.", category: "OPTIMIZE PDF", icon: Minimize, color: "bg-blue-50 text-blue-600", acceptedTypes: ".pdf", apiEndpoint: "/api/compress-pdf" },
  { id: "repair-pdf", title: "Repair PDF", description: "Repair a damaged PDF and recover data from corrupt PDF.", category: "OPTIMIZE PDF", icon: Wrench, color: "bg-emerald-50 text-emerald-600", acceptedTypes: ".pdf", apiEndpoint: "/api/repair-pdf" },
  { id: "ocr-pdf", title: "OCR PDF", description: "Make scanned PDFs searchable using Tesseract OCR.", category: "OPTIMIZE PDF", icon: FileSearch, color: "bg-purple-50 text-purple-600", acceptedTypes: ".pdf", apiEndpoint: "/api/ocr-pdf" },

  // Convert to PDF
  { id: "jpg-to-pdf", title: "JPG to PDF", description: "Convert images to PDF documents instantly.", category: "CONVERT TO PDF", icon: FileImage, color: "bg-green-50 text-green-600", multipleFiles: true, acceptedTypes: "image/*", apiEndpoint: "/api/jpg-to-pdf" },
  { id: "word-to-pdf", title: "WORD to PDF", description: "Convert PDF to editable DOCX using LibreOffice Headless.", category: "CONVERT TO PDF", icon: FileText, color: "bg-indigo-50 text-indigo-600", acceptedTypes: ".doc,.docx", apiEndpoint: "/api/word-to-pdf" },
  { id: "powerpoint-to-pdf", title: "POWERPOINT to PDF", description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.", category: "CONVERT TO PDF", icon: Presentation, color: "bg-orange-50 text-orange-600", acceptedTypes: ".ppt,.pptx", apiEndpoint: "/api/powerpoint-to-pdf" },
  { id: "excel-to-pdf", title: "EXCEL to PDF", description: "Make EXCEL spreadsheets easy to read by converting them to PDF.", category: "CONVERT TO PDF", icon: Table, color: "bg-teal-50 text-teal-600", acceptedTypes: ".xls,.xlsx", apiEndpoint: "/api/excel-to-pdf" },
  { id: "html-to-pdf", title: "HTML to PDF", description: "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF.", category: "CONVERT TO PDF", icon: Globe, color: "bg-yellow-50 text-yellow-600", acceptedTypes: ".html", apiEndpoint: "/api/html-to-pdf" },

  // Convert from PDF
  { id: "pdf-to-jpg", title: "PDF to JPG", description: "Extract images or convert pages to high-quality JPGs.", category: "CONVERT FROM PDF", icon: FileImage, color: "bg-teal-50 text-teal-600", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-to-jpg" },
  { id: "pdf-to-word", title: "PDF to WORD", description: "Convert your PDF to WORD documents with incredible accuracy.", category: "CONVERT FROM PDF", icon: FileText, color: "bg-indigo-50 text-indigo-600", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-to-word" },
  { id: "pdf-to-powerpoint", title: "PDF to POWERPOINT", description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.", category: "CONVERT FROM PDF", icon: Presentation, color: "bg-orange-50 text-orange-500", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-to-powerpoint" },
  { id: "pdf-to-excel", title: "PDF to EXCEL", description: "Pull data straight from PDFs into EXCEL spreadsheets in a few short seconds.", category: "CONVERT FROM PDF", icon: Table, color: "bg-green-50 text-green-600", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-to-excel" },
  { id: "pdf-to-pdfa", title: "PDF to PDF/A", description: "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving.", category: "CONVERT FROM PDF", icon: FileCheck, color: "bg-indigo-50 text-indigo-600", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-to-pdfa" },

  // Edit PDF
  { id: "rotate-pdf", title: "Rotate PDF", description: "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!", category: "EDIT PDF", icon: RotateCw, color: "bg-purple-50 text-purple-600", acceptedTypes: ".pdf", apiEndpoint: "/api/rotate-pdf" },
  { id: "add-page-numbers", title: "Add page numbers", description: "Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.", category: "EDIT PDF", icon: Hash, color: "bg-purple-50 text-purple-500", acceptedTypes: ".pdf", apiEndpoint: "/api/add-page-numbers" },
  { id: "add-watermark", title: "Add watermark", description: "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.", category: "EDIT PDF", icon: Droplet, color: "bg-fuchsia-50 text-fuchsia-600", acceptedTypes: ".pdf", apiEndpoint: "/api/add-watermark" },
  { id: "crop-pdf", title: "Crop PDF", description: "Crop PDF online to a selected area, adjust margin size swiftly.", category: "EDIT PDF", icon: Crop, color: "bg-purple-50 text-purple-600", acceptedTypes: ".pdf", apiEndpoint: "/api/crop-pdf" },
  { id: "edit-pdf", title: "Edit PDF", description: "Add text, images, shapes or freehand annotations to a PDF document.", category: "EDIT PDF", icon: FileEdit, color: "bg-pink-50 text-pink-600", acceptedTypes: ".pdf", apiEndpoint: "/api/edit-pdf" },
  { id: "pdf-forms", title: "PDF Forms", description: "Create PDF forms or fill existing ones easily online.", category: "EDIT PDF", icon: FormInput, color: "bg-purple-50 text-purple-500", acceptedTypes: ".pdf", apiEndpoint: "/api/pdf-forms" },

  // PDF Security
  { id: "unlock-pdf", title: "Unlock PDF", description: "Remove PDF password security, giving you the freedom to use your PDFs as you want.", category: "PDF SECURITY", icon: Unlock, color: "bg-slate-100 text-slate-600", acceptedTypes: ".pdf", apiEndpoint: "/api/unlock-pdf" },
  { id: "protect-pdf", title: "Protect PDF", description: "Encrypt your PDF with a password to prevent unauthorized access.", category: "PDF SECURITY", icon: Lock, color: "bg-slate-100 text-slate-700", acceptedTypes: ".pdf", apiEndpoint: "/api/protect-pdf" },
  { id: "sign-pdf", title: "Sign PDF", description: "Sign yourself or request electronic signatures from others.", category: "PDF SECURITY", icon: PenTool, color: "bg-blue-50 text-blue-600", acceptedTypes: ".pdf", apiEndpoint: "/api/sign-pdf" },
  { id: "redact-pdf", title: "Redact PDF", description: "Permanently remove visible text and graphics from a document.", category: "PDF SECURITY", icon: Eraser, color: "bg-slate-100 text-slate-800", acceptedTypes: ".pdf", apiEndpoint: "/api/redact-pdf" },
  { id: "compare-pdf", title: "Compare PDF", description: "Compare two PDF documents to quickly spot changes.", category: "PDF SECURITY", icon: GitCompare, color: "bg-slate-100 text-slate-500", multipleFiles: true, acceptedTypes: ".pdf", apiEndpoint: "/api/compare-pdf" }
];

export const toolsByCategory = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, Tool[]>);
