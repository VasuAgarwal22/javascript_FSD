import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TemporalComparison = ({ isVisible, onClose }) => {
  const [selectedPeriods, setSelectedPeriods] = useState({
    period1: '2024-08-13',
    period2: '2024-09-13'
  });
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [analysisMetric, setAnalysisMetric] = useState('ndvi');

  const periodOptions = [
    { value: '2024-09-13', label: 'September 13, 2024 (Current)' },
    { value: '2024-08-13', label: 'August 13, 2024' },
    { value: '2024-07-13', label: 'July 13, 2024' },
    { value: '2024-06-13', label: 'June 13, 2024' },
    { value: '2024-05-13', label: 'May 13, 2024' }
  ];

  const comparisonModes = [
    { value: 'side-by-side', label: 'Side by Side' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'difference', label: 'Difference Map' },
    { value: 'animation', label: 'Time Animation' }
  ];

  const metricOptions = [
    { value: 'ndvi', label: 'NDVI - Vegetation Health' },
    { value: 'savi', label: 'SAVI - Soil Adjusted' },
    { value: 'moisture', label: 'Soil Moisture' },
    { value: 'temperature', label: 'Surface Temperature' }
  ];

  const comparisonStats = {
    vegetation_change: '+12.3%',
    stress_areas: '-8.7%',
    healthy_zones: '+15.2%',
    critical_areas: '-3.1%'
  };

  const trendData = [
    { date: 'May 13', value: 0.65, status: 'good' },
    { date: 'Jun 13', value: 0.72, status: 'excellent' },
    { date: 'Jul 13', value: 0.68, status: 'good' },
    { date: 'Aug 13', value: 0.58, status: 'moderate' },
    { date: 'Sep 13', value: 0.71, status: 'good' }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Temporal Comparison Analysis
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Compare spectral data across different time periods
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select
              label="First Period"
              options={periodOptions}
              value={selectedPeriods?.period1}
              onChange={(value) => setSelectedPeriods(prev => ({ ...prev, period1: value }))}
            />
            
            <Select
              label="Second Period"
              options={periodOptions}
              value={selectedPeriods?.period2}
              onChange={(value) => setSelectedPeriods(prev => ({ ...prev, period2: value }))}
            />
            
            <Select
              label="Analysis Metric"
              options={metricOptions}
              value={analysisMetric}
              onChange={setAnalysisMetric}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Select
              label="Comparison Mode"
              options={comparisonModes}
              value={comparisonMode}
              onChange={setComparisonMode}
            />
            
            <div className="flex items-end">
              <Button
                variant="default"
                iconName="RefreshCw"
                iconPosition="left"
                className="w-full"
              >
                Update Comparison
              </Button>
            </div>
          </div>

          {/* Comparison View */}
          <div className="space-y-6">
            {/* Map Comparison */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-4">
                Visual Comparison - {comparisonMode?.replace('-', ' ')?.toUpperCase()}
              </h3>
              
              {comparisonMode === 'side-by-side' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground">
                      {periodOptions?.find(p => p?.value === selectedPeriods?.period1)?.label}
                    </h4>
                    <div 
                      className="aspect-video bg-cover bg-center rounded border border-border"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop')`,
                        filter: 'hue-rotate(30deg) saturate(1.2)'
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground">
                      {periodOptions?.find(p => p?.value === selectedPeriods?.period2)?.label}
                    </h4>
                    <div 
                      className="aspect-video bg-cover bg-center rounded border border-border"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop')`,
                        filter: 'hue-rotate(-20deg) saturate(0.8)'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">
                    {comparisonMode === 'difference' ? 'Change Detection Map' : 'Overlay Comparison'}
                  </h4>
                  <div 
                    className="aspect-video bg-cover bg-center rounded border border-border"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=450&fit=crop')`,
                      filter: comparisonMode === 'difference' ? 'contrast(1.3) saturate(1.5)' : 'brightness(1.1)'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(comparisonStats)?.map(([key, value]) => (
                <div key={key} className="bg-card border border-border rounded-lg p-4">
                  <div className="text-xs text-muted-foreground capitalize mb-1">
                    {key?.replace('_', ' ')}
                  </div>
                  <div className={`text-lg font-semibold ${
                    value?.startsWith('+') ? 'text-success' : 
                    value?.startsWith('-') ? 'text-error' : 'text-foreground'
                  }`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Chart */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-4">
                Temporal Trend Analysis
              </h3>
              <div className="space-y-3">
                {trendData?.map((point, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 text-xs text-muted-foreground">
                      {point?.date}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2 relative">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          point?.status === 'excellent' ? 'bg-success' :
                          point?.status === 'good' ? 'bg-primary' :
                          point?.status === 'moderate' ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${point?.value * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-xs font-medium text-foreground">
                      {point?.value?.toFixed(2)}
                    </div>
                    <div className={`w-16 text-xs capitalize ${
                      point?.status === 'excellent' ? 'text-success' :
                      point?.status === 'good' ? 'text-primary' :
                      point?.status === 'moderate' ? 'text-warning' : 'text-error'
                    }`}>
                      {point?.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
                Key Insights
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="TrendingUp" size={14} className="text-success mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Overall vegetation health has improved by 12.3% compared to last month
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="TrendingDown" size={14} className="text-success mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Stress areas have decreased by 8.7%, indicating effective management
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Northern section shows seasonal decline patterns typical for this period
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Recent irrigation improvements are showing positive results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Analysis generated on September 13, 2024 at 3:46 PM
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalComparison;