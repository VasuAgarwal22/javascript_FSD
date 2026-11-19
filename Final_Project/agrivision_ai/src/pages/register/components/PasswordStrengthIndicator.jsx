import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: '', color: '' };

    // Length check
    if (pwd?.length >= 8) score += 1;
    if (pwd?.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/?.test(pwd)) score += 1;
    if (/[A-Z]/?.test(pwd)) score += 1;
    if (/[0-9]/?.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/?.test(pwd)) score += 1;

    const strengthLevels = {
      0: { label: '', color: '', bgColor: '' },
      1: { label: 'Very Weak', color: 'text-red-600', bgColor: 'bg-red-200' },
      2: { label: 'Weak', color: 'text-red-500', bgColor: 'bg-red-200' },
      3: { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-200' },
      4: { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-200' },
      5: { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-200' },
      6: { label: 'Very Strong', color: 'text-green-700', bgColor: 'bg-green-300' }
    };

    return { score, ...strengthLevels?.[score] };
  };

  const strength = calculateStrength(password);

  if (!password || strength?.score === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${strength?.color}`}>
          Password Strength: {strength?.label}
        </span>
        <span className="text-xs text-muted-foreground">
          {strength?.score}/6
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strength?.bgColor}`}
          style={{ width: `${(strength?.score / 6) * 100}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        <div className="grid grid-cols-2 gap-2">
          <div className={password?.length >= 8 ? 'text-success' : ''}>
            ✓ At least 8 characters
          </div>
          <div className={/[A-Z]/?.test(password) ? 'text-success' : ''}>
            ✓ Uppercase letter
          </div>
          <div className={/[a-z]/?.test(password) ? 'text-success' : ''}>
            ✓ Lowercase letter
          </div>
          <div className={/[0-9]/?.test(password) ? 'text-success' : ''}>
            ✓ Number
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;