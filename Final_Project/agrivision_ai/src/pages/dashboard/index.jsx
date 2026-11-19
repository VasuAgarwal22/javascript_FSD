import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SummaryCard from './components/SummaryCard';
import FarmMap from './components/FarmMap';
import AlertsPanel from './components/AlertsPanel';
import SensorWidget from './components/SensorWidget';
import QuickActions from './components/QuickActions';
import TrendChart from './components/TrendChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    condition: 'Partly Cloudy'
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock summary data
  const summaryData = [
    {
      title: 'Overall Crop Health',
      value: '87',
      unit: '%',
      icon: 'Leaf',
      status: 'good',
      trend: 'up',
      trendValue: '+3.2%'
    },
    {
      title: 'Active Alerts',
      value: '5',
      unit: '',
      icon: 'AlertTriangle',
      status: 'warning',
      trend: 'up',
      trendValue: '+2'
    },
    {
      title: 'Sensor Readings',
      value: '24',
      unit: 'active',
      icon: 'Activity',
      status: 'excellent',
      trend: 'stable',
      trendValue: '0'
    },
    {
      title: 'Weather Score',
      value: '72',
      unit: '%',
      icon: 'Cloud',
      status: 'good',
      trend: 'down',
      trendValue: '-1.5%'
    }
  ];

  // Mock sensor data
  const sensorData = [
    {
      title: 'Soil Moisture',
      value: '45.2',
      unit: '%',
      icon: 'Droplets',
      status: 'optimal',
      trend: 'stable',
      min: 30,
      max: 70,
      lastUpdate: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      title: 'Temperature',
      value: '24.1',
      unit: '°C',
      icon: 'Thermometer',
      status: 'good',
      trend: 'up',
      min: 18,
      max: 32,
      lastUpdate: new Date(Date.now() - 180000) // 3 minutes ago
    },
    {
      title: 'Humidity',
      value: '68.5',
      unit: '%',
      icon: 'CloudRain',
      status: 'optimal',
      trend: 'down',
      min: 40,
      max: 80,
      lastUpdate: new Date(Date.now() - 240000) // 4 minutes ago
    },
    {
      title: 'Leaf Wetness',
      value: '12.3',
      unit: '%',
      icon: 'Zap',
      status: 'warning',
      trend: 'up',
      min: 0,
      max: 30,
      lastUpdate: new Date(Date.now() - 420000) // 7 minutes ago
    },
    {
      title: 'Light Intensity',
      value: '850',
      unit: 'μmol/m²/s',
      icon: 'Sun',
      status: 'good',
      trend: 'stable',
      min: 200,
      max: 1200,
      lastUpdate: new Date(Date.now() - 120000) // 2 minutes ago
    },
    {
      title: 'Wind Speed',
      value: '12.4',
      unit: 'km/h',
      icon: 'Wind',
      status: 'optimal',
      trend: 'down',
      min: 0,
      max: 25,
      lastUpdate: new Date(Date.now() - 360000) // 6 minutes ago
    }
  ];

  const handleSummaryCardClick = (title) => {
    console.log(`Clicked on ${title} card`);
    // Navigate to relevant detailed view
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AgriVision AI Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your farm overview for {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Current Time</div>
                <div className="text-lg font-semibold text-foreground">
                  {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Weather</div>
                <div className="flex items-center space-x-2">
                  <Icon name="Cloud" size={16} className="text-primary" />
                  <span className="text-lg font-semibold text-foreground">
                    {weatherData?.temperature}°C
                  </span>
                </div>
              </div>
              
              <Button variant="outline">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData?.map((card, index) => (
              <SummaryCard
                key={index}
                title={card?.title}
                value={card?.value}
                unit={card?.unit}
                icon={card?.icon}
                status={card?.status}
                trend={card?.trend}
                trendValue={card?.trendValue}
                onClick={() => handleSummaryCardClick(card?.title)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Farm Map - Takes 2 columns */}
            <div className="lg:col-span-2">
              <FarmMap />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Alerts and Sensors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Alerts Panel - Takes 2 columns */}
            <div className="lg:col-span-2">
              <AlertsPanel />
            </div>
            
            {/* Sensor Widgets */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Live Sensors</h3>
              <div className="grid grid-cols-1 gap-4">
                {sensorData?.slice(0, 4)?.map((sensor, index) => (
                  <SensorWidget
                    key={index}
                    title={sensor?.title}
                    value={sensor?.value}
                    unit={sensor?.unit}
                    icon={sensor?.icon}
                    status={sensor?.status}
                    trend={sensor?.trend}
                    min={sensor?.min}
                    max={sensor?.max}
                    lastUpdate={sensor?.lastUpdate}
                  />
                ))}
              </div>
              
              <Button variant="outline" fullWidth className="mt-4">
                <Icon name="BarChart3" size={16} className="mr-2" />
                View All Sensors
              </Button>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="mb-8">
            <TrendChart />
          </div>

          {/* Additional Sensor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensorData?.slice(4)?.map((sensor, index) => (
              <SensorWidget
                key={index + 4}
                title={sensor?.title}
                value={sensor?.value}
                unit={sensor?.unit}
                icon={sensor?.icon}
                status={sensor?.status}
                trend={sensor?.trend}
                min={sensor?.min}
                max={sensor?.max}
                lastUpdate={sensor?.lastUpdate}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;