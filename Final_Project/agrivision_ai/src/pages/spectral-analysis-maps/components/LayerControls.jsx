import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LayerControls = ({ selectedLayers, onLayerToggle, onOpacityChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const layerOptions = [
    {
      id: 'ndvi',
      name: 'NDVI',
      description: 'Normalized Difference Vegetation Index',
      color: '#22C55E',
      opacity: selectedLayers?.ndvi?.opacity || 0.8,
      enabled: selectedLayers?.ndvi?.enabled || false
    },
    {
      id: 'savi',
      name: 'SAVI',
      description: 'Soil Adjusted Vegetation Index',
      color: '#84CC16',
      opacity: selectedLayers?.savi?.opacity || 0.7,
      enabled: selectedLayers?.savi?.enabled || false
    },
    {
      id: 'evi',
      name: 'EVI',
      description: 'Enhanced Vegetation Index',
      color: '#06B6D4',
      opacity: selectedLayers?.evi?.opacity || 0.75,
      enabled: selectedLayers?.evi?.enabled || false
    },
    {
      id: 'moisture',
      name: 'Soil Moisture',
      description: 'Soil water content analysis',
      color: '#3B82F6',
      opacity: selectedLayers?.moisture?.opacity || 0.6,
      enabled: selectedLayers?.moisture?.enabled || false
    },
    {
      id: 'temperature',
      name: 'Surface Temperature',
      description: 'Thermal infrared analysis',
      color: '#F59E0B',
      opacity: selectedLayers?.temperature?.opacity || 0.65,
      enabled: selectedLayers?.temperature?.enabled || false
    },
    {
      id: 'anomalies',
      name: 'Anomalies',
      description: 'Disease and pest indicators',
      color: '#EF4444',
      opacity: selectedLayers?.anomalies?.opacity || 0.9,
      enabled: selectedLayers?.anomalies?.enabled || true
    }
  ];

  const handleLayerToggle = (layerId) => {
    onLayerToggle(layerId);
  };

  const handleOpacityChange = (layerId, opacity) => {
    onOpacityChange(layerId, opacity);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-heading font-semibold text-sm text-foreground">
            Layer Controls
          </h3>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground"
          />
        </button>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          {layerOptions?.map((layer) => (
            <div key={layer?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: layer?.color }}
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layer?.enabled}
                      onChange={() => handleLayerToggle(layer?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {layer?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {layer?.description}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {layer?.enabled && (
                <div className="ml-5 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground w-12">
                      Opacity:
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={layer?.opacity}
                      onChange={(e) => handleOpacityChange(layer?.id, parseFloat(e?.target?.value))}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-muted-foreground w-8">
                      {Math.round(layer?.opacity * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                layerOptions?.forEach(layer => {
                  if (layer?.enabled) {
                    handleLayerToggle(layer?.id);
                  }
                });
              }}
              className="w-full"
            >
              Clear All Layers
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerControls;