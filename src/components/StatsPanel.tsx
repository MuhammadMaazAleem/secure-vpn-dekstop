import React from 'react';
import { Download, Upload, Activity } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';
import { formatBytes } from '../utils/formatters';

const StatsPanel: React.FC = () => {
  const { isConnected, connectionStats } = useVPNStore();

  if (!isConnected) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <span>Connection Statistics</span>
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-400">Connect to view statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <Activity className="w-5 h-5 text-blue-400" />
        <span>Connection Statistics</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Download className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Downloaded</span>
          </div>
          <p className="text-xl font-semibold text-green-400">
            {formatBytes(connectionStats.bytesReceived)}
          </p>
        </div>
        
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Uploaded</span>
          </div>
          <p className="text-xl font-semibold text-blue-400">
            {formatBytes(connectionStats.bytesSent)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Total Data Transfer</span>
          <span className="text-lg font-semibold">
            {formatBytes(connectionStats.bytesReceived + connectionStats.bytesSent)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
