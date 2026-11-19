import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RoleSelector from './components/RoleSelector';
import TrustSignals from './components/TrustSignals';
import LoginHeader from './components/LoginHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for different roles
  const mockCredentials = {
    farmer: { email: 'farmer@agrivision.com', password: 'farmer123' },
    researcher: { email: 'researcher@agrivision.com', password: 'research123' },
    agronomist: { email: 'agronomist@agrivision.com', password: 'agro123' }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const validCredentials = mockCredentials[selectedRole];
      
      if (formData.email === validCredentials.email && formData.password === validCredentials.password) {
        // Store user session data
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('rememberMe', formData.rememberMe.toString());
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(`Invalid credentials. Use ${validCredentials.email} with password ${validCredentials.password} for ${selectedRole} role.`);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError(''); // Clear any existing errors when role changes
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <LoginHeader />

            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 space-y-8">
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Select your role</span>
                </div>
              </div>

              <RoleSelector
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
              />

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    onClick={() => navigate('/register')}
                    className="p-0 h-auto font-medium"
                  >
                    Create Account
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Trust Signals (Desktop Only) */}
        <div className="hidden lg:flex lg:w-96 bg-card border-l border-border">
          <div className="flex flex-col justify-center px-8 py-12 w-full">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Trusted by Agricultural Professionals
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of farmers, researchers, and agronomists using AI-powered insights for better crop management.
                </p>
              </div>

              <TrustSignals />

              {/* Security Notice */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-foreground">Secure & Compliant</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                  <li>• End-to-end encryption</li>
                  <li>• GDPR & CCPA compliant</li>
                  <li>• SOC 2 Type II certified</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Trust Signals */}
      <div className="lg:hidden bg-card border-t border-border px-6 py-8">
        <TrustSignals />
      </div>
    </div>
  );
};

export default Login;