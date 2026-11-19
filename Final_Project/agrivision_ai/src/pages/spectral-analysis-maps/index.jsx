import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import MapLegend from './components/MapLegend';
import LayerControls from './components/LayerControls';
import AnalysisControls from './components/AnalysisControls';
import AnomalyDetails from './components/AnomalyDetails';
import TemporalComparison from './components/TemporalComparison';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SpectralAnalysisMaps = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    ndvi: { enabled: true, opacity: 0.8 },
    savi: { enabled: false, opacity: 0.7 },
    evi: { enabled: false, opacity: 0.75 },
    moisture: { enabled: false, opacity: 0.6 },
    temperature: { enabled: false, opacity: 0.65 },
    anomalies: { enabled: true, opacity: 0.9 }
  });

  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [isLegendVisible, setIsLegendVisible] = useState(true);
  const [isTemporalComparisonVisible, setIsTemporalComparisonVisible] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

  const handleLayerToggle = useCallback((layerId) => {
    setSelectedLayers(prev => ({
      ...prev,
      [layerId]: {
        ...prev?.[layerId],
        enabled: !prev?.[layerId]?.enabled
      }
    }));
  }, []);

  const handleOpacityChange = useCallback((layerId, opacity) => {
    setSelectedLayers(prev => ({
      ...prev,
      [layerId]: {
        ...prev?.[layerId],
        opacity
      }
    }));
  }, []);

  const handleAnomalyClick = useCallback((anomaly) => {
    setSelectedAnomaly(anomaly);
  }, []);

  const handleCoordinateUpdate = useCallback((coordinates) => {
    setCurrentCoordinates(coordinates);
  }, []);

  const handleAnalysisUpdate = useCallback((params) => {
    console.log('Updating analysis with params:', params);
    // In a real application, this would trigger API calls to update the map
  }, []);

  const handleExport = useCallback((exportParams) => {
    console.log('Exporting data:', exportParams);
    // In a real application, this would trigger file downloads
  }, []);

  const handleTemporalCompare = useCallback(() => {
    setIsTemporalComparisonVisible(true);
  }, []);

  const handleGenerateReport = useCallback((anomaly) => {
    console.log('Generating report for anomaly:', anomaly);
    // In a real application, this would generate and download a PDF report
  }, []);

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Left Panel - Analysis Controls */}
        <div className={`bg-card border-r border-border transition-all duration-300 ${
          isLeftPanelCollapsed ? 'w-12' : 'w-80'
        } flex-shrink-0 overflow-hidden`}>
          {/* Panel Toggle */}
          <div className="p-3 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLeftPanel}
              className="w-full"
            >
              <Icon name={isLeftPanelCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>

          {!isLeftPanelCollapsed && (
            <div className="p-4 h-full overflow-y-auto">
              <div className="space-y-6">
                {/* Page Header */}
                <div>
                  <h1 className="font-heading font-bold text-xl text-foreground">
                    Spectral Analysis Maps
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Interactive crop health visualization through spectral overlays
                  </p>
                </div>

                {/* Layer Controls */}
                <LayerControls
                  selectedLayers={selectedLayers}
                  onLayerToggle={handleLayerToggle}
                  onOpacityChange={handleOpacityChange}
                />

                {/* Analysis Controls */}
                <AnalysisControls
                  onAnalysisUpdate={handleAnalysisUpdate}
                  onExport={handleExport}
                  onTemporalCompare={handleTemporalCompare}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <MapContainer
            selectedLayers={selectedLayers}
            onAnomalyClick={handleAnomalyClick}
            onCoordinateUpdate={handleCoordinateUpdate}
          />

          {/* Map Legend */}
          <MapLegend
            isVisible={isLegendVisible}
            onToggle={() => setIsLegendVisible(!isLegendVisible)}
          />

          {/* Legend Toggle Button (when hidden) */}
          {!isLegendVisible && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsLegendVisible(true)}
              className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border shadow-sm"
            >
              <Icon name="Info" size={16} />
            </Button>
          )}

          {/* Anomaly Details Panel */}
          <AnomalyDetails
            anomaly={selectedAnomaly}
            onClose={() => setSelectedAnomaly(null)}
            onGenerateReport={handleGenerateReport}
          />

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleTemporalCompare}
              iconName="Calendar"
              iconPosition="left"
              className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
            >
              Compare Periods
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport({ format: 'png' })}
              iconName="Camera"
              iconPosition="left"
              className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
            >
              Capture
            </Button>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded px-3 py-2 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-muted-foreground">Live Data</span>
              </div>
              <div className="text-muted-foreground">
                Last Update: {new Date()?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Temporal Comparison Modal */}
      <TemporalComparison
        isVisible={isTemporalComparisonVisible}
        onClose={() => setIsTemporalComparisonVisible(false)}
      />
    </div>
  );
};

export default SpectralAnalysisMaps;