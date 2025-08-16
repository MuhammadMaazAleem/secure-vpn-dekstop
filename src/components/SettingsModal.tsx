import React from 'react';
import { X, Wifi, Shield, Power, Zap } from 'lucide-react';
import { useVPNStore } from '../store/vpnStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useVPNStore();

  if (!isOpen) return null;

  const handleToggle = (setting: keyof typeof settings) => {
    updateSettings({ [setting]: !settings[setting] });
  };

  const handleProtocolChange = (protocol: 'OpenVPN' | 'WireGuard') => {
    updateSettings({ protocol });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Protocol Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-blue-400" />
              <span>VPN Protocol</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleProtocolChange('WireGuard')}
                className={`p-3 rounded-lg text-left transition-colors ${
                  settings.protocol === 'WireGuard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">WireGuard</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Fast & Modern</p>
              </button>
              <button
                onClick={() => handleProtocolChange('OpenVPN')}
                className={`p-3 rounded-lg text-left transition-colors ${
                  settings.protocol === 'OpenVPN'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">OpenVPN</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Reliable & Secure</p>
              </button>
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Power className="w-4 h-4 text-green-400" />
                <div>
                  <p className="font-medium">Auto-connect on startup</p>
                  <p className="text-xs text-gray-400">Connect automatically when app starts</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.connectOnStartup}
                  onChange={() => handleToggle('connectOnStartup')}
                  className="sr-only peer"
                  aria-label="Auto-connect on startup"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-red-400" />
                <div>
                  <p className="font-medium">Kill Switch</p>
                  <p className="text-xs text-gray-400">Block internet if VPN disconnects</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Kill Switch toggle">
                <input
                  type="checkbox"
                  checked={settings.killSwitch}
                  onChange={() => handleToggle('killSwitch')}
                  className="sr-only peer"
                  aria-label="Kill Switch"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wifi className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="font-medium">Auto-connect</p>
                  <p className="text-xs text-gray-400">Connect to best server automatically</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Auto-connect toggle">
                <input
                  type="checkbox"
                  checked={settings.autoConnect}
                  onChange={() => handleToggle('autoConnect')}
                  className="sr-only peer"
                  aria-label="Auto-connect"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
