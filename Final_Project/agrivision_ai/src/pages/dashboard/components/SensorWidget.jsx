import React from 'react';
import Icon from '../../../components/AppIcon';

const SensorWidget = ({ title, value, unit, icon, status, trend, min, max, lastUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal':
        return 'text-success bg-success/10 border-success/20';
      case 'good':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'ArrowUp';
      case 'down':
        return 'ArrowDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  // Generate sparkline data (mock trend data)
  const generateSparklineData = () => {
    const points = [];
    const baseValue = parseFloat(value);
    for (let i = 0; i < 20; i++) {
      const variation = (Math.random() - 0.5) * (baseValue * 0.2);
      points?.push(baseValue + variation);
    }
    return points;
  };

  const sparklineData = generateSparklineData();
  const sparklineMax = Math.max(...sparklineData);
  const sparklineMin = Math.min(...sparklineData);

  const createSparklinePath = () => {
    const width = 80;
    const height = 20;
    const points = sparklineData?.map((value, index) => {
      const x = (index / (sparklineData?.length - 1)) * width;
      const y = height - ((value - sparklineMin) / (sparklineMax - sparklineMin)) * height;
      return `${x},${y}`;
    });
    return `M ${points?.join(' L ')}`;
  };

  const formatLastUpdate = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className={`bg-card border rounded-lg p-4 ${getStatusColor(status)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <Icon name={icon} size={16} className="text-primary" />
          </div>
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={12} />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline space-x-1 mb-1">
          <span className="text-xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        {min !== undefined && max !== undefined && (
          <div className="text-xs text-muted-foreground">
            Range: {min} - {max} {unit}
          </div>
        )}
      </div>

      {/* Sparkline Chart */}
      <div className="mb-3">
        <svg width="80" height="20" className="w-full h-5">
          <path
            d={createSparklinePath()}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={getTrendColor(trend)}
          />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground">
        Updated {formatLastUpdate(lastUpdate)}
      </div>
    </div>
  );
};

export default SensorWidget;