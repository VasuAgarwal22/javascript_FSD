import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AnalysisControls = ({ onAnalysisUpdate, onExport, onTemporalCompare }) => {
  const [selectedIndex, setSelectedIndex] = useState('ndvi');
  const [dateRange, setDateRange] = useState({
    start: '2024-09-01',
    end: '2024-09-13'
  });
  const [processingParams, setProcessingParams] = useState({
    resolution: '10m',
    cloudCover: '10',
    atmosphericCorrection: true
  });

  const spectralIndices = [
    { value: 'ndvi', label: 'NDVI - Vegetation Health' },
    { value: 'savi', label: 'SAVI - Soil Adjusted' },
    { value: 'evi', label: 'EVI - Enhanced Vegetation' },
    { value: 'ndwi', label: 'NDWI - Water Content' },
    { value: 'gndvi', label: 'GNDVI - Green NDVI' },
    { value: 'msavi', label: 'MSAVI - Modified SAVI' }
  ];

  const resolutionOptions = [
    { value: '5m', label: '5m - Highest Detail' },
    { value: '10m', label: '10m - High Detail' },
    { value: '20m', label: '20m - Medium Detail' },
    { value: '30m', label: '30m - Standard' }
  ];

  const cloudCoverOptions = [
    { value: '5', label: '< 5% - Clear Sky' },
    { value: '10', label: '< 10% - Mostly Clear' },
    { value: '20', label: '< 20% - Partly Cloudy' },
    { value: '30', label: '< 30% - Acceptable' }
  ];

  const handleAnalysisUpdate = () => {
    onAnalysisUpdate({
      index: selectedIndex,
      dateRange,
      processingParams
    });
  };

  const handleExport = (format) => {
    onExport({
      format,
      index: selectedIndex,
      dateRange,
      processingParams
    });
  };

  return (
    <div className="space-y-6">
      {/* Spectral Index Selection */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Spectral Analysis
        </h3>
        <div className="space-y-4">
          <Select
            label="Vegetation Index"
            options={spectralIndices}
            value={selectedIndex}
            onChange={setSelectedIndex}
            className="w-full"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={dateRange?.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
            />
            <Input
              label="End Date"
              type="date"
              value={dateRange?.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
            />
          </div>
        </div>
      </div>
      {/* Processing Parameters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Processing Parameters
        </h3>
        <div className="space-y-4">
          <Select
            label="Spatial Resolution"
            options={resolutionOptions}
            value={processingParams?.resolution}
            onChange={(value) => setProcessingParams(prev => ({ ...prev, resolution: value }))}
          />
          
          <Select
            label="Max Cloud Cover"
            options={cloudCoverOptions}
            value={processingParams?.cloudCover}
            onChange={(value) => setProcessingParams(prev => ({ ...prev, cloudCover: value }))}
          />
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="atmospheric"
              checked={processingParams?.atmosphericCorrection}
              onChange={(e) => setProcessingParams(prev => ({ 
                ...prev, 
                atmosphericCorrection: e?.target?.checked 
              }))}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="atmospheric" className="text-sm text-foreground cursor-pointer">
              Atmospheric Correction
            </label>
          </div>
        </div>
      </div>
      {/* Analysis Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Analysis Actions
        </h3>
        <div className="space-y-3">
          <Button
            variant="default"
            onClick={handleAnalysisUpdate}
            iconName="RefreshCw"
            iconPosition="left"
            className="w-full"
          >
            Update Analysis
          </Button>
          
          <Button
            variant="outline"
            onClick={onTemporalCompare}
            iconName="Calendar"
            iconPosition="left"
            className="w-full"
          >
            Temporal Comparison
          </Button>
        </div>
      </div>
      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Export Data
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('png')}
            iconName="Image"
            iconPosition="left"
            className="w-full"
          >
            Export as PNG
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('geotiff')}
            iconName="Map"
            iconPosition="left"
            className="w-full"
          >
            Export GeoTIFF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            iconName="FileText"
            iconPosition="left"
            className="w-full"
          >
            Export CSV Data
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Analysis Summary
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Area:</span>
            <span className="text-foreground font-medium">247.3 hectares</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Healthy Vegetation:</span>
            <span className="text-success font-medium">78.2%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stress Areas:</span>
            <span className="text-warning font-medium">15.8%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Critical Zones:</span>
            <span className="text-error font-medium">6.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisControls;