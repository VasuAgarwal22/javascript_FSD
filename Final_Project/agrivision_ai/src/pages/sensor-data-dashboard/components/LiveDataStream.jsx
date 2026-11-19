import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveDataStream = ({ isStreaming, onToggleStream }) => {
  const [streamData, setStreamData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        const newData = {
          id: Date.now(),
          timestamp: new Date()?.toLocaleTimeString(),
          sensor: `Sensor ${Math.floor(Math.random() * 10) + 1}`,
          type: ['Soil Moisture', 'Temperature', 'Humidity', 'Leaf Wetness']?.[Math.floor(Math.random() * 4)],
          value: (Math.random() * 100)?.toFixed(1),
          unit: ['%', '°C', '%', '%']?.[Math.floor(Math.random() * 4)],
          status: ['normal', 'warning', 'critical']?.[Math.floor(Math.random() * 3)]
        };
        
        setStreamData(prev => [newData, ...prev?.slice(0, 19)]);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Live Data Stream</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
            <span className={`text-sm font-medium ${getConnectionStatusColor(connectionStatus)}`}>
              {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {streamData?.length} readings
          </span>
          <button
            onClick={onToggleStream}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              isStreaming 
                ? 'bg-error text-error-foreground hover:bg-error/90' 
                : 'bg-success text-success-foreground hover:bg-success/90'
            }`}
          >
            <Icon name={isStreaming ? 'Square' : 'Play'} size={14} />
            <span>{isStreaming ? 'Stop' : 'Start'}</span>
          </button>
        </div>
      </div>
      <div className="h-80 overflow-y-auto space-y-2">
        {streamData?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Icon name="Radio" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No live data</p>
              <p className="text-sm">Start streaming to see real-time sensor data</p>
            </div>
          </div>
        ) : (
          streamData?.map((data, index) => (
            <div 
              key={data?.id} 
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                index === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className={getStatusColor(data?.status)} />
                  <span className="font-medium text-foreground">{data?.sensor}</span>
                </div>
                <span className="text-sm text-muted-foreground">{data?.type}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {data?.value} {data?.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data?.timestamp}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  data?.status === 'normal' ? 'bg-success' :
                  data?.status === 'warning' ? 'bg-warning' : 'bg-error'
                }`}></div>
              </div>
            </div>
          ))
        )}
      </div>
      {isStreaming && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Streaming active - Updates every 2 seconds</span>
          <span>Data retention: Last 20 readings</span>
        </div>
      )}
    </div>
  );
};

export default LiveDataStream;