import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ImageSequenceAlignment = ({ images, onAlignmentChange, selectedImages }) => {
  const [alignmentMode, setAlignmentMode] = useState('automatic');
  const [referenceImage, setReferenceImage] = useState('');
  const [alignmentStatus, setAlignmentStatus] = useState('idle'); // idle, processing, completed, failed

  const alignmentModeOptions = [
    { value: 'automatic', label: 'Automatic Alignment', description: 'AI-powered feature matching' },
    { value: 'manual', label: 'Manual Control Points', description: 'User-defined reference points' },
    { value: 'gps', label: 'GPS Coordinates', description: 'Geographic positioning based' },
    { value: 'timestamp', label: 'Temporal Sequence', description: 'Time-based ordering' }
  ];

  const referenceImageOptions = images?.filter(img => selectedImages?.includes(img?.id))?.map(img => ({
      value: img?.id,
      label: img?.name,
      description: `${img?.dimensions} • ${img?.bands} bands`
    }));

  const handleStartAlignment = () => {
    if (selectedImages?.length < 2) {
      return;
    }

    setAlignmentStatus('processing');
    
    // Simulate alignment process
    setTimeout(() => {
      setAlignmentStatus('completed');
      onAlignmentChange({
        mode: alignmentMode,
        referenceImage,
        alignedImages: selectedImages,
        accuracy: Math.random() * 0.3 + 0.7 // 70-100% accuracy
      });
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Image Sequence Alignment</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Align multiple images for temporal analysis and comparison
          </p>
        </div>
        
        <div className={`flex items-center space-x-2 ${getStatusColor(alignmentStatus)}`}>
          {alignmentStatus === 'processing' && (
            <Icon name="Loader2" size={16} className="animate-spin" />
          )}
          {alignmentStatus === 'completed' && (
            <Icon name="CheckCircle" size={16} />
          )}
          {alignmentStatus === 'failed' && (
            <Icon name="XCircle" size={16} />
          )}
          <span className="text-sm font-medium capitalize">{alignmentStatus}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alignment Configuration */}
        <div className="space-y-4">
          <div>
            <Select
              label="Alignment Method"
              description="Choose the alignment technique for your image sequence"
              options={alignmentModeOptions}
              value={alignmentMode}
              onChange={setAlignmentMode}
            />
          </div>

          {alignmentMode === 'manual' && (
            <div>
              <Select
                label="Reference Image"
                description="Select the base image for alignment"
                options={referenceImageOptions}
                value={referenceImage}
                onChange={setReferenceImage}
                placeholder="Choose reference image"
              />
            </div>
          )}

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Selected Images</span>
              <span className="text-sm text-muted-foreground">{selectedImages?.length} images</span>
            </div>
            
            {selectedImages?.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Select at least 2 images from the grid below to enable alignment
              </p>
            ) : (
              <div className="space-y-2">
                {images?.filter(img => selectedImages?.includes(img?.id))?.slice(0, 3)?.map((img, index) => (
                    <div key={img?.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm text-foreground truncate">{img?.name}</span>
                    </div>
                  ))}
                {selectedImages?.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{selectedImages?.length - 3} more images
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            variant="default"
            iconName="AlignHorizontalJustifyCenter"
            iconPosition="left"
            onClick={handleStartAlignment}
            disabled={selectedImages?.length < 2 || alignmentStatus === 'processing'}
            loading={alignmentStatus === 'processing'}
            fullWidth
          >
            {alignmentStatus === 'processing' ? 'Aligning Images...' : 'Start Alignment'}
          </Button>
        </div>

        {/* Alignment Preview */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Alignment Preview</h4>
          
          {alignmentStatus === 'idle' && (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Icon name="AlignHorizontalJustifyCenter" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Configure alignment settings and start the process to see preview
              </p>
            </div>
          )}

          {alignmentStatus === 'processing' && (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Icon name="Loader2" size={48} className="text-warning animate-spin mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">Processing Alignment</p>
              <p className="text-sm text-muted-foreground">
                Analyzing feature points and calculating transformations...
              </p>
              <div className="w-full bg-background rounded-full h-2 mt-4">
                <div className="bg-warning h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {alignmentStatus === 'completed' && (
            <div className="space-y-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Alignment Completed</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Accuracy: 94.2%</div>
                  <div>Feature points matched: 1,247</div>
                  <div>Processing time: 2.3 seconds</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" iconName="Eye">
                  Preview Result
                </Button>
                <Button variant="outline" size="sm" iconName="Download">
                  Export Data
                </Button>
              </div>
            </div>
          )}

          {alignmentStatus === 'failed' && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="XCircle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">Alignment Failed</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Unable to find sufficient feature points for alignment. Try adjusting the alignment method or selecting different images.
              </p>
              <Button variant="outline" size="sm" iconName="RotateCcw">
                Retry Alignment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSequenceAlignment;