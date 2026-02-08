import Image from 'next/image';
import { Download, Eye } from 'lucide-react';

export default function IDDocumentViewer({ idDocument }) {
  if (!idDocument || !idDocument.url) {
    return (
      <div className="text-gray-500 text-sm">No ID document uploaded</div>
    );
  }

  const isPDF = idDocument.format === 'pdf';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">ID Document</h3>
        <div className="flex gap-2">
          <a
            href={idDocument.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Eye size={16} />
            View
          </a>
          <a
            href={idDocument.url}
            download={idDocument.filename}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>

      {isPDF ? (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
              <span className="text-red-600 font-bold text-xs">PDF</span>
            </div>
            <div>
              <p className="text-sm font-medium">{idDocument.filename}</p>
              <p className="text-xs text-gray-500">
                {(idDocument.bytes / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-64 border rounded-lg overflow-hidden">
          <Image
            src={idDocument.url}
            alt="ID Document"
            fill
            className="object-contain"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Uploaded on {new Date(idDocument.uploadedAt).toLocaleDateString()}
      </p>
    </div>
  );
}