import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageGrid = ({ images, onImageSelect, onImageDelete, selectedImages }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Upload';
    }
  };

  if (images?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Image" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Images Uploaded</h3>
        <p className="text-muted-foreground">
          Upload your first multispectral image to begin analysis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Uploaded Images ({images?.length})
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedImages?.length} selected
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode('grid')}
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => setViewMode('list')}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images?.map((image) => (
              <div
                key={image?.id}
                className={`relative bg-muted rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  selectedImages?.includes(image?.id)
                    ? 'border-primary ring-2 ring-primary/20' :'border-transparent hover:border-border'
                }`}
                onClick={() => onImageSelect(image?.id)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image?.thumbnail}
                    alt={image?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(image?.status)}`}>
                    <Icon name={getStatusIcon(image?.status)} size={12} className="inline mr-1" />
                    {image?.status}
                  </div>
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedImages?.includes(image?.id)
                        ? 'bg-primary border-primary' :'bg-white border-gray-300'
                    }`}>
                      {selectedImages?.includes(image?.id) && (
                        <Icon name="Check" size={12} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="font-medium text-foreground text-sm truncate mb-1">
                    {image?.name}
                  </h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{formatFileSize(image?.size)}</div>
                    <div>{image?.dimensions}</div>
                    <div>{image?.bands} bands</div>
                  </div>
                </div>
                
                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onImageDelete(image?.id);
                  }}
                >
                  <Icon name="Trash2" size={12} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {images?.map((image) => (
              <div
                key={image?.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedImages?.includes(image?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => onImageSelect(image?.id)}
              >
                {/* Selection Checkbox */}
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedImages?.includes(image?.id)
                    ? 'bg-primary border-primary' :'bg-white border-gray-300'
                }`}>
                  {selectedImages?.includes(image?.id) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={image?.thumbnail}
                    alt={image?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate mb-1">
                    {image?.name}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {formatFileSize(image?.size)} • {image?.dimensions} • {image?.bands} bands
                  </div>
                </div>
                
                {/* Status */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(image?.status)}`}>
                  <Icon name={getStatusIcon(image?.status)} size={14} className="inline mr-1" />
                  {image?.status}
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle preview
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onImageDelete(image?.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;