import React from 'react';
import { Check, Wifi } from 'lucide-react';
import { useVPNStore, type VPNServer } from '../store/vpnStore';
import { formatPing, getLoadColor } from '../utils/formatters';

const ServerList: React.FC = () => {
  const { servers, selectedServer, selectServer, isConnected } = useVPNStore();

  const handleServerSelect = (server: VPNServer) => {
    if (!isConnected) {
      selectServer(server);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <Wifi className="w-5 h-5 text-blue-400" />
        <span>Server Locations</span>
      </h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {servers.map((server) => (
          <div
            key={server.id}
            onClick={() => handleServerSelect(server)}
            className={`
              flex items-center justify-between p-3 rounded-lg cursor-pointer
              transition-all duration-200 hover:bg-slate-700/50
              ${selectedServer?.id === server.id ? 'bg-blue-600/20 border border-blue-500/50' : 'bg-slate-700/30'}
              ${isConnected ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{server.flag}</span>
              <div>
                <p className="font-medium">{server.name}</p>
                <p className="text-sm text-gray-400">{server.country}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{formatPing(server.ping)}</p>
                <p className={`text-xs ${getLoadColor(server.load)}`}>
                  {server.load}% load
                </p>
              </div>
              
              {selectedServer?.id === server.id && (
                <Check className="w-5 h-5 text-blue-400" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          {servers.length} servers available • Auto-select fastest server
        </p>
      </div>
    </div>
  );
};

export default ServerList;
