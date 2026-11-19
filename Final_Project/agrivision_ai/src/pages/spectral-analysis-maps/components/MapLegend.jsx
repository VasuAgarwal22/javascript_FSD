import React from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = ({ isVisible, onToggle }) => {
  const legendItems = [
    {
      category: "Vegetation Health",
      items: [
        { color: "#22C55E", label: "Excellent (0.8-1.0)", description: "Optimal crop health" },
        { color: "#84CC16", label: "Good (0.6-0.8)", description: "Healthy vegetation" },
        { color: "#EAB308", label: "Moderate (0.4-0.6)", description: "Stress indicators" },
        { color: "#F97316", label: "Poor (0.2-0.4)", description: "Significant stress" },
        { color: "#EF4444", label: "Critical (0.0-0.2)", description: "Severe damage" }
      ]
    },
    {
      category: "Soil Conditions",
      items: [
        { color: "#8B5CF6", label: "High Moisture", description: "Optimal water content" },
        { color: "#06B6D4", label: "Moderate Moisture", description: "Adequate water levels" },
        { color: "#F59E0B", label: "Low Moisture", description: "Irrigation needed" },
        { color: "#DC2626", label: "Drought Stress", description: "Critical water deficit" }
      ]
    },
    {
      category: "Anomalies",
      items: [
        { color: "#FF0000", label: "Disease Detected", description: "Potential pathogen presence", icon: "AlertTriangle" },
        { color: "#FF6B00", label: "Pest Activity", description: "Insect damage indicators", icon: "Bug" },
        { color: "#9333EA", label: "Nutrient Deficiency", description: "Fertilization required", icon: "Droplets" }
      ]
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute top-4 right-4 bg-card border border-border rounded-lg shadow-modal p-4 max-w-xs z-30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-sm text-foreground">Map Legend</h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {legendItems?.map((category) => (
          <div key={category?.category}>
            <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              {category?.category}
            </h4>
            <div className="space-y-2">
              {category?.items?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 flex-1">
                    {item?.icon ? (
                      <Icon name={item?.icon} size={12} color={item?.color} />
                    ) : (
                      <div
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: item?.color }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">
                        {item?.label}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {item?.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;