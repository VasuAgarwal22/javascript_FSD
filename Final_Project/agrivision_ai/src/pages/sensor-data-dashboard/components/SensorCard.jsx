import React from 'react';
import Icon from '../../../components/AppIcon';

const SensorCard = ({ sensor }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'critical': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { name: 'TrendingUp', color: 'text-success' };
      case 'down': return { name: 'TrendingDown', color: 'text-error' };
      case 'stable': return { name: 'Minus', color: 'text-muted-foreground' };
      default: return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const trendIcon = getTrendIcon(sensor?.trend);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={sensor?.icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{sensor?.name}</h3>
            <p className="text-sm text-muted-foreground">{sensor?.location}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sensor?.status)}`}>
          {sensor?.status?.charAt(0)?.toUpperCase() + sensor?.status?.slice(1)}
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            {sensor?.currentValue}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {sensor?.unit}
            </span>
          </span>
          <div className={`flex items-center space-x-1 ${trendIcon?.color}`}>
            <Icon name={trendIcon?.name} size={16} />
            <span className="text-sm font-medium">{sensor?.change}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Range</span>
            <span className="text-foreground">{sensor?.minValue} - {sensor?.maxValue} {sensor?.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="text-foreground">{sensor?.lastUpdated}</span>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              sensor?.status === 'normal' ? 'bg-success' : 
              sensor?.status === 'warning' ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${sensor?.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorCard;