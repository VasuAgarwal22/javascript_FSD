import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetrics, setSelectedMetrics] = useState(['health', 'moisture']);

  // Mock data for the last 7 days
  const generateChartData = () => {
    const data = [];
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date?.setDate(date?.getDate() - i);
      
      data?.push({
        date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date?.toISOString()?.split('T')?.[0],
        health: 75 + Math.random() * 20 - 10,
        moisture: 45 + Math.random() * 20 - 10,
        temperature: 22 + Math.random() * 8 - 4,
        humidity: 60 + Math.random() * 20 - 10,
        ndvi: 0.6 + Math.random() * 0.3 - 0.15
      });
    }
    
    return data;
  };

  const chartData = generateChartData();

  const metrics = [
    { key: 'health', label: 'Crop Health', color: '#059669', unit: '%' },
    { key: 'moisture', label: 'Soil Moisture', color: '#2563eb', unit: '%' },
    { key: 'temperature', label: 'Temperature', color: '#dc2626', unit: '°C' },
    { key: 'humidity', label: 'Humidity', color: '#7c3aed', unit: '%' },
    { key: 'ndvi', label: 'NDVI', color: '#ea580c', unit: '' }
  ];

  const timeRanges = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' }
  ];

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev => 
      prev?.includes(metricKey)
        ? prev?.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {entry?.value?.toFixed(1)}{metrics?.find(m => m?.key === entry?.dataKey)?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Trend Analysis</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Maximize2" size={16} />
          </Button>
        </div>
      </div>
      {/* Time Range Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {timeRanges?.map(range => (
            <button
              key={range?.key}
              onClick={() => setTimeRange(range?.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                timeRange === range?.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>

        {/* Metric Toggles */}
        <div className="flex items-center space-x-2">
          {metrics?.map(metric => (
            <button
              key={metric?.key}
              onClick={() => toggleMetric(metric?.key)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedMetrics?.includes(metric?.key)
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metric?.color }}
              />
              <span>{metric?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics?.map(metricKey => {
              const metric = metrics?.find(m => m?.key === metricKey);
              return (
                <Line
                  key={metricKey}
                  type="monotone"
                  dataKey={metricKey}
                  stroke={metric?.color}
                  strokeWidth={2}
                  dot={{ fill: metric?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: metric?.color, strokeWidth: 2 }}
                  name={metric?.label}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedMetrics?.map(metricKey => {
            const metric = metrics?.find(m => m?.key === metricKey);
            const values = chartData?.map(d => d?.[metricKey]);
            const avg = values?.reduce((a, b) => a + b, 0) / values?.length;
            const trend = values?.[values?.length - 1] - values?.[0];
            
            return (
              <div key={metricKey} className="text-center">
                <div className="text-sm text-muted-foreground mb-1">{metric?.label}</div>
                <div className="text-lg font-semibold text-foreground">
                  {avg?.toFixed(1)}{metric?.unit}
                </div>
                <div className={`text-xs flex items-center justify-center space-x-1 ${
                  trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-muted-foreground'
                }`}>
                  <Icon 
                    name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'} 
                    size={12} 
                  />
                  <span>{Math.abs(trend)?.toFixed(1)}{metric?.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendChart;