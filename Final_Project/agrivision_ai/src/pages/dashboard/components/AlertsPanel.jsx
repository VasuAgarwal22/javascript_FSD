import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all');

  const alerts = [
    {
      id: 'alert-1',
      type: 'disease',
      severity: 'critical',
      title: 'Late Blight Detected',
      description: 'Phytophthora infestans identified in North Field corn crops. Immediate fungicide treatment recommended.',
      zone: 'North Field',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'active',
      actionRequired: true
    },
    {
      id: 'alert-2',
      type: 'pest',
      severity: 'warning',
      title: 'Aphid Population Increase',
      description: 'Elevated aphid counts detected in South Field soybeans. Monitor population levels closely.',
      zone: 'South Field',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'monitoring',
      actionRequired: false
    },
    {
      id: 'alert-3',
      type: 'anomaly',
      severity: 'warning',
      title: 'Unusual Spectral Signature',
      description: 'Abnormal NDVI readings in East Field wheat. Possible nutrient deficiency or water stress.',
      zone: 'East Field',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'investigating',
      actionRequired: true
    },
    {
      id: 'alert-4',
      type: 'sensor',
      severity: 'info',
      title: 'Soil Moisture Low',
      description: 'Soil moisture levels below optimal range in West Field. Consider irrigation scheduling.',
      zone: 'West Field',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      status: 'acknowledged',
      actionRequired: false
    },
    {
      id: 'alert-5',
      type: 'weather',
      severity: 'warning',
      title: 'Heavy Rain Forecast',
      description: 'Precipitation expected in next 24 hours. Risk of fungal disease development increased.',
      zone: 'All Fields',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      status: 'active',
      actionRequired: true
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'disease':
        return 'Bug';
      case 'pest':
        return 'Shield';
      case 'anomaly':
        return 'AlertTriangle';
      case 'sensor':
        return 'Activity';
      case 'weather':
        return 'Cloud';
      default:
        return 'Bell';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'AlertCircle';
      case 'monitoring':
        return 'Eye';
      case 'investigating':
        return 'Search';
      case 'acknowledged':
        return 'Check';
      default:
        return 'Clock';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'critical') return alert?.severity === 'critical';
    if (filter === 'action') return alert?.actionRequired;
    return alert?.type === filter;
  });

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', count: alerts?.length },
            { key: 'critical', label: 'Critical', count: alerts?.filter(a => a?.severity === 'critical')?.length },
            { key: 'action', label: 'Action Required', count: alerts?.filter(a => a?.actionRequired)?.length },
            { key: 'disease', label: 'Disease', count: alerts?.filter(a => a?.type === 'disease')?.length }
          ]?.map(tab => (
            <button
              key={tab?.key}
              onClick={() => setFilter(tab?.key)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                filter === tab?.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab?.label}
              {tab?.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
            <p className="text-muted-foreground">No alerts matching current filter</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors duration-200 ${
                  selectedAlert?.id === alert?.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => setSelectedAlert(selectedAlert?.id === alert?.id ? null : alert)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert?.severity)}`}>
                    <Icon name={getTypeIcon(alert?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {alert?.title}
                      </h4>
                      <div className="flex items-center space-x-2 ml-2">
                        <Icon name={getStatusIcon(alert?.status)} size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(alert?.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {alert?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {alert?.zone}
                        </span>
                        {alert?.actionRequired && (
                          <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">
                            Action Required
                          </span>
                        )}
                      </div>
                      
                      {selectedAlert?.id === alert?.id && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {alert?.actionRequired && (
                            <Button variant="default" size="sm">
                              Take Action
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredAlerts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="outline" fullWidth>
            View All Alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;