import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, value, unit, icon, status, trend, trendValue, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
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

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer ${getStatusColor(status)}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <Icon name={getTrendIcon(trend)} size={16} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default SummaryCard;