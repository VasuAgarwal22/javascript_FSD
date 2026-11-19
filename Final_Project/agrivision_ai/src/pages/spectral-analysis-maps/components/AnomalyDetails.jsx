import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnomalyDetails = ({ anomaly, onClose, onGenerateReport }) => {
  if (!anomaly) return null;

  const getAnomalyIcon = (type) => {
    const icons = {
      disease: 'AlertTriangle',
      pest: 'Bug',
      nutrient: 'Droplets'
    };
    return icons?.[type] || 'AlertCircle';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors?.[severity] || 'text-muted-foreground';
  };

  const getSeverityBg = (severity) => {
    const colors = {
      high: 'bg-error/10 border-error/20',
      medium: 'bg-warning/10 border-warning/20',
      low: 'bg-success/10 border-success/20'
    };
    return colors?.[severity] || 'bg-muted/10 border-border';
  };

  const recommendations = {
    disease: [
      "Apply targeted fungicide treatment within 48 hours",
      "Increase air circulation in affected areas",
      "Monitor adjacent areas for spread prevention",
      "Consider resistant crop varieties for next season"
    ],
    pest: [
      "Deploy integrated pest management strategies",
      "Use beneficial insects for biological control",
      "Apply selective pesticides if threshold exceeded",
      "Install pheromone traps for monitoring"
    ],
    nutrient: [
      "Conduct detailed soil nutrient analysis",
      "Apply targeted fertilizer based on deficiency",
      "Implement precision agriculture techniques",
      "Monitor plant response over 2-3 weeks"
    ]
  };

  const metrics = {
    disease: [
      { label: 'Infection Rate', value: '12.3%', trend: 'increasing' },
      { label: 'Spread Velocity', value: '0.8 m/day', trend: 'stable' },
      { label: 'Plant Mortality', value: '2.1%', trend: 'increasing' }
    ],
    pest: [
      { label: 'Damage Level', value: '15.7%', trend: 'increasing' },
      { label: 'Population Density', value: 'High', trend: 'stable' },
      { label: 'Economic Threshold', value: 'Exceeded', trend: 'critical' }
    ],
    nutrient: [
      { label: 'Deficiency Level', value: 'Moderate', trend: 'stable' },
      { label: 'Yield Impact', value: '8.2%', trend: 'stable' },
      { label: 'Recovery Time', value: '2-3 weeks', trend: 'improving' }
    ]
  };

  const getTrendIcon = (trend) => {
    const icons = {
      increasing: 'TrendingUp',
      decreasing: 'TrendingDown',
      stable: 'Minus',
      improving: 'TrendingDown',
      critical: 'AlertTriangle'
    };
    return icons?.[trend] || 'Minus';
  };

  const getTrendColor = (trend) => {
    const colors = {
      increasing: 'text-error',
      decreasing: 'text-success',
      stable: 'text-muted-foreground',
      improving: 'text-success',
      critical: 'text-error'
    };
    return colors?.[trend] || 'text-muted-foreground';
  };

  return (
    <div className="absolute top-4 left-4 w-80 bg-card border border-border rounded-lg shadow-modal z-40 max-h-[calc(100vh-2rem)] overflow-y-auto">
      {/* Header */}
      <div className={`p-4 border-b border-border ${getSeverityBg(anomaly?.severity)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getAnomalyIcon(anomaly?.type)} 
              size={20} 
              className={getSeverityColor(anomaly?.severity)}
            />
            <div>
              <h3 className="font-heading font-semibold text-sm text-foreground capitalize">
                {anomaly?.type} Detection
              </h3>
              <p className="text-xs text-muted-foreground">
                Severity: <span className={`font-medium capitalize ${getSeverityColor(anomaly?.severity)}`}>
                  {anomaly?.severity}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Details */}
      <div className="p-4 space-y-4">
        {/* Basic Information */}
        <div>
          <h4 className="font-medium text-sm text-foreground mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{anomaly?.description}</p>
        </div>

        {/* Location & Area */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Location</h4>
            <p className="text-xs text-muted-foreground font-mono">
              {anomaly?.lat?.toFixed(4)}, {anomaly?.lng?.toFixed(4)}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Affected Area</h4>
            <p className="text-xs text-muted-foreground">{anomaly?.area}</p>
          </div>
        </div>

        {/* Confidence Score */}
        <div>
          <h4 className="font-medium text-sm text-foreground mb-2">Detection Confidence</h4>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${anomaly?.confidence * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {Math.round(anomaly?.confidence * 100)}%
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h4 className="font-medium text-sm text-foreground mb-2">Key Metrics</h4>
          <div className="space-y-2">
            {metrics?.[anomaly?.type]?.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-xs text-muted-foreground">{metric?.label}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-medium text-foreground">{metric?.value}</span>
                  <Icon 
                    name={getTrendIcon(metric?.trend)} 
                    size={12} 
                    className={getTrendColor(metric?.trend)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="font-medium text-sm text-foreground mb-2">Recommendations</h4>
          <div className="space-y-2">
            {recommendations?.[anomaly?.type]?.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-border space-y-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onGenerateReport(anomaly)}
            iconName="FileText"
            iconPosition="left"
            className="w-full"
          >
            Generate Report
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MapPin"
              iconPosition="left"
            >
              Mark Treated
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
            >
              Schedule Visit
            </Button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Detected: September 13, 2024 at 3:46 PM
          </p>
          <p className="text-xs text-muted-foreground">
            Last Updated: 2 minutes ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetails;