import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ProcessingOptionsPanel = ({ selectedImages, onProcessingStart }) => {
  const [analysisType, setAnalysisType] = useState('vegetation');
  const [vegetationIndices, setVegetationIndices] = useState([]);
  const [soilIndices, setSoilIndices] = useState([]);
  const [cnnModel, setCnnModel] = useState('crop-health-v2');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8);
  const [batchProcessing, setBatchProcessing] = useState(true);
  const [exportFormat, setExportFormat] = useState('geotiff');

  const analysisTypeOptions = [
    { value: 'vegetation', label: 'Vegetation Analysis', description: 'NDVI, SAVI, EVI calculations' },
    { value: 'soil', label: 'Soil Analysis', description: 'Soil composition and health indices' },
    { value: 'disease', label: 'Disease Detection', description: 'CNN-based crop disease identification' },
    { value: 'stress', label: 'Stress Analysis', description: 'Water and nutrient stress detection' },
    { value: 'comprehensive', label: 'Comprehensive Analysis', description: 'All analysis types combined' }
  ];

  const vegetationIndexOptions = [
    { value: 'ndvi', label: 'NDVI', description: 'Normalized Difference Vegetation Index' },
    { value: 'savi', label: 'SAVI', description: 'Soil Adjusted Vegetation Index' },
    { value: 'evi', label: 'EVI', description: 'Enhanced Vegetation Index' },
    { value: 'gndvi', label: 'GNDVI', description: 'Green Normalized Difference Vegetation Index' },
    { value: 'lai', label: 'LAI', description: 'Leaf Area Index' },
    { value: 'chlorophyll', label: 'Chlorophyll Index', description: 'Chlorophyll content estimation' }
  ];

  const soilIndexOptions = [
    { value: 'brightness', label: 'Soil Brightness Index', description: 'Overall soil reflectance' },
    { value: 'moisture', label: 'Soil Moisture Index', description: 'Water content in soil' },
    { value: 'organic', label: 'Organic Matter Index', description: 'Soil organic content' },
    { value: 'salinity', label: 'Salinity Index', description: 'Soil salt content' },
    { value: 'texture', label: 'Soil Texture Index', description: 'Clay, silt, sand composition' }
  ];

  const cnnModelOptions = [
    { value: 'crop-health-v2', label: 'Crop Health v2.0', description: 'Latest general crop health model' },
    { value: 'disease-specialist', label: 'Disease Specialist', description: 'Specialized disease detection' },
    { value: 'stress-detector', label: 'Stress Detector', description: 'Water and nutrient stress focus' },
    { value: 'multi-crop', label: 'Multi-Crop Classifier', description: 'Multiple crop type support' }
  ];

  const exportFormatOptions = [
    { value: 'geotiff', label: 'GeoTIFF', description: 'Georeferenced raster format' },
    { value: 'shapefile', label: 'Shapefile', description: 'Vector format for zones' },
    { value: 'json', label: 'JSON', description: 'Structured data format' },
    { value: 'csv', label: 'CSV', description: 'Tabular data format' },
    { value: 'pdf', label: 'PDF Report', description: 'Comprehensive analysis report' }
  ];

  const handleStartProcessing = () => {
    const processingConfig = {
      analysisType,
      vegetationIndices,
      soilIndices,
      cnnModel,
      confidenceThreshold,
      batchProcessing,
      exportFormat,
      selectedImages
    };
    
    onProcessingStart(processingConfig);
  };

  const getEstimatedTime = () => {
    const baseTime = selectedImages?.length * 2; // 2 minutes per image
    const complexityMultiplier = analysisType === 'comprehensive' ? 1.5 : 1;
    return Math.ceil(baseTime * complexityMultiplier);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Processing Configuration</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure AI analysis parameters for your images
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Analysis Type Selection */}
        <div>
          <Select
            label="Analysis Type"
            description="Choose the primary analysis focus"
            options={analysisTypeOptions}
            value={analysisType}
            onChange={setAnalysisType}
          />
        </div>

        {/* Vegetation Indices */}
        {(analysisType === 'vegetation' || analysisType === 'comprehensive') && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Leaf" size={16} className="mr-2" />
              Vegetation Indices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vegetationIndexOptions?.map((index) => (
                <Checkbox
                  key={index?.value}
                  label={index?.label}
                  description={index?.description}
                  checked={vegetationIndices?.includes(index?.value)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setVegetationIndices([...vegetationIndices, index?.value]);
                    } else {
                      setVegetationIndices(vegetationIndices?.filter(i => i !== index?.value));
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Soil Indices */}
        {(analysisType === 'soil' || analysisType === 'comprehensive') && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Mountain" size={16} className="mr-2" />
              Soil Indices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {soilIndexOptions?.map((index) => (
                <Checkbox
                  key={index?.value}
                  label={index?.label}
                  description={index?.description}
                  checked={soilIndices?.includes(index?.value)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSoilIndices([...soilIndices, index?.value]);
                    } else {
                      setSoilIndices(soilIndices?.filter(i => i !== index?.value));
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* CNN Model Configuration */}
        {(analysisType === 'disease' || analysisType === 'stress' || analysisType === 'comprehensive') && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Brain" size={16} className="mr-2" />
              AI Model Configuration
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Select
                label="CNN Model"
                description="Select the AI model for classification"
                options={cnnModelOptions}
                value={cnnModel}
                onChange={setCnnModel}
              />
              
              <Input
                type="range"
                label="Confidence Threshold"
                min="0.1"
                max="1.0"
                step="0.1"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e?.target?.value))}
                description={`Current: ${(confidenceThreshold * 100)?.toFixed(0)}%`}
              />
            </div>
          </div>
        )}

        {/* Processing Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Processing Options
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Checkbox
                label="Batch Processing"
                description="Process all images simultaneously for faster results"
                checked={batchProcessing}
                onChange={(e) => setBatchProcessing(e?.target?.checked)}
              />
            </div>
            
            <Select
              label="Export Format"
              description="Choose output format for results"
              options={exportFormatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>
        </div>

        {/* Processing Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Processing Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Images:</span>
              <div className="font-medium text-foreground">{selectedImages?.length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Analysis Type:</span>
              <div className="font-medium text-foreground capitalize">{analysisType}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Estimated Time:</span>
              <div className="font-medium text-foreground">{getEstimatedTime()} min</div>
            </div>
            <div>
              <span className="text-muted-foreground">Output Format:</span>
              <div className="font-medium text-foreground uppercase">{exportFormat}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedImages?.length === 0 
              ? 'Select images to enable processing'
              : `Ready to process ${selectedImages?.length} image${selectedImages?.length > 1 ? 's' : ''}`
            }
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Save"
              iconPosition="left"
            >
              Save Config
            </Button>
            
            <Button
              variant="default"
              iconName="Play"
              iconPosition="left"
              onClick={handleStartProcessing}
              disabled={selectedImages?.length === 0}
            >
              Start Processing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptionsPanel;