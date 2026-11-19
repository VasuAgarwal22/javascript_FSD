import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SensorCard from './components/SensorCard';
import SensorChart from './components/SensorChart';
import SensorMap from './components/SensorMap';
import DataFilters from './components/DataFilters';
import AlertPanel from './components/AlertPanel';
import LiveDataStream from './components/LiveDataStream';
import Icon from '../../components/AppIcon';

const SensorDataDashboard = () => {
  const [selectedSensors, setSelectedSensors] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState(['current']);
  const [isStreaming, setIsStreaming] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Mock sensor data
  const sensorData = [
    {
      id: 'sm-001',
      name: 'Soil Moisture SM-001',
      location: 'Field A - Zone 1',
      icon: 'Droplets',
      currentValue: 45.2,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      change: '+0.5%',
      minValue: 30,
      maxValue: 70,
      percentage: 65,
      lastUpdated: '2 min ago'
    },
    {
      id: 'temp-002',
      name: 'Temperature T-002',
      location: 'Field A - Zone 2',
      icon: 'Thermometer',
      currentValue: 24.8,
      unit: '°C',
      status: 'normal',
      trend: 'up',
      change: '+1.2°C',
      minValue: 15,
      maxValue: 35,
      percentage: 71,
      lastUpdated: '1 min ago'
    },
    {
      id: 'hum-003',
      name: 'Humidity H-003',
      location: 'Field B - Zone 1',
      icon: 'Cloud',
      currentValue: 78.5,
      unit: '%',
      status: 'warning',
      trend: 'up',
      change: '+5.2%',
      minValue: 40,
      maxValue: 80,
      percentage: 85,
      lastUpdated: '3 min ago'
    },
    {
      id: 'lw-004',
      name: 'Leaf Wetness LW-004',
      location: 'Field B - Zone 2',
      icon: 'Leaf',
      currentValue: 92.1,
      unit: '%',
      status: 'critical',
      trend: 'up',
      change: '+8.3%',
      minValue: 0,
      maxValue: 100,
      percentage: 92,
      lastUpdated: '1 min ago'
    },
    {
      id: 'sm-005',
      name: 'Soil Moisture SM-005',
      location: 'Field C - Zone 1',
      icon: 'Droplets',
      currentValue: 38.7,
      unit: '%',
      status: 'warning',
      trend: 'down',
      change: '-2.1%',
      minValue: 30,
      maxValue: 70,
      percentage: 55,
      lastUpdated: '4 min ago'
    },
    {
      id: 'temp-006',
      name: 'Temperature T-006',
      location: 'Field C - Zone 2',
      icon: 'Thermometer',
      currentValue: 26.3,
      unit: '°C',
      status: 'normal',
      trend: 'stable',
      change: '+0.1°C',
      minValue: 15,
      maxValue: 35,
      percentage: 75,
      lastUpdated: '2 min ago'
    }
  ];

  // Mock chart data
  const generateChartData = (hours = 24) => {
    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      data?.push({
        timestamp: timestamp?.toISOString(),
        value: Math.random() * 50 + 20 + Math.sin(i / 4) * 10
      });
    }
    return data;
  };

  const chartData = {
    soilMoisture: generateChartData(24),
    temperature: generateChartData(24),
    humidity: generateChartData(24),
    leafWetness: generateChartData(24)
  };

  // Mock alerts
  useEffect(() => {
    setAlerts([
      {
        id: 1,
        type: 'critical',
        title: 'High Leaf Wetness Detected',
        message: 'Leaf wetness levels exceed 90% threshold. Risk of fungal disease development.',
        sensor: 'LW-004',
        value: '92.1%',
        timestamp: '5 min ago'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Low Soil Moisture',
        message: 'Soil moisture dropping below optimal range. Consider irrigation.',
        sensor: 'SM-005',
        value: '38.7%',
        timestamp: '10 min ago'
      },
      {
        id: 3,
        type: 'info',
        title: 'Temperature Rising',
        message: 'Temperature trending upward. Monitor for heat stress indicators.',
        sensor: 'T-002',
        value: '24.8°C',
        timestamp: '15 min ago'
      }
    ]);
  }, []);

  const handleSensorClick = (sensor) => {
    console.log('Sensor clicked:', sensor);
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Mock export functionality
    const csvData = sensorData?.map(sensor => 
      `${sensor?.name},${sensor?.currentValue},${sensor?.unit},${sensor?.status},${sensor?.lastUpdated}`
    )?.join('\n');
    
    const blob = new Blob([`Name,Value,Unit,Status,Last Updated\n${csvData}`], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensor-data-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    // Mock refresh functionality
    window.location?.reload();
  };

  const handleConfigureAlert = (alertConfig) => {
    console.log('Configuring alert:', alertConfig);
    // Mock alert configuration
    const newAlert = {
      id: Date.now(),
      type: 'info',
      title: `New Alert Configured`,
      message: `Alert set for ${alertConfig?.sensorType} ${alertConfig?.condition} ${alertConfig?.threshold}`,
      sensor: alertConfig?.sensorType?.toUpperCase(),
      value: `${alertConfig?.threshold}`,
      timestamp: 'Just now'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} color="var(--color-primary)" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Sensor Data Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Real-time monitoring and analysis of IoT sensor data across agricultural fields
            </p>
          </div>

          {/* Data Filters */}
          <div className="mb-8">
            <DataFilters
              selectedSensors={selectedSensors}
              onSensorChange={setSelectedSensors}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={setSelectedTimeRange}
              selectedMetrics={selectedMetrics}
              onMetricsChange={setSelectedMetrics}
              onExport={handleExport}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Sensor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sensorData?.map((sensor) => (
              <SensorCard key={sensor?.id} sensor={sensor} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SensorChart
              data={chartData?.soilMoisture}
              title="Soil Moisture Trends"
              color="var(--color-primary)"
              unit="%"
              type="area"
            />
            <SensorChart
              data={chartData?.temperature}
              title="Temperature Trends"
              color="var(--color-accent)"
              unit="°C"
              type="line"
            />
            <SensorChart
              data={chartData?.humidity}
              title="Humidity Trends"
              color="var(--color-secondary)"
              unit="%"
              type="area"
            />
            <SensorChart
              data={chartData?.leafWetness}
              title="Leaf Wetness Trends"
              color="var(--color-success)"
              unit="%"
              type="line"
            />
          </div>

          {/* Map and Live Stream Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SensorMap
              sensors={sensorData}
              onSensorClick={handleSensorClick}
            />
            <LiveDataStream
              isStreaming={isStreaming}
              onToggleStream={toggleStreaming}
            />
          </div>

          {/* Alert Panel */}
          <div className="mb-8">
            <AlertPanel
              alerts={alerts}
              onConfigureAlert={handleConfigureAlert}
              onDismissAlert={handleDismissAlert}
            />
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {sensorData?.filter(s => s?.status === 'normal')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Normal Sensors</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {sensorData?.filter(s => s?.status === 'warning')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Warning Sensors</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {sensorData?.filter(s => s?.status === 'critical')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Sensors</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Database" size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {sensorData?.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Sensors</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SensorDataDashboard;