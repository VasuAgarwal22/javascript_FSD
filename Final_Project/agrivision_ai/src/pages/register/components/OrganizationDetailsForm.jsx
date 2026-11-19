import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrganizationDetailsForm = ({ formData, setFormData, errors }) => {
  const organizationTypes = [
    { value: 'family_farm', label: 'Family Farm' },
    { value: 'commercial_farm', label: 'Commercial Farm' },
    { value: 'cooperative', label: 'Agricultural Cooperative' },
    { value: 'university', label: 'University/Research Institution' },
    { value: 'consulting', label: 'Agricultural Consulting Firm' },
    { value: 'government', label: 'Government Agency' },
    { value: 'other', label: 'Other' }
  ];

  const farmSizes = [
    { value: 'small', label: 'Small (1-50 acres)' },
    { value: 'medium', label: 'Medium (51-500 acres)' },
    { value: 'large', label: 'Large (501-2000 acres)' },
    { value: 'enterprise', label: 'Enterprise (2000+ acres)' }
  ];

  const cropTypes = [
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'rice', label: 'Rice' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'specialty', label: 'Specialty Crops' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'mixed', label: 'Mixed Farming' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (3-10 years)' },
    { value: 'experienced', label: 'Experienced (11-25 years)' },
    { value: 'expert', label: 'Expert (25+ years)' }
  ];

  const states = [
    { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Organization Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Organization/Farm Name"
            type="text"
            placeholder="Enter organization name"
            value={formData?.organizationName}
            onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
            error={errors?.organizationName}
            required
          />
          
          <Select
            label="Organization Type"
            options={organizationTypes}
            value={formData?.organizationType}
            onChange={(value) => handleInputChange('organizationType', value)}
            placeholder="Select organization type"
            error={errors?.organizationType}
            required
          />
        </div>
      </div>
      <div>
        <h4 className="text-base font-medium text-foreground mb-3">Location Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          
          <Select
            label="State"
            options={states}
            value={formData?.state}
            onChange={(value) => handleInputChange('state', value)}
            placeholder="Select state"
            error={errors?.state}
            searchable
            required
          />
          
          <Input
            label="ZIP Code"
            type="text"
            placeholder="Enter ZIP code"
            value={formData?.zipCode}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>
      </div>
      <div>
        <h4 className="text-base font-medium text-foreground mb-3">Agricultural Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Farm/Operation Size"
            options={farmSizes}
            value={formData?.farmSize}
            onChange={(value) => handleInputChange('farmSize', value)}
            placeholder="Select farm size"
            error={errors?.farmSize}
          />
          
          <Select
            label="Primary Crop Types"
            options={cropTypes}
            value={formData?.cropTypes}
            onChange={(value) => handleInputChange('cropTypes', value)}
            placeholder="Select crop types"
            error={errors?.cropTypes}
            multiple
            searchable
          />
        </div>
      </div>
      <div>
        <Select
          label="Agricultural Experience Level"
          options={experienceLevels}
          value={formData?.experienceLevel}
          onChange={(value) => handleInputChange('experienceLevel', value)}
          placeholder="Select experience level"
          error={errors?.experienceLevel}
          description="This helps us customize your experience"
        />
      </div>
      <div>
        <Input
          label="Additional Information (Optional)"
          type="text"
          placeholder="Tell us more about your agricultural focus or specific needs"
          value={formData?.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e?.target?.value)}
          description="Help us better understand your requirements"
        />
      </div>
    </div>
  );
};

export default OrganizationDetailsForm;