import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ImageUploadZone from './components/ImageUploadZone';
import ImageGrid from './components/ImageGrid';
import ImageSequenceAlignment from './components/ImageSequenceAlignment';
import PreprocessingPanel from './components/PreprocessingPanel';
import ProcessingOptionsPanel from './components/ProcessingOptionsPanel';
import ProcessingQueuePanel from './components/ProcessingQueuePanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ImageUploadAnalysis = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [processingJobs, setProcessingJobs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  // Mock data for uploaded images
  const mockImages = [
    {
      id: 'img-001',
      name: 'field_sector_A_20250913_143000.tiff',
      size: 45678912,
      dimensions: '2048x2048',
      bands: 12,
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop'
    },
    {
      id: 'img-002',
      name: 'field_sector_B_20250913_143500.tiff',
      size: 52341876,
      dimensions: '2048x2048',
      bands: 12,
      status: 'processing',
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop'
    },
    {
      id: 'img-003',
      name: 'field_sector_C_20250913_144000.tiff',
      size: 48765432,
      dimensions: '2048x2048',
      bands: 12,
      status: 'queued',
      thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop'
    },
    {
      id: 'img-004',
      name: 'field_sector_D_20250913_144500.tiff',
      size: 51234567,
      dimensions: '2048x2048',
      bands: 12,
      status: 'failed',
      thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop'
    }
  ];

  // Mock processing jobs
  const mockProcessingJobs = [
    {
      id: 'job-001',
      name: 'Vegetation Analysis - Sector A-D',
      analysisType: 'Comprehensive Analysis',
      imageCount: 4,
      status: 'processing',
      progress: 67,
      startTime: new Date(Date.now() - 8 * 60 * 1000),
      estimatedTimeRemaining: 5
    },
    {
      id: 'job-002',
      name: 'Disease Detection - Field Survey',
      analysisType: 'Disease Detection',
      imageCount: 8,
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 25 * 60 * 1000),
      completedTime: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: 'job-003',
      name: 'Soil Analysis - North Field',
      analysisType: 'Soil Analysis',
      imageCount: 6,
      status: 'failed',
      progress: 23,
      startTime: new Date(Date.now() - 15 * 60 * 1000),
      errorMessage: 'Insufficient spectral bands for soil analysis. Minimum 8 bands required.'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setUploadedImages(mockImages);
    setProcessingJobs(mockProcessingJobs);
  }, []);

  const handleFilesSelected = (files) => {
    const newImages = files?.map((file, index) => ({
      id: `img-${Date.now()}-${index}`,
      name: file?.name,
      size: file?.size,
      dimensions: '2048x2048', // Mock dimensions
      bands: 12, // Mock band count
      status: 'queued',
      thumbnail: URL.createObjectURL(file)
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev?.includes(imageId)) {
        return prev?.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleImageDelete = (imageId) => {
    setUploadedImages(prev => prev?.filter(img => img?.id !== imageId));
    setSelectedImages(prev => prev?.filter(id => id !== imageId));
  };

  const handleAlignmentChange = (alignmentData) => {
    console.log('Alignment completed:', alignmentData);
    // Handle alignment results
  };

  const handlePreprocessingChange = (settings) => {
    console.log('Preprocessing settings:', settings);
    // Apply preprocessing to selected images
  };

  const handleProcessingStart = (config) => {
    setIsProcessing(true);
    
    const newJob = {
      id: `job-${Date.now()}`,
      name: `${config?.analysisType} Analysis - ${new Date()?.toLocaleDateString()}`,
      analysisType: config?.analysisType,
      imageCount: config?.selectedImages?.length,
      status: 'processing',
      progress: 0,
      startTime: new Date(),
      estimatedTimeRemaining: config?.selectedImages?.length * 2
    };

    setProcessingJobs(prev => [newJob, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingJobs(prev => 
        prev?.map(job => 
          job?.id === newJob?.id 
            ? { ...job, status: 'completed', progress: 100, completedTime: new Date() }
            : job
        )
      );
    }, 5000);
  };

  const handleJobAction = (jobId, action) => {
    console.log(`Job ${jobId} action: ${action}`);
    
    switch (action) {
      case 'pause':
        setProcessingJobs(prev => 
          prev?.map(job => 
            job?.id === jobId ? { ...job, status: 'paused' } : job
          )
        );
        break;
      case 'resume':
        setProcessingJobs(prev => 
          prev?.map(job => 
            job?.id === jobId ? { ...job, status: 'processing' } : job
          )
        );
        break;
      case 'cancel': case'remove':
        setProcessingJobs(prev => prev?.filter(job => job?.id !== jobId));
        break;
      case 'retry':
        setProcessingJobs(prev => 
          prev?.map(job => 
            job?.id === jobId ? { ...job, status: 'processing', progress: 0 } : job
          )
        );
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload & Manage', icon: 'Upload' },
    { id: 'alignment', label: 'Sequence Alignment', icon: 'AlignHorizontalJustifyCenter' },
    { id: 'preprocessing', label: 'Preprocessing', icon: 'Sliders' },
    { id: 'processing', label: 'Processing Options', icon: 'Settings' },
    { id: 'queue', label: 'Processing Queue', icon: 'Clock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Microscope" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Image Upload Analysis</h1>
                <p className="text-muted-foreground">
                  Upload and analyze multispectral images for AI-powered crop health assessment
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Image" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Total Images</span>
                </div>
                <div className="text-2xl font-semibold text-foreground mt-1">
                  {uploadedImages?.length}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckSquare" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Selected</span>
                </div>
                <div className="text-2xl font-semibold text-foreground mt-1">
                  {selectedImages?.length}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-muted-foreground">Processing</span>
                </div>
                <div className="text-2xl font-semibold text-foreground mt-1">
                  {processingJobs?.filter(job => job?.status === 'processing')?.length}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
                <div className="text-2xl font-semibold text-foreground mt-1">
                  {processingJobs?.filter(job => job?.status === 'completed')?.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'upload' && (
              <>
                <ImageUploadZone 
                  onFilesSelected={handleFilesSelected}
                  isProcessing={isProcessing}
                />
                <ImageGrid
                  images={uploadedImages}
                  onImageSelect={handleImageSelect}
                  onImageDelete={handleImageDelete}
                  selectedImages={selectedImages}
                />
              </>
            )}

            {activeTab === 'alignment' && (
              <ImageSequenceAlignment
                images={uploadedImages}
                selectedImages={selectedImages}
                onAlignmentChange={handleAlignmentChange}
              />
            )}

            {activeTab === 'preprocessing' && (
              <PreprocessingPanel
                selectedImages={selectedImages}
                onPreprocessingChange={handlePreprocessingChange}
              />
            )}

            {activeTab === 'processing' && (
              <ProcessingOptionsPanel
                selectedImages={selectedImages}
                onProcessingStart={handleProcessingStart}
              />
            )}

            {activeTab === 'queue' && (
              <ProcessingQueuePanel
                processingJobs={processingJobs}
                onJobAction={handleJobAction}
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
            <Button
              variant="default"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
            
            {selectedImages?.length > 0 && (
              <Button
                variant="default"
                className="rounded-full shadow-lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => setActiveTab('processing')}
              >
                Process {selectedImages?.length} Images
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageUploadAnalysis;