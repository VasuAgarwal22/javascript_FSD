import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SensorMap = ({ sensors, onSensorClick }) => {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
    onSensorClick?.(sensor);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Field Sensor Map</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
      <div className="relative bg-muted rounded-lg h-96 overflow-hidden">
        {/* Mock Map Background */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Agricultural Field Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
          className="rounded-lg"
        />
        
        {/* Sensor Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {sensors?.map((sensor, index) => (
            <div
              key={sensor?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${30 + Math.floor(index / 4) * 25}%`
              }}
              onClick={() => handleSensorClick(sensor)}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(sensor?.status)} border-2 border-white shadow-lg animate-pulse`}>
              </div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs font-medium text-popover-foreground shadow-md whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
                {sensor?.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSensor && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={selectedSensor?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{selectedSensor?.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedSensor?.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                {selectedSensor?.currentValue} {selectedSensor?.unit}
              </div>
              <div className="text-sm text-muted-foreground">
                Updated {selectedSensor?.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorMap;