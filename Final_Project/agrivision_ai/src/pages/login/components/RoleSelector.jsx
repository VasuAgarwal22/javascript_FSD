import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  const roles = [
    {
      id: 'farmer',
      label: 'Farmer',
      description: 'Commercial farming operations and crop management',
      icon: 'Wheat',
      color: 'text-green-600'
    },
    {
      id: 'researcher',
      label: 'Researcher',
      description: 'Agricultural research and data analysis',
      icon: 'Microscope',
      color: 'text-blue-600'
    },
    {
      id: 'agronomist',
      label: 'Agronomist',
      description: 'Agricultural consulting and advisory services',
      icon: 'Users',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Your Role</h3>
        <p className="text-sm text-muted-foreground">
          Choose your role to access personalized features and dashboard
        </p>
      </div>
      <div className="grid gap-3">
        {roles?.map((role) => (
          <label
            key={role?.id}
            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50 ${
              selectedRole === role?.id
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <input
              type="radio"
              name="role"
              value={role?.id}
              checked={selectedRole === role?.id}
              onChange={(e) => onRoleChange(e?.target?.value)}
              className="sr-only"
            />
            
            <div className="flex items-center space-x-4 flex-1">
              <div className={`p-2 rounded-lg bg-muted ${role?.color}`}>
                <Icon name={role?.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-foreground">{role?.label}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {role?.description}
                </div>
              </div>
            </div>

            {selectedRole === role?.id && (
              <div className="text-primary">
                <Icon name="CheckCircle" size={20} />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;