import React from 'react';
import { Power, Loader2 } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';

const ConnectionButton: React.FC = () => {
  const { isConnected, isConnecting, selectedServer, connect, disconnect } = useVPNStore();

  const handleClick = async () => {
    if (isConnecting) return;
    
    if (isConnected) {
      await disconnect();
    } else if (selectedServer) {
      await connect(selectedServer);
    }
  };

  const getButtonColor = () => {
    if (isConnecting) return 'bg-yellow-600 hover:bg-yellow-700';
    if (isConnected) return 'bg-red-600 hover:bg-red-700';
    return 'bg-green-600 hover:bg-green-700';
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'Disconnect';
    return 'Connect';
  };

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting || (!isConnected && !selectedServer)}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold
        transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getButtonColor()}
      `}
    >
      {isConnecting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Power className="w-5 h-5" />
      )}
      <span>{getButtonText()}</span>
    </button>
  );
};

export default ConnectionButton;
