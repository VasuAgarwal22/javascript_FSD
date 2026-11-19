import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'USDA Certified',
      icon: 'Shield',
      description: 'United States Department of Agriculture approved'
    },
    {
      name: 'ISO 27001',
      icon: 'Lock',
      description: 'Information security management certified'
    },
    {
      name: 'University Partners',
      icon: 'GraduationCap',
      description: 'Partnered with leading agricultural universities'
    },
    {
      name: 'Farm Bureau',
      icon: 'Users',
      description: 'American Farm Bureau Federation endorsed'
    }
  ];

  const partnerships = [
    'Cornell University Agricultural Research',
    'UC Davis Department of Plant Sciences',
    'Iowa State University Extension',
    'Texas A&M AgriLife Research'
  ];

  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <h3 className="font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Award" size={20} className="mr-2 text-primary" />
        Trusted by Agricultural Professionals
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {certifications?.map((cert, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={cert?.icon} size={20} className="text-primary" />
            </div>
            <div className="text-xs font-medium text-foreground">{cert?.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{cert?.description}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Research Partnerships</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {partnerships?.map((partner, index) => (
            <div key={index} className="flex items-center text-xs text-muted-foreground">
              <Icon name="Check" size={12} className="mr-2 text-success" />
              {partner}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            50,000+ Active Users
          </div>
          <div className="flex items-center">
            <Icon name="MapPin" size={14} className="mr-1" />
            Available in 48 States
          </div>
          <div className="flex items-center">
            <Icon name="Leaf" size={14} className="mr-1" />
            2M+ Acres Monitored
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;