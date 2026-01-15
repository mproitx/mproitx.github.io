import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft,
  ChevronRight,
  RotateCw,
  X,
  BookOpen,
  FileText,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Printer,
  ArrowDownToLine,
  Maximize2
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title?: string;
  onClose?: () => void;
}

export function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('single');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fitMode, setFitMode] = useState<'width' | 'height' | 'page' | 'custom'>('custom');
  const [pageInput, setPageInput] = useState<string>('1');
  const audioContextRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Audio Context
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play page turn sound
  const playPageTurnSound = () => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Create a subtle page turn sound
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setLoading(false);
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePrevPage = () => {
    if (pageNumber <= 1) return;
    setIsAnimating(true);
    playPageTurnSound();
    setTimeout(() => {
      setPageNumber(prev => Math.max(prev - (viewMode === 'double' ? 2 : 1), 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleNextPage = () => {
    if (pageNumber >= numPages) return;
    setIsAnimating(true);
    playPageTurnSound();
    setTimeout(() => {
      setPageNumber(prev => Math.min(prev + (viewMode === 'double' ? 2 : 1), numPages));
      setIsAnimating(false);
    }, 300);
  };

  const handleFitWidth = () => {
    setFitMode('width');
    setScale(1.5);
  };

  const handleFitHeight = () => {
    setFitMode('height');
    setScale(1.2);
  };

  const handleFitPage = () => {
    setFitMode('page');
    setScale(1.0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title || 'document.pdf';
    link.click();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
      playPageTurnSound();
    } else {
      setPageInput(pageNumber.toString());
    }
  };

  useEffect(() => {
    setPageInput(pageNumber.toString());
  }, [pageNumber]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Toolbar - Two Row Layout */}
      <Card className="rounded-none border-x-0 border-t-0 shrink-0">
        <div className="p-2 space-y-2">
          {/* First Row - Title and Close */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate text-sm xl:text-base flex-1">
              {title || 'PDF दस्तावेज़'}
            </h3>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="shrink-0 h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Second Row - All Controls */}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {/* Page Navigation */}
            {numPages > 0 && (
              <div className="flex items-center gap-0.5 border rounded-lg p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevPage}
                  disabled={pageNumber <= 1 || isAnimating}
                  className="h-6 w-6"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <span className="text-[10px] font-medium px-1 min-w-[2.5rem] text-center whitespace-nowrap">
                  {pageNumber}/{numPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={pageNumber >= numPages || isAnimating}
                  className="h-6 w-6"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 border rounded-lg p-0.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="h-6 w-6"
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <span className="text-[10px] font-medium px-1 min-w-[2rem] text-center whitespace-nowrap">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="h-6 w-6"
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>

            {/* Rotate */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRotate}
              className="h-6 w-6"
              title="घुमाएं"
            >
              <RotateCw className="h-3 w-3" />
            </Button>

            {/* View Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode(prev => prev === 'single' ? 'double' : 'single')}
              className="h-6 w-6"
              title={viewMode === 'single' ? 'डबल पेज' : 'सिंगल पेज'}
            >
              {viewMode === 'single' ? <BookOpen className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
            </Button>

            {/* Sound Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(prev => !prev)}
              className="h-6 w-6"
              title={soundEnabled ? 'साउंड बंद' : 'साउंड चालू'}
            >
              {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
            </Button>

            {/* Fit Buttons */}
            <div className="flex items-center gap-0.5 border rounded-lg p-0.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFitWidth}
                className="h-6 w-6"
                title="चौड़ाई में फिट"
              >
                <Maximize className="h-3 w-3 rotate-90" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFitPage}
                className="h-6 w-6"
                title="पेज में फिट"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>

            {/* Download */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="h-6 w-6"
              title="डाउनलोड"
            >
              <ArrowDownToLine className="h-3 w-3" />
            </Button>

            {/* Print */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrint}
              className="h-6 w-6"
              title="प्रिंट"
            >
              <Printer className="h-3 w-3" />
            </Button>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-6 w-6"
              title={isFullscreen ? 'फुलस्क्रीन से बाहर' : 'फुलस्क्रीन'}
            >
              {isFullscreen ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
            </Button>

            {/* Page Jump Input */}
            {numPages > 0 && (
              <form onSubmit={handlePageInputSubmit} className="flex items-center gap-1 border rounded-lg p-0.5">
                <Input
                  type="number"
                  min="1"
                  max={numPages}
                  value={pageInput}
                  onChange={handlePageInputChange}
                  className="h-6 w-12 text-[10px] text-center p-0 border-0 focus-visible:ring-0"
                  title="पेज नंबर"
                />
              </form>
            )}
          </div>
        </div>
      </Card>

      {/* PDF Viewer - Full Screen */}
      <div className="flex-1 bg-muted/30 overflow-auto">
        <div className="flex items-center justify-center min-h-full p-2 xl:p-4">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center gap-4 py-12">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">PDF लोड हो रहा है...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center gap-4 p-6 bg-destructive/10 rounded-lg max-w-md">
                <p className="text-sm text-destructive text-center">PDF लोड करने में त्रुटि। कृपया फिर से प्रयास करें।</p>
              </div>
            }
          >
            <div 
              className={`flex gap-4 transition-all duration-300 ${
                isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                transform: isAnimating ? 'rotateY(5deg)' : 'rotateY(0deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Single Page View */}
              {viewMode === 'single' && (
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  rotate={rotation}
                  className="border-2 border-border rounded-lg shadow-2xl transition-transform duration-300"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              )}

              {/* Double Page View */}
              {viewMode === 'double' && (
                <>
                  {/* Left Page */}
                  {pageNumber > 1 && (
                    <Page
                      pageNumber={pageNumber - 1}
                      scale={scale * 0.8}
                      rotate={rotation}
                      className="border-2 border-border rounded-lg shadow-2xl transition-transform duration-300"
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                    />
                  )}
                  
                  {/* Right Page */}
                  <Page
                    pageNumber={pageNumber}
                    scale={scale * 0.8}
                    rotate={rotation}
                    className="border-2 border-border rounded-lg shadow-2xl transition-transform duration-300"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </>
              )}
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}
