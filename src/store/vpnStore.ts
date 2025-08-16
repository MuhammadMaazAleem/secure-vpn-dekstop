import { create } from 'zustand';

export interface VPNServer {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

export interface ConnectionStats {
  bytesReceived: number;
  bytesSent: number;
  connectionTime: number;
}

export interface VPNSettings {
  autoConnect: boolean;
  killSwitch: boolean;
  protocol: 'OpenVPN' | 'WireGuard';
  connectOnStartup: boolean;
}

interface VPNState {
  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: VPNServer | null;
  servers: VPNServer[];
  currentIP: string;
  originalIP: string;
  connectionStats: ConnectionStats;
  settings: VPNSettings;
  
  // Actions
  connect: (server: VPNServer) => Promise<void>;
  disconnect: () => Promise<void>;
  selectServer: (server: VPNServer) => void;
  updateSettings: (settings: Partial<VPNSettings>) => void;
  fetchServers: () => Promise<void>;
  updateConnectionStats: () => void;
}

// Mock data for demonstration
const mockServers: VPNServer[] = [
  { id: '1', name: 'New York', country: 'United States', flag: '🇺🇸', ping: 25, load: 45 },
  { id: '2', name: 'London', country: 'United Kingdom', flag: '🇬🇧', ping: 35, load: 60 },
  { id: '3', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 120, load: 30 },
  { id: '4', name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', ping: 40, load: 55 },
  { id: '5', name: 'Sydney', country: 'Australia', flag: '🇦🇺', ping: 180, load: 40 },
  { id: '6', name: 'Toronto', country: 'Canada', flag: '🇨🇦', ping: 50, load: 35 },
];

export const useVPNStore = create<VPNState>((set, get) => ({
  isConnected: false,
  isConnecting: false,
  selectedServer: null,
  servers: mockServers,
  currentIP: '192.168.1.100', // Mock local IP
  originalIP: '192.168.1.100',
  connectionStats: {
    bytesReceived: 0,
    bytesSent: 0,
    connectionTime: 0,
  },
  settings: {
    autoConnect: false,
    killSwitch: true,
    protocol: 'WireGuard',
    connectOnStartup: false,
  },

  connect: async (server: VPNServer) => {
    set({ isConnecting: true, selectedServer: server });
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    set({ 
      isConnected: true, 
      isConnecting: false,
      currentIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      connectionStats: { bytesReceived: 0, bytesSent: 0, connectionTime: Date.now() }
    });
  },

  disconnect: async () => {
    set({ isConnecting: true });
    
    // Simulate disconnection process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ 
      isConnected: false, 
      isConnecting: false,
      currentIP: get().originalIP,
      selectedServer: null,
      connectionStats: { bytesReceived: 0, bytesSent: 0, connectionTime: 0 }
    });
  },

  selectServer: (server: VPNServer) => {
    set({ selectedServer: server });
  },

  updateSettings: (newSettings: Partial<VPNSettings>) => {
    set(state => ({ 
      settings: { ...state.settings, ...newSettings } 
    }));
  },

  fetchServers: async () => {
    // In a real app, this would fetch from an API
    set({ servers: mockServers });
  },

  updateConnectionStats: () => {
    const state = get();
    if (state.isConnected && state.connectionStats.connectionTime > 0) {
      const now = Date.now();
      const timeDiff = now - state.connectionStats.connectionTime;
      
      set(prevState => ({
        connectionStats: {
          ...prevState.connectionStats,
          bytesReceived: prevState.connectionStats.bytesReceived + Math.random() * 1024 * 100,
          bytesSent: prevState.connectionStats.bytesSent + Math.random() * 1024 * 50,
        }
      }));
    }
  },
}));
