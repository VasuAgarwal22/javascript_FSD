import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AlertPanel = ({ alerts, onConfigureAlert, onDismissAlert }) => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    sensorType: '',
    threshold: '',
    condition: 'above',
    notification: 'email'
  });

  const sensorTypeOptions = [
    { value: 'soil-moisture', label: 'Soil Moisture' },
    { value: 'temperature', label: 'Temperature' },
    { value: 'humidity', label: 'Humidity' },
    { value: 'leaf-wetness', label: 'Leaf Wetness' }
  ];

  const conditionOptions = [
    { value: 'above', label: 'Above' },
    { value: 'below', label: 'Below' },
    { value: 'equals', label: 'Equals' }
  ];

  const notificationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'all', label: 'All Methods' }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return { name: 'AlertTriangle', color: 'text-error' };
      case 'warning': return { name: 'AlertCircle', color: 'text-warning' };
      case 'info': return { name: 'Info', color: 'text-primary' };
      default: return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const handleConfigureAlert = () => {
    onConfigureAlert?.(alertConfig);
    setIsConfiguring(false);
    setAlertConfig({
      sensorType: '',
      threshold: '',
      condition: 'above',
      notification: 'email'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Alert Management</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={() => setIsConfiguring(!isConfiguring)}
        >
          Configure
        </Button>
      </div>
      {isConfiguring && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-3">Create New Alert</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Sensor Type"
              options={sensorTypeOptions}
              value={alertConfig?.sensorType}
              onChange={(value) => setAlertConfig(prev => ({ ...prev, sensorType: value }))}
            />
            <div className="flex space-x-2">
              <Select
                label="Condition"
                options={conditionOptions}
                value={alertConfig?.condition}
                onChange={(value) => setAlertConfig(prev => ({ ...prev, condition: value }))}
                className="flex-1"
              />
              <Input
                label="Threshold"
                type="number"
                placeholder="Value"
                value={alertConfig?.threshold}
                onChange={(e) => setAlertConfig(prev => ({ ...prev, threshold: e?.target?.value }))}
                className="flex-1"
              />
            </div>
            <Select
              label="Notification Method"
              options={notificationOptions}
              value={alertConfig?.notification}
              onChange={(value) => setAlertConfig(prev => ({ ...prev, notification: value }))}
            />
            <div className="flex items-end space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleConfigureAlert}
                disabled={!alertConfig?.sensorType || !alertConfig?.threshold}
              >
                Create Alert
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConfiguring(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Bell" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm">Configure alerts to monitor sensor thresholds</p>
          </div>
        ) : (
          alerts?.map((alert) => {
            const alertIcon = getAlertIcon(alert?.type);
            return (
              <div key={alert?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className={`flex-shrink-0 ${alertIcon?.color}`}>
                  <Icon name={alertIcon?.name} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{alert?.title}</h4>
                    <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert?.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs bg-background px-2 py-1 rounded text-foreground">
                      {alert?.sensor}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Value: {alert?.value}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDismissAlert?.(alert?.id)}
                  className="flex-shrink-0"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertPanel;