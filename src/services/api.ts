
// API service for connecting to the backend server
const API_BASE_URL = 'http://10.50.13.217:8080';

export interface LogEntry {
  id?: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  category?: string;
  subcategory?: string;
  sector?: string;
  metadata?: Record<string, any>;
}

export interface IncidentData {
  id?: string;
  title: string;
  description: string;
  sector: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  subcategory: string;
  affectedAssets: string;
  reportedBy: string;
  status?: 'investigating' | 'contained' | 'resolved' | 'monitoring';
  createdAt?: string;
}

export interface ThreatData {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  target: string;
  description: string;
  source: string;
  timestamp: string;
  iocs: string[];
}

class ApiService {
  private async fetchWithError(url: string, options?: RequestInit) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Log management
  async getLogs(): Promise<LogEntry[]> {
    return this.fetchWithError(`${API_BASE_URL}/api/logs`);
  }

  async sendLog(log: LogEntry): Promise<{ message: string }> {
    return this.fetchWithError(`${API_BASE_URL}/api/logs`, {
      method: 'POST',
      body: JSON.stringify(log),
    });
  }

  // Incident management (extending the existing logs endpoint)
  async createIncident(incident: IncidentData): Promise<{ message: string; id: string }> {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: incident.severity === 'critical' ? 'critical' : 
             incident.severity === 'high' ? 'error' : 'warning',
      source: 'Data Protection Dashboard',
      message: `New incident created: ${incident.title}`,
      category: incident.category,
      subcategory: incident.subcategory,
      sector: incident.sector,
      metadata: {
        type: 'incident',
        ...incident
      }
    };

    return this.fetchWithError(`${API_BASE_URL}/api/logs`, {
      method: 'POST',
      body: JSON.stringify(logEntry),
    });
  }

  // Threat intelligence
  async getThreatIntelligence(): Promise<ThreatData[]> {
    const logs = await this.getLogs();
    return logs
      .filter(log => log.metadata?.type === 'threat')
      .map(log => ({
        id: log.id || Math.random().toString(36),
        type: log.category || 'Unknown',
        severity: log.level === 'critical' ? 'critical' : 
                 log.level === 'error' ? 'high' : 
                 log.level === 'warning' ? 'medium' : 'low',
        target: log.sector || 'Unknown',
        description: log.message,
        source: log.source,
        timestamp: log.timestamp,
        iocs: log.metadata?.iocs || []
      }));
  }

  async sendThreatIntelligence(threat: ThreatData): Promise<{ message: string }> {
    const logEntry: LogEntry = {
      timestamp: threat.timestamp,
      level: threat.severity === 'critical' ? 'critical' : 
             threat.severity === 'high' ? 'error' : 'warning',
      source: threat.source,
      message: threat.description,
      category: threat.type,
      sector: threat.target,
      metadata: {
        type: 'threat',
        iocs: threat.iocs,
        ...threat
      }
    };

    return this.sendLog(logEntry);
  }

  // System health monitoring
  async getSystemHealth(): Promise<{
    status: 'operational' | 'maintenance' | 'outage';
    uptime: number;
    responseTime: number;
    lastCheck: string;
  }> {
    try {
      const startTime = Date.now();
      await this.fetchWithError(`${API_BASE_URL}/api/logs`);
      const responseTime = Date.now() - startTime;
      
      return {
        status: 'operational',
        uptime: 99.9,
        responseTime,
        lastCheck: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'outage',
        uptime: 0,
        responseTime: 0,
        lastCheck: new Date().toISOString()
      };
    }
  }
}

export const apiService = new ApiService();
