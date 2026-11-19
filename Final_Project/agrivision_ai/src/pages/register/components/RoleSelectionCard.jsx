import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ role, isSelected, onSelect }) => {
  const roleConfig = {
    farmer: {
      icon: 'Tractor',
      title: 'Farmer',
      description: 'Commercial farming operations with crop monitoring and yield optimization',
      features: ['Real-time crop health monitoring', 'Pest and disease alerts', 'Yield predictions', 'Weather integration']
    },
    researcher: {
      icon: 'Microscope',
      title: 'Researcher',
      description: 'Academic and scientific research with advanced analytical tools',
      features: ['Advanced spectral analysis', 'Data export capabilities', 'Research collaboration', 'Custom algorithms']
    },
    agronomist: {
      icon: 'Users',
      title: 'Agronomist',
      description: 'Agricultural consulting with comprehensive reporting and client management',
      features: ['Client management tools', 'Professional reports', 'Consultation tracking', 'Multi-farm analysis']
    }
  };

  const config = roleConfig?.[role];

  return (
    <div
      onClick={() => onSelect(role)}
      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          <Icon name={config?.icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-2">{config?.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{config?.description}</p>
          <ul className="space-y-1">
            {config?.features?.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={14} className="mr-2 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionCard;