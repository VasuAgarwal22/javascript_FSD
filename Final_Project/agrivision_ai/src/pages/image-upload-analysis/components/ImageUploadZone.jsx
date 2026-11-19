import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageUploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelection(files);
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e?.target?.files);
    handleFileSelection(files);
  }, []);

  const handleFileSelection = (files) => {
    const validFiles = files?.filter(file => {
      const validTypes = ['image/tiff', 'image/tif', 'image/jpeg', 'image/png', 'image/bmp'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      return validTypes?.includes(file?.type) && file?.size <= maxSize;
    });

    if (validFiles?.length > 0) {
      // Simulate upload progress
      validFiles?.forEach((file, index) => {
        const fileId = `${file?.name}-${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        // Simulate progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev?.[fileId] || 0;
            if (currentProgress >= 100) {
              clearInterval(interval);
              return prev;
            }
            return { ...prev, [fileId]: currentProgress + 10 };
          });
        }, 200);
      });

      onFilesSelected(validFiles);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".tiff,.tif,.jpg,.jpeg,.png,.bmp"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Multispectral Images
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your images here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports TIFF, TIF, JPEG, PNG, BMP • Max 100MB per file
            </p>
          </div>
          
          <Button
            variant="outline"
            iconName="FolderOpen"
            iconPosition="left"
            disabled={isProcessing}
          >
            Browse Files
          </Button>
        </div>
      </div>
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-foreground">Upload Progress</h4>
          {Object.entries(uploadProgress)?.map(([fileId, progress]) => (
            <div key={fileId} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground truncate">
                  {fileId?.split('-')?.[0]}
                </span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;