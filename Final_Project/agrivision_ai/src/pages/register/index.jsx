import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import RoleSelectionCard from './components/RoleSelectionCard';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import TrustSignals from './components/TrustSignals';
import OrganizationDetailsForm from './components/OrganizationDetailsForm';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Role Selection
    selectedRole: '',
    
    // Organization Details
    organizationName: '',
    organizationType: '',
    city: '',
    state: '',
    zipCode: '',
    farmSize: '',
    cropTypes: [],
    experienceLevel: '',
    additionalInfo: '',
    
    // Agreements
    acceptTerms: false,
    acceptPrivacy: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});

  // Mock email availability check
  const checkEmailAvailability = async (email) => {
    if (!email || !email?.includes('@')) return;
    
    setCheckingEmail(true);
    
    // Simulate API call
    setTimeout(() => {
      const unavailableEmails = ['admin@example.com', 'test@test.com', 'user@demo.com'];
      setEmailAvailable(!unavailableEmails?.includes(email?.toLowerCase()));
      setCheckingEmail(false);
    }, 1000);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData?.email) {
        checkEmailAvailability(formData?.email);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData?.email]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (emailAvailable === false) {
        newErrors.email = 'This email is already registered';
      }
      if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData?.selectedRole) newErrors.selectedRole = 'Please select a role';
    }

    if (step === 3) {
      if (!formData?.organizationName?.trim()) newErrors.organizationName = 'Organization name is required';
      if (!formData?.organizationType) newErrors.organizationType = 'Organization type is required';
      if (!formData?.city?.trim()) newErrors.city = 'City is required';
      if (!formData?.state) newErrors.state = 'State is required';
      if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (step === 4) {
      if (!formData?.acceptTerms) newErrors.acceptTerms = 'You must accept the terms of service';
      if (!formData?.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(4)) return;

    setIsLoading(true);

    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      // Redirect to login or dashboard
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please check your email to verify your account.',
          email: formData?.email 
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Basic details and account security' },
    { number: 2, title: 'Role Selection', description: 'Choose your professional role' },
    { number: 3, title: 'Organization Details', description: 'Farm or institution information' },
    { number: 4, title: 'Terms & Confirmation', description: 'Review and accept terms' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={24} color="white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Join AgriVision AI
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account to start monitoring and optimizing your agricultural operations
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps?.map((step, index) => (
                <div key={step?.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step?.number
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border text-muted-foreground'
                  }`}>
                    {currentStep > step?.number ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{step?.number}</span>
                    )}
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-full h-0.5 mx-4 ${
                      currentStep > step?.number ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">
                {steps?.[currentStep - 1]?.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {steps?.[currentStep - 1]?.description}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData?.firstName}
                      onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                      error={errors?.firstName}
                      required
                    />
                    
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData?.lastName}
                      onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                      error={errors?.lastName}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData?.email}
                        onChange={(e) => handleInputChange('email', e?.target?.value)}
                        error={errors?.email}
                        required
                      />
                      {checkingEmail && (
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <Icon name="Loader2" size={14} className="animate-spin mr-2" />
                          Checking availability...
                        </div>
                      )}
                      {emailAvailable === true && (
                        <div className="flex items-center mt-2 text-sm text-success">
                          <Icon name="Check" size={14} className="mr-2" />
                          Email is available
                        </div>
                      )}
                    </div>
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData?.phone}
                      onChange={(e) => handleInputChange('phone', e?.target?.value)}
                      error={errors?.phone}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData?.password}
                        onChange={(e) => handleInputChange('password', e?.target?.value)}
                        error={errors?.password}
                        required
                      />
                      <PasswordStrengthIndicator password={formData?.password} />
                    </div>
                    
                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData?.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                      error={errors?.confirmPassword}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Role Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Select Your Professional Role
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Choose the role that best describes your agricultural work. This will customize your experience and available features.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {['farmer', 'researcher', 'agronomist']?.map((role) => (
                      <RoleSelectionCard
                        key={role}
                        role={role}
                        isSelected={formData?.selectedRole === role}
                        onSelect={(selectedRole) => handleInputChange('selectedRole', selectedRole)}
                      />
                    ))}
                  </div>
                  
                  {errors?.selectedRole && (
                    <div className="text-error text-sm mt-2">{errors?.selectedRole}</div>
                  )}
                </div>
              )}

              {/* Step 3: Organization Details */}
              {currentStep === 3 && (
                <OrganizationDetailsForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                />
              )}

              {/* Step 4: Terms & Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Terms and Agreements
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Please review and accept our terms to complete your registration.
                    </p>
                  </div>

                  <TrustSignals />

                  <div className="space-y-4">
                    <Checkbox
                      label="I agree to the Terms of Service"
                      description="By checking this box, you agree to our terms and conditions for using AgriVision AI platform."
                      checked={formData?.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
                      error={errors?.acceptTerms}
                      required
                    />

                    <Checkbox
                      label="I accept the Privacy Policy"
                      description="We are committed to protecting your privacy and agricultural data security."
                      checked={formData?.acceptPrivacy}
                      onChange={(e) => handleInputChange('acceptPrivacy', e?.target?.checked)}
                      error={errors?.acceptPrivacy}
                      required
                    />

                    <Checkbox
                      label="Subscribe to agricultural insights newsletter (Optional)"
                      description="Receive weekly updates on agricultural technology, research findings, and platform features."
                      checked={formData?.subscribeNewsletter}
                      onChange={(e) => handleInputChange('subscribeNewsletter', e?.target?.checked)}
                    />
                  </div>

                  {/* Registration Summary */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border">
                    <h4 className="font-medium text-foreground mb-3">Registration Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <span className="ml-2 text-foreground">{formData?.firstName} {formData?.lastName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2 text-foreground">{formData?.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Role:</span>
                        <span className="ml-2 text-foreground capitalize">{formData?.selectedRole}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Organization:</span>
                        <span className="ml-2 text-foreground">{formData?.organizationName}</span>
                      </div>
                    </div>
                  </div>

                  {errors?.submit && (
                    <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                      <div className="flex items-center text-error">
                        <Icon name="AlertCircle" size={16} className="mr-2" />
                        {errors?.submit}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps?.length}
                  </div>
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      loading={isLoading}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Create Account
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;