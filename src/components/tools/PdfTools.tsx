import React, { useState } from 'react';
import { FileText, Download, Check, AlertCircle, Sparkles, Printer } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export function PdfTools() {
  const [docType, setDocType] = useState<string>('receipt');
  const [title, setTitle] = useState<string>('Rent Payment Receipt');
  const [recipient, setRecipient] = useState<string>('Jane Doe');
  const [amount, setAmount] = useState<string>('1850.00');
  const [content, setContent] = useState<string>(
    'Received full payment for residential lease rent for the current billing cycle. All utilities and parking fees included.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const applyTemplate = (type: string) => {
    setDocType(type);
    if (type === 'receipt') {
      setTitle('Rent Payment Receipt');
      setRecipient('Jane Doe');
      setAmount('1850.00');
      setContent('Received full payment for residential lease rent for the current billing cycle. Thank you for your on-time payment.');
    } else if (type === 'invoice') {
      setTitle('Professional Services Memo');
      setRecipient('Acme US Corp');
      setAmount('2400.00');
      setContent('Consulting services provided including systems review, setup, and monthly technical deliverables.');
    } else if (type === 'note') {
      setTitle('Statement of Agreement');
      setRecipient('John Smith');
      setAmount('');
      setContent('This formal written confirmation acknowledges the terms discussed regarding mutual obligations and timelines.');
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setDownloadSuccess(false);

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 780]);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Header Banner Background
      page.drawRectangle({
        x: 0,
        y: 710,
        width: 600,
        height: 70,
        color: rgb(0.14, 0.38, 0.92),
      });

      // Header Text
      page.drawText('US LIFE TOOLS • OFFICIAL DOCUMENT', {
        x: 40,
        y: 745,
        size: 10,
        font: boldFont,
        color: rgb(0.85, 0.9, 1),
      });

      page.drawText(title || 'Document Record', {
        x: 40,
        y: 722,
        size: 18,
        font: boldFont,
        color: rgb(1, 1, 1),
      });

      // Date & Meta
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      page.drawText(`Date Issued: ${currentDate}`, {
        x: 40,
        y: 675,
        size: 10,
        font: regularFont,
        color: rgb(0.4, 0.4, 0.4),
      });

      if (recipient) {
        page.drawText(`Issued To / Party: ${recipient}`, {
          x: 40,
          y: 655,
          size: 11,
          font: boldFont,
          color: rgb(0.15, 0.15, 0.15),
        });
      }

      if (amount) {
        page.drawRectangle({
          x: 40,
          y: 595,
          width: 520,
          height: 45,
          color: rgb(0.95, 0.97, 1.0),
          borderColor: rgb(0.7, 0.8, 0.95),
          borderWidth: 1,
        });

        page.drawText('Total Amount Recorded:', {
          x: 55,
          y: 612,
          size: 11,
          font: regularFont,
          color: rgb(0.2, 0.25, 0.4),
        });

        page.drawText(`$${parseFloat(amount || '0').toFixed(2)} USD`, {
          x: 400,
          y: 610,
          size: 15,
          font: boldFont,
          color: rgb(0.1, 0.4, 0.2),
        });
      }

      // Divider line
      page.drawLine({
        start: { x: 40, y: 575 },
        end: { x: 560, y: 575 },
        thickness: 1,
        color: rgb(0.85, 0.85, 0.85),
      });

      // Content text with line wrapping
      const textX = 40;
      let textY = 540;
      const maxWidth = 520;

      page.drawText('Details & Remarks:', {
        x: textX,
        y: textY,
        size: 11,
        font: boldFont,
        color: rgb(0.15, 0.15, 0.15),
      });

      textY -= 20;

      // Simple wrap text
      const words = (content || 'No content provided.').split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = regularFont.widthOfTextAtSize(testLine, 11);
        if (width > maxWidth && currentLine) {
          page.drawText(currentLine, {
            x: textX,
            y: textY,
            size: 11,
            font: regularFont,
            color: rgb(0.2, 0.2, 0.2),
          });
          textY -= 18;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        page.drawText(currentLine, {
          x: textX,
          y: textY,
          size: 11,
          font: regularFont,
          color: rgb(0.2, 0.2, 0.2),
        });
      }

      // Footer
      page.drawLine({
        start: { x: 40, y: 80 },
        end: { x: 560, y: 80 },
        thickness: 0.5,
        color: rgb(0.85, 0.85, 0.85),
      });

      page.drawText('Generated securely client-side via US Life Tools • https://us-life-tools.app', {
        x: 40,
        y: 65,
        size: 9,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      const filename = `${(title || 'document').toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error compiling PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">PDF Generator & Document Tools</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Generate formatted receipts, agreements, and invoices with 100% private in-browser compilation</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {downloadSuccess ? 'Downloaded!' : isGenerating ? 'Creating...' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-zinc-500">Quick Templates:</span>
        <button
          type="button"
          onClick={() => applyTemplate('receipt')}
          className={`px-2.5 py-1 text-xs rounded-lg border transition ${
            docType === 'receipt'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Rent Receipt
        </button>
        <button
          type="button"
          onClick={() => applyTemplate('invoice')}
          className={`px-2.5 py-1 text-xs rounded-lg border transition ${
            docType === 'invoice'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Services Invoice
        </button>
        <button
          type="button"
          onClick={() => applyTemplate('note')}
          className={`px-2.5 py-1 text-xs rounded-lg border transition ${
            docType === 'note'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Agreement / Memo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Rent Payment Receipt"
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Recipient / Party Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Amount Recorded ($) (Optional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Document Remarks & Body Text
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter document text or memo..."
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Live Document Preview Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-400">
                PDF Preview Card
              </span>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                Ready to Print
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 space-y-3">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <div className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
                  US Life Tools • Document
                </div>
                <div className="text-base font-bold mt-0.5 truncate">{title || 'Untitled Document'}</div>
              </div>

              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div>
                  <strong>Party:</strong> {recipient || 'N/A'}
                </div>
                <div>
                  <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </div>
                {amount && (
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                    Recorded: ${parseFloat(amount).toFixed(2)} USD
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-h-32 overflow-y-auto">
                {content || 'No description provided.'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Generating...' : 'Download Clean PDF'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
