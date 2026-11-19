import React from 'react';
import Icon from '../../../components/AppIcon';


const LoginHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <img 
            src="/assets/images/WhatsApp_Image_2025-09-13_at_00.17.46_f5c25650-1757779471552.jpg" 
            alt="KRISHI SETU Logo" 
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to KRISHI SETU
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered agricultural monitoring for smarter farming decisions
        </p>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Camera" size={16} color="var(--color-primary)" />
          <span>Spectral Imaging</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Activity" size={16} color="var(--color-primary)" />
          <span>Real-time Monitoring</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
          <span>Predictive Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;