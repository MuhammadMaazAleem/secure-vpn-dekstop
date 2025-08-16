import React, { useEffect, useState } from 'react';
import { Shield, ShieldCheck, Wifi, Globe, Settings, Power } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';
import { formatTime, getConnectionStatusColor, getConnectionStatusText } from '../utils/formatters';
import ServerList from './ServerList';
import ConnectionButton from './ConnectionButton';
import StatsPanel from './StatsPanel';
import SettingsModal from './SettingsModal';

const VPNDashboard: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    isConnected,
    isConnecting,
    selectedServer,
    currentIP,
    connectionStats,
    settings,
    updateConnectionStats,
  } = useVPNStore();

  // Update connection stats every second when connected
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(updateConnectionStats, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, updateConnectionStats]);

  const connectionTime = isConnected && connectionStats.connectionTime > 0 
    ? Date.now() - connectionStats.connectionTime 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">SecureVPN</h1>
          </div>
          <button 
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Settings"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {isConnected ? (
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                  ) : (
                    <Shield className="w-8 h-8 text-gray-500" />
                  )}
                  <div>
                    <h2 className={`text-xl font-semibold ${getConnectionStatusColor(isConnected, isConnecting)}`}>
                      {getConnectionStatusText(isConnected, isConnecting)}
                    </h2>
                    {selectedServer && (
                      <p className="text-sm text-gray-400">
                        {selectedServer.flag} {selectedServer.name}, {selectedServer.country}
                      </p>
                    )}
                  </div>
                </div>
                <ConnectionButton />
              </div>

              {/* Connection Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">IP Address</span>
                  </div>
                  <p className="font-mono text-lg">{currentIP}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wifi className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Protocol</span>
                  </div>
                  <p className="text-lg">{settings.protocol}</p>
                </div>
              </div>

              {/* Connection Time */}
              {isConnected && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Power className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Connected Time</span>
                  </div>
                  <p className="text-lg font-mono">{formatTime(connectionTime)}</p>
                </div>
              )}
            </div>

            {/* Stats Panel */}
            <StatsPanel />
          </div>

          {/* Server List */}
          <div className="space-y-6">
            <ServerList />
          </div>
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default VPNDashboard;
