import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueuePanel = ({ processingJobs, onJobAction }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'processing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'queued':
        return 'text-muted-foreground bg-muted border-border';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      case 'paused':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Loader2';
      case 'queued':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      case 'paused':
        return 'Pause';
      default:
        return 'Circle';
    }
  };

  const formatTimeRemaining = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getQueueStats = () => {
    const total = processingJobs?.length;
    const completed = processingJobs?.filter(job => job?.status === 'completed')?.length;
    const processing = processingJobs?.filter(job => job?.status === 'processing')?.length;
    const queued = processingJobs?.filter(job => job?.status === 'queued')?.length;
    const failed = processingJobs?.filter(job => job?.status === 'failed')?.length;

    return { total, completed, processing, queued, failed };
  };

  const stats = getQueueStats();

  if (processingJobs?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Clock" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Processing Jobs</h3>
        <p className="text-muted-foreground">
          Start processing images to see the queue status here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Processing Queue</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and manage your analysis jobs
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => {/* Handle refresh */}}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              onClick={() => {/* Handle settings */}}
            />
          </div>
        </div>

        {/* Queue Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{stats?.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">{stats?.processing}</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-muted-foreground">{stats?.queued}</div>
            <div className="text-xs text-muted-foreground">Queued</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">{stats?.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-error">{stats?.failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {processingJobs?.map((job) => (
            <div
              key={job?.id}
              className={`border rounded-lg p-4 ${getStatusColor(job?.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={getStatusIcon(job?.status)} 
                      size={16} 
                      className={job?.status === 'processing' ? 'animate-spin' : ''}
                    />
                    <h4 className="font-medium text-foreground truncate">
                      {job?.name}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-background/50 capitalize">
                      {job?.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Analysis: {job?.analysisType}</div>
                    <div>Images: {job?.imageCount}</div>
                    <div>Started: {formatTimestamp(job?.startTime)}</div>
                    {job?.status === 'processing' && (
                      <div>ETA: {formatTimeRemaining(job?.estimatedTimeRemaining)}</div>
                    )}
                    {job?.status === 'completed' && (
                      <div>Completed: {formatTimestamp(job?.completedTime)}</div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {(job?.status === 'processing' || job?.status === 'completed') && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{job?.progress}%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            job?.status === 'completed' ? 'bg-success' : 'bg-warning'
                          }`}
                          style={{ width: `${job?.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {job?.status === 'processing' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Pause"
                        onClick={() => onJobAction(job?.id, 'pause')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => onJobAction(job?.id, 'cancel')}
                      />
                    </>
                  )}
                  
                  {job?.status === 'paused' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Play"
                        onClick={() => onJobAction(job?.id, 'resume')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={() => onJobAction(job?.id, 'cancel')}
                      />
                    </>
                  )}
                  
                  {job?.status === 'completed' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        onClick={() => onJobAction(job?.id, 'download')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onJobAction(job?.id, 'view')}
                      />
                    </>
                  )}
                  
                  {job?.status === 'failed' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="RotateCcw"
                        onClick={() => onJobAction(job?.id, 'retry')}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Info"
                        onClick={() => onJobAction(job?.id, 'details')}
                      />
                    </>
                  )}
                  
                  {job?.status === 'queued' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => onJobAction(job?.id, 'remove')}
                    />
                  )}
                </div>
              </div>

              {/* Error Message */}
              {job?.status === 'failed' && job?.errorMessage && (
                <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded text-sm text-error">
                  <Icon name="AlertTriangle" size={14} className="inline mr-1" />
                  {job?.errorMessage}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Queue Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatTimestamp(currentTime)}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              onClick={() => {/* Handle clear completed */}}
            >
              Clear Completed
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="PauseCircle"
              onClick={() => {/* Handle pause all */}}
            >
              Pause All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingQueuePanel;