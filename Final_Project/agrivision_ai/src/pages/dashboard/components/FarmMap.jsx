import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const farmZones = [
    {
      id: 'zone-1',
      name: 'North Field',
      health: 'excellent',
      area: '12.5 acres',
      crop: 'Corn',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 'zone-2',
      name: 'South Field',
      health: 'good',
      area: '8.3 acres',
      crop: 'Soybeans',
      coordinates: { lat: 40.7100, lng: -74.0080 }
    },
    {
      id: 'zone-3',
      name: 'East Field',
      health: 'warning',
      area: '15.2 acres',
      crop: 'Wheat',
      coordinates: { lat: 40.7150, lng: -74.0040 }
    },
    {
      id: 'zone-4',
      name: 'West Field',
      health: 'critical',
      area: '6.8 acres',
      crop: 'Barley',
      coordinates: { lat: 40.7080, lng: -74.0100 }
    }
  ];

  const getHealthColor = (health) => {
    switch (health) {
      case 'excellent':
        return 'bg-success';
      case 'good':
        return 'bg-primary';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const getHealthLabel = (health) => {
    switch (health) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'warning':
        return 'Needs Attention';
      case 'critical':
        return 'Critical';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Farm Overview Map</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'spectral' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('spectral')}
            >
              Spectral
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Maximize2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-muted">
        {/* Map Container */}
        <div className="absolute inset-0">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Farm Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
            className="border-0"
          />
        </div>

        {/* Zone Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {farmZones?.map((zone, index) => (
            <div
              key={zone?.id}
              className={`absolute w-16 h-16 rounded-full ${getHealthColor(zone?.health)} opacity-70 pointer-events-auto cursor-pointer hover:opacity-90 transition-opacity duration-200`}
              style={{
                top: `${20 + index * 20}%`,
                left: `${15 + index * 15}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedZone(zone)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="secondary" size="icon">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="secondary" size="icon">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="secondary" size="icon">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Zone Legend */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {farmZones?.map((zone) => (
            <div
              key={zone?.id}
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedZone?.id === zone?.id ? 'bg-primary/10' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedZone(zone)}
            >
              <div className={`w-3 h-3 rounded-full ${getHealthColor(zone?.health)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{zone?.name}</p>
                <p className="text-xs text-muted-foreground">{zone?.crop} • {zone?.area}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Selected Zone Details */}
      {selectedZone && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">{selectedZone?.name}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedZone(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Crop:</span>
              <span className="ml-2 text-foreground font-medium">{selectedZone?.crop}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Area:</span>
              <span className="ml-2 text-foreground font-medium">{selectedZone?.area}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Health:</span>
              <span className={`ml-2 font-medium ${getHealthColor(selectedZone?.health)?.replace('bg-', 'text-')}`}>
                {getHealthLabel(selectedZone?.health)}
              </span>
            </div>
            <div>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmMap;