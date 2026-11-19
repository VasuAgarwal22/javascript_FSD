import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(3);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      description: 'Overview and monitoring hub'
    },
    {
      label: 'Analysis',
      path: '/image-upload-analysis',
      icon: 'Microscope',
      description: 'Image and spectral analysis tools',
      submenu: [
        { label: 'Image Upload Analysis', path: '/image-upload-analysis' },
        { label: 'Spectral Analysis Maps', path: '/spectral-analysis-maps' }
      ]
    },
    {
      label: 'Sensors',
      path: '/sensor-data-dashboard',
      icon: 'Activity',
      description: 'Real-time sensor monitoring'
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/dashboard';
    }
    if (path === '/image-upload-analysis') {
      return location?.pathname === '/image-upload-analysis' || location?.pathname === '/spectral-analysis-maps';
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <img 
                    src="/assets/images/WhatsApp_Image_2025-09-13_at_00.17.46_f5c25650-1757779471552.jpg" 
                    alt="KRISHI SETU Logo" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="font-heading font-semibold text-xl text-foreground">
                  KRISHI SETU
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <div key={item?.path} className="relative group">
                  <a
                    href={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </a>
                  
                  {item?.submenu && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item?.submenu?.map((subItem) => (
                          <a
                            key={subItem?.path}
                            href={subItem?.path}
                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                          >
                            {subItem?.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Alert Status & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Alert Status Indicator */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => {/* Handle alert click */}}
                >
                  <Icon name="Bell" size={20} />
                  {alertCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {alertCount > 9 ? '9+' : alertCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-modal animate-slide-in">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <a
                    href={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <div>{item?.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item?.description}
                      </div>
                    </div>
                  </a>
                  
                  {item?.submenu && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item?.submenu?.map((subItem) => (
                        <a
                          key={subItem?.path}
                          href={subItem?.path}
                          onClick={closeMobileMenu}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                        >
                          {subItem?.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;