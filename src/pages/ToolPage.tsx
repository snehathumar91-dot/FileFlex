import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { UploadCloud, Settings, ArrowRight, Loader2, File, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((t) => t.id === toolId);
  
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset state on tool change
    setFiles([]);
    setIsSuccess(false);
    setDownloadUrl(null);
    setIsProcessing(false);
  }, [toolId]);

  if (!tool) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-800">Tool not found</h2>
        <Link to="/" className="text-red-600 hover:underline mt-4 inline-block">Return to home</Link>
      </div>
    );
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (tool.multipleFiles) {
      setFiles((prev) => [...prev, ...selectedFiles]);
    } else {
      setFiles([selectedFiles[0]]);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    const formData = new FormData();
    
    if (tool.multipleFiles) {
      files.forEach((file) => formData.append('files', file));
    } else {
      formData.append('file', files[0]);
    }

    try {
      const response = await fetch(tool.apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.success) {
          setIsSuccess(true);
          // For dummy simulated downloads where no file is returned
          setDownloadFilename(data.downloadName || 'processed_file');
        }
      } else {
        // Handle file blob
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Extract filename from header if possible
        const disposition = response.headers.get('content-disposition');
        let filename = 'fileflex_processed.pdf';
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        
        setDownloadUrl(url);
        setDownloadFilename(filename);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
      {!isSuccess ? (
        <>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{tool.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{tool.description}</p>
          </div>

          <div 
            className={clsx(
              "w-full max-w-4xl bg-white rounded-2xl p-10 md:p-20 flex flex-col items-center justify-center border-4 border-dashed transition-all",
              isDragging ? "border-red-500 bg-red-50" : "border-gray-200",
              files.length > 0 ? "border-solid border-red-100 bg-red-50/30" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {files.length === 0 ? (
              <>
                <div className={`mb-6 p-6 rounded-full bg-red-100 ${tool.color}`}>
                  <tool.icon size={64} strokeWidth={1.5} />
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-red-600 hover:bg-red-700 text-white text-xl font-semibold py-4 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 mb-4"
                >
                  Select PDF {tool.multipleFiles ? 'files' : 'file'}
                </button>
                <p className="text-gray-500 font-medium">or drop PDFs here</p>
              </>
            ) : (
              <div className="w-full">
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                  {files.map((file, i) => (
                    <div key={i} className="w-32 h-40 bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col items-center justify-center p-4 relative group">
                      <File className="text-red-500 mb-2" size={40} />
                      <p className="text-xs text-center font-medium truncate w-full text-gray-700">{file.name}</p>
                      <button 
                        onClick={() => setFiles(files.filter((_, index) => index !== i))}
                        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Settings size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {tool.multipleFiles && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-32 h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <span className="text-sm font-medium text-gray-500">Add more</span>
                    </button>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xl font-semibold py-4 px-12 rounded-xl shadow-lg transition-all flex items-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        {tool.title} <ArrowRight />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple={tool.multipleFiles}
            accept={tool.acceptedTypes}
            onChange={(e) => {
              if (e.target.files) handleFilesSelected(Array.from(e.target.files));
            }}
          />
        </>
      ) : (
        <div className="w-full max-w-3xl text-center pt-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Task has been completed!</h2>
          <p className="text-lg text-gray-600 mb-10">Your files have been successfully processed.</p>
          
          {downloadUrl ? (
            <a 
              href={downloadUrl}
              download={downloadFilename}
              className="inline-flex bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Download {downloadFilename}
            </a>
          ) : (
            <button 
              className="inline-flex bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
              onClick={() => alert('This is a simulated task. In a real environment with LibreOffice/Ghostscript installed, you would receive the real downloaded file here.')}
            >
              Download {downloadFilename} (Simulated)
            </button>
          )}

          <div className="mt-12 flex justify-center gap-4">
            <button 
              onClick={() => {
                setFiles([]);
                setIsSuccess(false);
                setDownloadUrl(null);
              }}
              className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Start over
            </button>
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
