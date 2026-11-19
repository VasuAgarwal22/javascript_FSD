import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const DataFilters = ({ 
  selectedSensors, 
  onSensorChange, 
  selectedTimeRange, 
  onTimeRangeChange,
  selectedMetrics,
  onMetricsChange,
  onExport,
  onRefresh 
}) => {
  const sensorOptions = [
    { value: 'all', label: 'All Sensors' },
    { value: 'soil-moisture', label: 'Soil Moisture Sensors' },
    { value: 'temperature', label: 'Temperature Sensors' },
    { value: 'humidity', label: 'Humidity Sensors' },
    { value: 'leaf-wetness', label: 'Leaf Wetness Sensors' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const metricOptions = [
    { value: 'current', label: 'Current Values' },
    { value: 'average', label: 'Average' },
    { value: 'min-max', label: 'Min/Max' },
    { value: 'trends', label: 'Trends' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Data Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Sensor Type"
          options={sensorOptions}
          value={selectedSensors}
          onChange={onSensorChange}
          className="w-full"
        />

        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={selectedTimeRange}
          onChange={onTimeRangeChange}
          className="w-full"
        />

        <Select
          label="Metrics"
          options={metricOptions}
          value={selectedMetrics}
          onChange={onMetricsChange}
          multiple
          className="w-full"
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing data for {selectedSensors === 'all' ? 'all sensors' : selectedSensors?.replace('-', ' ')}</span>
        <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default DataFilters;