import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 'upload-image',
      title: 'Upload Images',
      description: 'Analyze new crop images',
      icon: 'Upload',
      color: 'bg-primary text-primary-foreground',
      href: '/image-upload-analysis'
    },
    {
      id: 'view-sensors',
      title: 'Sensor Data',
      description: 'Monitor IoT sensors',
      icon: 'Activity',
      color: 'bg-secondary text-secondary-foreground',
      href: '/sensor-data-dashboard'
    },
    {
      id: 'spectral-maps',
      title: 'Spectral Maps',
      description: 'View health overlays',
      icon: 'Map',
      color: 'bg-accent text-accent-foreground',
      href: '/spectral-analysis-maps'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create PDF summary',
      icon: 'FileText',
      color: 'bg-success text-success-foreground',
      href: '#'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.href === '#') {
      // Handle report generation
      console.log('Generating report...');
    } else {
      window.location.href = action?.href;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200"
            onClick={() => handleActionClick(action)}
          >
            <div className={`p-3 rounded-lg ${action?.color}`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">{action?.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {action?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last sync:</span>
          <span className="text-foreground font-medium">
            {new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">System status:</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-success font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;