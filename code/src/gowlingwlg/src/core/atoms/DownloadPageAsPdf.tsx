import { useCallback, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

const DownloadPageAsPdf = ({ children }: { children: React.ReactNode }) => {
  const [isDownloading, setDownloadStatus] = useState(false);
  const [pdfData, setPdfData] = useState<BlobPart>();

  const getPdf = useCallback(async () => {
    const pdf = await axios.get(
      `${window.location.protocol}//${window.location.host}/api/download?file=${window.location.pathname}`,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    );
    setPdfData(pdf.data);
    return pdf.data;
  }, []);

  const downloadPdf = useCallback((data?: BlobPart) => {
    if (data) {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${window.location.pathname.split('/').pop()}.pdf`;
      link.click();
    }
  }, []);

  const handlePdfDownload = async () => {
    if (!isDownloading) {
      setDownloadStatus(true);
      try {
        if (!pdfData) {
          const _pdfData = await getPdf();
          downloadPdf(_pdfData);
        }

        downloadPdf(pdfData);
      } finally {
        setDownloadStatus(false);
      }
    }
  };

  return (
    <button
      onClick={handlePdfDownload}
      className={clsx('print:hidden', { 'animate-bounce': isDownloading })}
    >
      {children}
    </button>
  );
};

export default DownloadPageAsPdf;
