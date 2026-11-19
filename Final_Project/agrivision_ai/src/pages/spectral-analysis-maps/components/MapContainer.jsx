import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ selectedLayers, onAnomalyClick, onCoordinateUpdate }) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(14);
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  // Mock anomaly data points
  const anomalies = [
    {
      id: 1,
      lat: 40.7130,
      lng: -74.0058,
      type: 'disease',
      severity: 'high',
      description: 'Potential fungal infection detected',
      area: '2.3 hectares',
      confidence: 0.87
    },
    {
      id: 2,
      lat: 40.7125,
      lng: -74.0065,
      type: 'pest',
      severity: 'medium',
      description: 'Insect damage indicators',
      area: '1.1 hectares',
      confidence: 0.72
    },
    {
      id: 3,
      lat: 40.7135,
      lng: -74.0055,
      type: 'nutrient',
      severity: 'low',
      description: 'Nitrogen deficiency signs',
      area: '0.8 hectares',
      confidence: 0.65
    }
  ];

  const handleMapClick = (event) => {
    const rect = mapRef?.current?.getBoundingClientRect();
    const x = event?.clientX - rect?.left;
    const y = event?.clientY - rect?.top;
    
    // Convert pixel coordinates to lat/lng (mock calculation)
    const newLat = mapCenter?.lat + (y - rect?.height / 2) * 0.0001;
    const newLng = mapCenter?.lng + (x - rect?.width / 2) * 0.0001;
    
    setCoordinates({ lat: newLat, lng: newLng });
    onCoordinateUpdate({ lat: newLat, lng: newLng });

    if (measurementMode) {
      setMeasurements(prev => [...prev, { lat: newLat, lng: newLng, id: Date.now() }]);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const handleResetView = () => {
    setMapCenter({ lat: 40.7128, lng: -74.0060 });
    setZoomLevel(14);
  };

  const toggleMeasurement = () => {
    setMeasurementMode(!measurementMode);
    if (measurementMode) {
      setMeasurements([]);
    }
  };

  const getAnomalyColor = (type, severity) => {
    const colors = {
      disease: { high: '#DC2626', medium: '#F59E0B', low: '#84CC16' },
      pest: { high: '#7C2D12', medium: '#EA580C', low: '#FB923C' },
      nutrient: { high: '#581C87', medium: '#7C3AED', low: '#A78BFA' }
    };
    return colors?.[type]?.[severity] || '#6B7280';
  };

  useEffect(() => {
    // Simulate real-time coordinate updates
    const interval = setInterval(() => {
      onCoordinateUpdate(coordinates);
    }, 1000);

    return () => clearInterval(interval);
  }, [coordinates, onCoordinateUpdate]);

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full cursor-crosshair relative"
        onClick={handleMapClick}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Spectral Overlay Simulation */}
        {selectedLayers?.ndvi?.enabled && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(45deg, 
                rgba(34, 197, 94, ${selectedLayers?.ndvi?.opacity * 0.3}) 0%, 
                rgba(132, 204, 22, ${selectedLayers?.ndvi?.opacity * 0.4}) 25%, 
                rgba(234, 179, 8, ${selectedLayers?.ndvi?.opacity * 0.5}) 50%, 
                rgba(249, 115, 22, ${selectedLayers?.ndvi?.opacity * 0.4}) 75%, 
                rgba(239, 68, 68, ${selectedLayers?.ndvi?.opacity * 0.3}) 100%)`
            }}
          />
        )}

        {selectedLayers?.moisture?.enabled && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 40%, 
                rgba(139, 92, 246, ${selectedLayers?.moisture?.opacity * 0.4}) 0%, 
                rgba(6, 182, 212, ${selectedLayers?.moisture?.opacity * 0.3}) 40%, 
                rgba(245, 158, 11, ${selectedLayers?.moisture?.opacity * 0.2}) 70%, 
                rgba(220, 38, 38, ${selectedLayers?.moisture?.opacity * 0.1}) 100%)`
            }}
          />
        )}

        {/* Anomaly Markers */}
        {selectedLayers?.anomalies?.enabled && anomalies?.map((anomaly) => (
          <div
            key={anomaly?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{
              left: `${50 + (anomaly?.lng - mapCenter?.lng) * 10000}%`,
              top: `${50 + (anomaly?.lat - mapCenter?.lat) * 10000}%`
            }}
            onClick={(e) => {
              e?.stopPropagation();
              onAnomalyClick(anomaly);
            }}
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
              style={{ backgroundColor: getAnomalyColor(anomaly?.type, anomaly?.severity) }}
            />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap shadow-modal opacity-0 hover:opacity-100 transition-opacity">
              {anomaly?.description}
            </div>
          </div>
        ))}

        {/* Measurement Points */}
        {measurements?.map((point, index) => (
          <div
            key={point?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${50 + (point?.lng - mapCenter?.lng) * 10000}%`,
              top: `${50 + (point?.lat - mapCenter?.lat) * 10000}%`
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-full border border-white shadow-sm" />
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs text-primary font-medium">
              {index + 1}
            </div>
          </div>
        ))}

        {/* Coordinate Display */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded px-3 py-2 text-xs font-mono">
          <div className="text-muted-foreground">Coordinates:</div>
          <div className="text-foreground">
            {coordinates?.lat?.toFixed(6)}, {coordinates?.lng?.toFixed(6)}
          </div>
          <div className="text-muted-foreground mt-1">
            Zoom: {zoomLevel}x
          </div>
        </div>
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-30">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
        >
          <Icon name="Plus" size={16} />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
        >
          <Icon name="Minus" size={16} />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleResetView}
          className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
        >
          <Icon name="Home" size={16} />
        </Button>
        
        <Button
          variant={measurementMode ? "default" : "secondary"}
          size="icon"
          onClick={toggleMeasurement}
          className="bg-card/90 backdrop-blur-sm border border-border shadow-sm"
        >
          <Icon name="Ruler" size={16} />
        </Button>
      </div>
      {/* Scale Bar */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded px-3 py-2">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-16 h-1 bg-foreground"></div>
          <span className="text-muted-foreground">100m</span>
        </div>
      </div>
      {/* North Arrow */}
      <div className="absolute top-4 right-20 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2">
        <Icon name="Navigation" size={16} className="text-foreground" />
      </div>
    </div>
  );
};

export default MapContainer;