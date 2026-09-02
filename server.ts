import express from "express";
import path from "path";
import multer from "multer";
import { PDFDocument } from "pdf-lib";
import fs from "fs";

// Initialize express app
const app = express();
const PORT = 3000;

// Setup multer for temp file uploads
const upload = multer({ dest: "uploads/" });

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Real implementation for Merge PDF using pdf-lib
app.post("/api/merge-pdf", upload.array("files"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length < 2) {
      return res.status(400).json({ error: "Please upload at least 2 PDFs to merge." });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      // Cleanup temp file
      fs.unlinkSync(file.path);
    }

    const mergedPdfFile = await mergedPdf.save();
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="merged_fileflex.pdf"');
    res.send(Buffer.from(mergedPdfFile));
  } catch (error) {
    console.error("Merge error:", error);
    res.status(500).json({ error: "Failed to merge PDFs." });
  }
});

// Real implementation for Split PDF using pdf-lib (Extracts first page as an example)
app.post("/api/split-pdf", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Please upload a PDF to split." });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const newPdf = await PDFDocument.create();
    if (pdf.getPageCount() > 0) {
      const [copiedPage] = await newPdf.copyPages(pdf, [0]);
      newPdf.addPage(copiedPage);
    }
    
    fs.unlinkSync(file.path);

    const splitPdfFile = await newPdf.save();
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="split_page_1_fileflex.pdf"');
    res.send(Buffer.from(splitPdfFile));
  } catch (error) {
    console.error("Split error:", error);
    res.status(500).json({ error: "Failed to split PDF." });
  }
});

// Mock/simulated endpoints for LibreOffice / Ghostscript tasks as per user request
app.post("/api/compress-pdf", upload.single("file"), (req, res) => {
  // In a real environment, you would call Ghostscript here.
  // e.g. gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
  simulateProcessing(req, res, "compressed_fileflex.pdf");
});

app.post("/api/pdf-to-word", upload.single("file"), (req, res) => {
  // In a real environment, you would use pdf2docx or LibreOffice
  simulateProcessing(req, res, "converted_fileflex.docx");
});

app.post("/api/word-to-pdf", upload.single("file"), (req, res) => {
  // In a real environment, you would use LibreOffice headless:
  // libreoffice --headless --convert-to pdf filename.docx
  simulateProcessing(req, res, "converted_fileflex.pdf");
});

app.post("/api/jpg-to-pdf", upload.array("files"), (req, res) => {
  // In a real environment, use img2pdf or pdf-lib
  simulateProcessing(req, res, "images_fileflex.pdf");
});

app.post("/api/pdf-to-jpg", upload.single("file"), (req, res) => {
  // In a real environment, use pdf2image
  simulateProcessing(req, res, "extracted_images.zip");
});

// Catch-all mock endpoint for any other tool added to the UI
app.post("/api/:action", upload.any(), (req, res) => {
  const action = req.params.action;
  simulateProcessing(req, res, `processed_${action}.pdf`);
});

function simulateProcessing(req: express.Request, res: express.Response, outputName: string) {
  setTimeout(() => {
    const file = req.file;
    const files = req.files as Express.Multer.File[];
    
    // If output is a PDF and we have an input file, let's just return the input file back 
    // to simulate a successful processing that returns a file.
    if (file && outputName.endsWith(".pdf")) {
      const fileData = fs.readFileSync(file.path);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      res.send(fileData);
      
      // Cleanup
      fs.unlinkSync(file.path);
      return;
    }

    // Cleanup uploaded files
    if (file) fs.unlinkSync(file.path);
    if (files) files.forEach(f => fs.unlinkSync(f.path));
    
    // Return a dummy success response for the UI to handle if it's not a PDF output
    res.json({ 
      success: true, 
      message: "File processed successfully (Simulated). In production, this would execute LibreOffice/Ghostscript.",
      downloadName: outputName
    });
  }, 1500); // 1.5s simulated processing time
}


// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
