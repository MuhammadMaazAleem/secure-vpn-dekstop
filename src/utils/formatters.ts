export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatTime = (milliseconds: number): string => {
  if (milliseconds === 0) return '00:00:00';
  
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatPing = (ping: number): string => {
  return `${ping}ms`;
};

export const getConnectionStatusColor = (isConnected: boolean, isConnecting: boolean): string => {
  if (isConnecting) return 'text-yellow-500';
  if (isConnected) return 'text-green-500';
  return 'text-gray-500';
};

export const getConnectionStatusText = (isConnected: boolean, isConnecting: boolean): string => {
  if (isConnecting) return 'Connecting...';
  if (isConnected) return 'Connected';
  return 'Disconnected';
};

export const getLoadColor = (load: number): string => {
  if (load < 40) return 'text-green-500';
  if (load < 70) return 'text-yellow-500';
  return 'text-red-500';
};
