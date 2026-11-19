import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreprocessingPanel = ({ selectedImages, onPreprocessingChange }) => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [selectedBands, setSelectedBands] = useState([]);
  const [noiseReduction, setNoiseReduction] = useState(false);
  const [atmosphericCorrection, setAtmosphericCorrection] = useState(false);
  const [radiometricCalibration, setRadiometricCalibration] = useState(false);
  const [previewMode, setPreviewMode] = useState('original');

  const spectralBandOptions = [
    { value: 'red', label: 'Red (620-750nm)', description: 'Visible red spectrum' },
    { value: 'green', label: 'Green (495-570nm)', description: 'Visible green spectrum' },
    { value: 'blue', label: 'Blue (450-495nm)', description: 'Visible blue spectrum' },
    { value: 'nir', label: 'Near-Infrared (750-1400nm)', description: 'NIR for vegetation analysis' },
    { value: 'swir1', label: 'SWIR-1 (1400-1800nm)', description: 'Short-wave infrared' },
    { value: 'swir2', label: 'SWIR-2 (2000-2500nm)', description: 'Short-wave infrared' },
    { value: 'thermal', label: 'Thermal (8000-14000nm)', description: 'Thermal infrared' }
  ];

  const previewModeOptions = [
    { value: 'original', label: 'Original' },
    { value: 'processed', label: 'Processed' },
    { value: 'comparison', label: 'Side by Side' }
  ];

  const handleApplyPreprocessing = () => {
    const settings = {
      brightness,
      contrast,
      selectedBands,
      noiseReduction,
      atmosphericCorrection,
      radiometricCalibration,
      appliedTo: selectedImages
    };
    
    onPreprocessingChange(settings);
  };

  const resetSettings = () => {
    setBrightness(0);
    setContrast(0);
    setSelectedBands([]);
    setNoiseReduction(false);
    setAtmosphericCorrection(false);
    setRadiometricCalibration(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Image Preprocessing</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enhance and prepare images for analysis
            </p>
          </div>
          
          <Select
            options={previewModeOptions}
            value={previewMode}
            onChange={setPreviewMode}
            className="w-40"
          />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Image Enhancement */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Sliders" size={16} className="mr-2" />
            Image Enhancement
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                type="range"
                label="Brightness"
                min="-100"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e?.target?.value))}
                description={`Current: ${brightness > 0 ? '+' : ''}${brightness}`}
              />
            </div>
            
            <div>
              <Input
                type="range"
                label="Contrast"
                min="-100"
                max="100"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e?.target?.value))}
                description={`Current: ${contrast > 0 ? '+' : ''}${contrast}`}
              />
            </div>
          </div>
        </div>

        {/* Spectral Band Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Layers" size={16} className="mr-2" />
            Spectral Band Selection
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spectralBandOptions?.map((band) => (
              <Checkbox
                key={band?.value}
                label={band?.label}
                description={band?.description}
                checked={selectedBands?.includes(band?.value)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    setSelectedBands([...selectedBands, band?.value]);
                  } else {
                    setSelectedBands(selectedBands?.filter(b => b !== band?.value));
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Advanced Processing */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Advanced Processing
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Noise Reduction"
              description="Apply Gaussian filter to reduce image noise"
              checked={noiseReduction}
              onChange={(e) => setNoiseReduction(e?.target?.checked)}
            />
            
            <Checkbox
              label="Atmospheric Correction"
              description="Compensate for atmospheric interference"
              checked={atmosphericCorrection}
              onChange={(e) => setAtmosphericCorrection(e?.target?.checked)}
            />
            
            <Checkbox
              label="Radiometric Calibration"
              description="Convert digital numbers to reflectance values"
              checked={radiometricCalibration}
              onChange={(e) => setRadiometricCalibration(e?.target?.checked)}
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Eye" size={16} className="mr-2" />
            Real-time Preview
          </h4>
          
          <div className="bg-muted rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
            {selectedImages?.length === 0 ? (
              <div>
                <Icon name="ImageOff" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select images to see preprocessing preview
                </p>
              </div>
            ) : (
              <div className="w-full">
                {previewMode === 'comparison' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Original</p>
                      <div className="bg-background rounded border h-32 flex items-center justify-center">
                        <Icon name="Image" size={32} className="text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Processed</p>
                      <div className="bg-background rounded border h-32 flex items-center justify-center">
                        <Icon name="Sparkles" size={32} className="text-primary" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {previewMode === 'original' ? 'Original Image' : 'Processed Image'}
                    </p>
                    <div className="bg-background rounded border h-40 flex items-center justify-center">
                      <Icon 
                        name={previewMode === 'original' ? 'Image' : 'Sparkles'} 
                        size={48} 
                        className={previewMode === 'original' ? 'text-muted-foreground' : 'text-primary'} 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={resetSettings}
          >
            Reset Settings
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
            >
              Preview Changes
            </Button>
            
            <Button
              variant="default"
              iconName="Play"
              iconPosition="left"
              onClick={handleApplyPreprocessing}
              disabled={selectedImages?.length === 0}
            >
              Apply Preprocessing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreprocessingPanel;