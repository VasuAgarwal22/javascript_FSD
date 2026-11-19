import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'USDA Certified',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=center',
      description: 'United States Department of Agriculture'
    },
    {
      name: 'ISO 27001',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=center',
      description: 'Information Security Management'
    },
    {
      name: 'AgTech Certified',
      logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop&crop=center',
      description: 'Agricultural Technology Standards'
    }
  ];

  const partnerships = [
    {
      name: 'Cornell University',
      type: 'Research Partnership',
      icon: 'GraduationCap'
    },
    {
      name: 'Agricultural Extension',
      type: 'Extension Services',
      icon: 'Users'
    },
    {
      name: 'Farm Bureau',
      type: 'Industry Association',
      icon: 'Building'
    }
  ];

  const stats = [
    {
      value: '10,000+',
      label: 'Active Farmers',
      icon: 'Users'
    },
    {
      value: '50M+',
      label: 'Acres Monitored',
      icon: 'MapPin'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      icon: 'Activity'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
          Trusted & Certified
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden border border-border group-hover:border-primary/50 transition-colors duration-200">
                <Image
                  src={cert?.logo}
                  alt={cert?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs font-medium text-foreground">{cert?.name}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">
                {cert?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Partnerships */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
          Research Partnerships
        </h4>
        <div className="space-y-3">
          {partnerships?.map((partner, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={partner?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{partner?.name}</div>
                <div className="text-xs text-muted-foreground">{partner?.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
          Platform Statistics
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div className="text-lg font-bold text-primary">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;