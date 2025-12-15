/**
 * Threat Intelligence Engine
 * TypeScript implementation mirroring Python threat intelligence platform
 */

// Enums
export enum ThreatSeverity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

export enum DataSourceType {
  SIEM = "SIEM",
  EDR = "EDR",
  CLOUD_LOGS = "Cloud Logs",
  NETWORK = "Network Logs",
  ENDPOINT = "Endpoint Logs",
  EMAIL = "Email Security",
  SPLUNK = "Splunk",
  QUALYS = "Qualys",
  MISP = "MISP",
  NESSUS = "Nessus",
  NOZOMI = "Nozomi"
}

// Interfaces
export interface SecurityAlert {
  id: string;
  timestamp: string;
  source: string;
  threat_type: string;
  severity: string;
  confidence: number;
  affected_assets: string[];
  description: string;
  recommended_action: string;
  raw_data: Record<string, unknown>;
  correlation_id?: string;
  risk_score?: number;
}

export interface DataSchema {
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  user_id: string;
  asset_id: string;
  event_type: string;
  severity: string;
  description: string;
  raw_log: Record<string, unknown>;
}

export interface InvestigationCase {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assigned_to: string;
  created_time: string;
  alerts: string[];
  notes: string[];
  tags: string[];
}

export interface ThreatMetrics {
  total_alerts: number;
  critical_alerts: number;
  high_alerts: number;
  medium_alerts: number;
  low_alerts: number;
  correlated_attacks: number;
  mttd_hours: number;
  mttr_hours: number;
  alerts_by_source: Record<string, number>;
  riskiest_assets: Array<{ asset: string; risk_score: number }>;
}

export interface ComplianceStatus {
  framework: string;
  status: string;
  score: number;
  last_assessment: string;
}

// Helper functions
function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function generatePrivateIP(): string {
  return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function generateOTIP(): string {
  return `10.0.${Math.floor(Math.random() * 20) + 10}.${Math.floor(Math.random() * 255)}`;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMD5(): string {
  const chars = '0123456789abcdef';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function generateSHA256(): string {
  const chars = '0123456789abcdef';
  return Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Data Generators (mimicking Python classes)
export class SplunkDataGenerator {
  generateAlerts(count: number = 5): Record<string, unknown>[] {
    const alerts: Record<string, unknown>[] = [];
    const eventTypes = ['security_event', 'authentication', 'network_traffic', 'malware_detection', 'data_exfiltration'];
    const severities = ['low', 'medium', 'high', 'critical'];
    
    for (let i = 0; i < count; i++) {
      alerts.push({
        _raw: `Security event detected at ${new Date().toISOString()}`,
        _time: new Date().toISOString(),
        source: 'Splunk',
        event_type: randomChoice(eventTypes),
        severity: randomChoice(severities),
        user: `user-${randomInt(1, 100)}`,
        src_ip: generatePrivateIP(),
        dest_ip: generateRandomIP(),
        host: `host-${randomInt(1, 100)}`,
        message: randomChoice([
          'Multiple failed login attempts detected',
          'Unusual network activity from internal host',
          'Potential data exfiltration attempt',
          'Suspicious process execution detected',
          'Privilege escalation attempt blocked'
        ]),
        count: randomInt(1, 50)
      });
    }
    return alerts;
  }
}

export class QualysDataGenerator {
  generateVulnerabilities(count: number = 5): Record<string, unknown>[] {
    const vulnerabilities: Record<string, unknown>[] = [];
    const titles = [
      'SSL/TLS Configuration Weakness',
      'Open Port Detected',
      'Missing Security Patch',
      'Weak SSH Configuration',
      'Cross-Site Scripting Vulnerability',
      'SQL Injection Vulnerability',
      'Outdated Software Version',
      'Default Credentials Detected'
    ];
    
    for (let i = 0; i < count; i++) {
      vulnerabilities.push({
        qid: `QID-${randomInt(10000, 99999)}`,
        title: randomChoice(titles),
        severity: randomInt(1, 5),
        host: `host-${randomInt(1, 100)}`,
        host_ip: generatePrivateIP(),
        hostname: `server-${randomInt(1, 50)}.company.local`,
        port: randomChoice([22, 80, 443, 3389, 8080]),
        protocol: randomChoice(['TCP', 'UDP']),
        cvss_base: parseFloat((Math.random() * 7 + 3).toFixed(1)),
        last_detected: new Date().toISOString(),
        status: 'ACTIVE',
        asset_type: randomChoice(['Server', 'Workstation', 'Network Device', 'Cloud Instance']),
        vulnerabilities_count: randomInt(1, 25),
        severity_score: randomInt(30, 100)
      });
    }
    return vulnerabilities;
  }
  
  generateAssets(count: number = 10): Record<string, unknown>[] {
    return this.generateVulnerabilities(count);
  }
}

export class MISPDataGenerator {
  generateThreatIndicators(count: number = 8): Record<string, unknown>[] {
    const indicators: Record<string, unknown>[] = [];
    const indicatorTypes = ['ip-dst', 'domain', 'url', 'md5', 'sha256'];
    const categories = ['Network activity', 'Payload delivery', 'Artifacts dropped', 'Command and Control'];
    const campaigns = ['OperationXYZ', 'NightDragon', 'APT1', 'Lazarus', 'Cozy Bear'];
    
    for (let i = 0; i < count; i++) {
      const type = randomChoice(indicatorTypes);
      let value: string;
      
      switch (type) {
        case 'ip-dst':
          value = generateRandomIP();
          break;
        case 'domain':
          value = `${randomChoice(['malware', 'phishing', 'command', 'evil'])}-${randomInt(1, 999)}.com`;
          break;
        case 'url':
          value = `http://${randomChoice(['malware', 'phishing'])}-${randomInt(1, 999)}.com/${randomChoice(['download', 'payload', 'login'])}`;
          break;
        case 'md5':
          value = generateMD5();
          break;
        case 'sha256':
          value = generateSHA256();
          break;
        default:
          value = 'unknown';
      }
      
      indicators.push({
        event_id: `EVT-${randomInt(1000, 9999)}`,
        event_title: randomChoice([
          'Ransomware Campaign Targeting Financial Sector',
          'APT Group Activity Detected',
          'Phishing Campaign Infrastructure',
          'Malware Distribution Network',
          'Command and Control Server Identified'
        ]),
        type,
        value,
        category: randomChoice(categories),
        to_ids: Math.random() > 0.5,
        comment: `Threat indicator from ${randomChoice(['APT', 'Malware', 'Phishing', 'Ransomware'])} campaign`,
        timestamp: new Date().toISOString(),
        event_date: new Date().toISOString(),
        threat_level: randomInt(1, 4),
        analysis_status: randomChoice(['initial', 'ongoing', 'completed']),
        attributes_count: randomInt(5, 50),
        tags: [
          randomChoice(['TLP:AMBER', 'TLP:GREEN', 'TLP:RED', 'OSINT']),
          `Campaign:${randomChoice(campaigns)}`
        ]
      });
    }
    return indicators;
  }
}

export class NessusDataGenerator {
  generateScans(count: number = 5): Record<string, unknown>[] {
    const scans: Record<string, unknown>[] = [];
    
    for (let i = 0; i < count; i++) {
      const critical = randomInt(0, 10);
      const high = randomInt(5, 20);
      const medium = randomInt(10, 40);
      const low = randomInt(20, 60);
      
      scans.push({
        scan_id: `SCAN-${randomInt(1000, 9999)}`,
        scan_name: randomChoice([
          'Weekly Infrastructure Scan',
          'Critical Systems Assessment',
          'DMZ Security Scan',
          'Cloud Environment Audit',
          'Compliance Verification Scan'
        ]),
        scan_status: randomChoice(['completed', 'running', 'paused', 'scheduled']),
        scan_date: new Date().toISOString(),
        creation_date: new Date(Date.now() - randomInt(1, 30) * 24 * 60 * 60 * 1000).toISOString(),
        target_count: randomInt(10, 200),
        vulnerabilities_found: critical + high + medium + low,
        critical_count: critical,
        high_count: high,
        medium_count: medium,
        low_count: low
      });
    }
    return scans;
  }
  
  generateScanResults(count: number = 10): Record<string, unknown>[] {
    const results: Record<string, unknown>[] = [];
    const severityMap = { 0: 'Info', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
    const plugins = [
      'SSL/TLS Configuration',
      'Open Port Detection',
      'Outdated Software',
      'Weak Encryption',
      'Default Credentials',
      'Missing Security Headers',
      'Insecure File Permissions'
    ];
    
    for (let i = 0; i < count; i++) {
      const severity = randomInt(0, 4);
      results.push({
        plugin_id: randomInt(10000, 99999),
        plugin_name: randomChoice(plugins),
        severity,
        severity_label: severityMap[severity as keyof typeof severityMap],
        host: `host-${randomInt(1, 100)}`,
        port: randomChoice([22, 80, 443, 3389, randomInt(1000, 9999)]),
        protocol: randomChoice(['TCP', 'UDP']),
        description: 'Vulnerability detected during automated scan',
        solution: 'Apply security patch or update configuration',
        cvss_base_score: severity > 0 ? parseFloat((Math.random() * 10).toFixed(1)) : 0
      });
    }
    return results;
  }
}

export class NozomiDataGenerator {
  generateOTAssets(count: number = 20): Record<string, unknown>[] {
    const assets: Record<string, unknown>[] = [];
    const assetTypes = ['PLC', 'HMI', 'RTU', 'SCADA', 'IED', 'Historian', 'Engineering Workstation'];
    const vendors = ['Siemens', 'Rockwell', 'Schneider', 'GE', 'ABB', 'Honeywell'];
    
    for (let i = 0; i < count; i++) {
      assets.push({
        id: `ot-${i + 1}`,
        name: `${randomChoice(assetTypes)}-${i + 1}`,
        ip_address: generateOTIP(),
        mac_address: `00:${randomInt(10, 99)}:${randomInt(10, 99)}:${randomInt(10, 99)}:${randomInt(10, 99)}:${randomInt(10, 99)}`,
        type: randomChoice(assetTypes),
        vendor: randomChoice(vendors),
        model: `Model-${randomInt(100, 999)}`,
        criticality: randomChoice(['Low', 'Medium', 'High', 'Critical']),
        last_seen: new Date().toISOString(),
        security_risk: randomChoice(['Low', 'Medium', 'High', 'Critical'])
      });
    }
    return assets;
  }
  
  generateOTAlerts(count: number = 5): Record<string, unknown>[] {
    const alerts: Record<string, unknown>[] = [];
    const alertTypes = [
      'Unauthorized Device',
      'Protocol Anomaly',
      'Configuration Change',
      'Network Misuse',
      'Vulnerability Detected',
      'Policy Violation',
      'Unauthorized Access Attempt'
    ];
    
    for (let i = 0; i < count; i++) {
      const alertType = randomChoice(alertTypes);
      alerts.push({
        alert_id: `OT-${randomInt(10000, 99999)}`,
        timestamp: new Date().toISOString(),
        alert_time: new Date().toISOString(),
        alert_type: alertType,
        severity: randomChoice(['Low', 'Medium', 'High', 'Critical']),
        asset_id: `ot-${randomInt(1, 20)}`,
        description: `${alertType} detected on OT network segment`,
        source_ip: generateOTIP(),
        destination_ip: generateOTIP(),
        protocol: randomChoice(['Modbus', 'DNP3', 'OPC-UA', 'S7comm', 'Ethernet/IP']),
        status: 'Open',
        recommendation: 'Investigate and apply appropriate controls'
      });
    }
    return alerts;
  }
}

// Main Threat Intelligence Platform
export class ThreatIntelligencePlatform {
  private splunk: SplunkDataGenerator;
  private qualys: QualysDataGenerator;
  private misp: MISPDataGenerator;
  private nessus: NessusDataGenerator;
  private nozomi: NozomiDataGenerator;
  
  private alerts: SecurityAlert[] = [];
  private correlatedAlerts: Map<string, SecurityAlert[]> = new Map();
  
  constructor() {
    this.splunk = new SplunkDataGenerator();
    this.qualys = new QualysDataGenerator();
    this.misp = new MISPDataGenerator();
    this.nessus = new NessusDataGenerator();
    this.nozomi = new NozomiDataGenerator();
  }
  
  processSecurityTools(): void {
    // Generate and process Splunk alerts
    const splunkAlerts = this.splunk.generateAlerts(randomInt(3, 8));
    splunkAlerts.forEach(alert => {
      const securityAlert = this.convertToAlert(alert, DataSourceType.SPLUNK);
      if (securityAlert) this.alerts.push(securityAlert);
    });
    
    // Generate and process Qualys vulnerabilities
    const qualysData = this.qualys.generateVulnerabilities(randomInt(5, 15));
    qualysData.filter(v => (v.severity as number) >= 4).forEach(vuln => {
      const securityAlert = this.convertToAlert(vuln, DataSourceType.QUALYS);
      if (securityAlert) this.alerts.push(securityAlert);
    });
    
    // Generate and process MISP indicators
    const mispIndicators = this.misp.generateThreatIndicators(randomInt(4, 10));
    mispIndicators.filter(i => (i.threat_level as number) <= 2).forEach(indicator => {
      const securityAlert = this.convertToAlert(indicator, DataSourceType.MISP);
      if (securityAlert) this.alerts.push(securityAlert);
    });
    
    // Generate and process Nessus results
    const nessusScans = this.nessus.generateScanResults(randomInt(8, 15));
    nessusScans.filter(r => (r.severity as number) >= 2).forEach(result => {
      const securityAlert = this.convertToAlert(result, DataSourceType.NESSUS);
      if (securityAlert) this.alerts.push(securityAlert);
    });
    
    // Generate and process Nozomi OT alerts
    const nozomiAlerts = this.nozomi.generateOTAlerts(randomInt(2, 6));
    nozomiAlerts.filter(a => ['High', 'Critical'].includes(a.severity as string)).forEach(alert => {
      const securityAlert = this.convertToAlert(alert, DataSourceType.NOZOMI);
      if (securityAlert) this.alerts.push(securityAlert);
    });
    
    // Perform correlation
    this.correlateAlerts();
  }
  
  private convertToAlert(data: Record<string, unknown>, source: DataSourceType): SecurityAlert | null {
    const threatMappings: Record<string, Record<string, [string, string]>> = {
      [DataSourceType.SPLUNK]: {
        'security_event': ['Security Event Detected', 'Medium'],
        'authentication': ['Authentication Alert', 'Medium'],
        'network_traffic': ['Network Anomaly', 'High'],
        'malware_detection': ['Malware Detected', 'Critical'],
        'data_exfiltration': ['Data Exfiltration Attempt', 'Critical']
      },
      [DataSourceType.QUALYS]: {
        'vulnerability': ['Critical Vulnerability', 'High']
      },
      [DataSourceType.MISP]: {
        'threat_indicator': ['Threat Intelligence Match', 'Critical']
      },
      [DataSourceType.NESSUS]: {
        'vulnerability': ['Vulnerability Detected', 'Medium']
      },
      [DataSourceType.NOZOMI]: {
        'ot_alert': ['OT Security Alert', 'High']
      }
    };
    
    let threatInfo: [string, string] = ['Security Event', 'Medium'];
    const eventType = (data.event_type as string || data.alert_type as string || 'unknown').toLowerCase();
    
    if (threatMappings[source]) {
      for (const [key, value] of Object.entries(threatMappings[source])) {
        if (eventType.includes(key)) {
          threatInfo = value;
          break;
        }
      }
    }
    
    // Source-specific severity adjustments
    if (source === DataSourceType.QUALYS && (data.severity as number) >= 4) {
      threatInfo = ['Critical Vulnerability', 'Critical'];
    }
    if (source === DataSourceType.MISP) {
      threatInfo = ['Threat Intelligence Match', 'Critical'];
    }
    if (source === DataSourceType.NOZOMI && data.severity === 'Critical') {
      threatInfo = ['Critical OT Security Alert', 'Critical'];
    }
    
    const riskScore = this.calculateRiskScore(data, source, threatInfo[1]);
    
    return {
      id: crypto.randomUUID(),
      timestamp: (data.timestamp as string) || (data._time as string) || new Date().toISOString(),
      source: source,
      threat_type: threatInfo[0],
      severity: threatInfo[1],
      confidence: this.calculateConfidence(source, threatInfo[1]),
      affected_assets: [
        (data.user as string) || (data.asset_id as string) || 'Unknown',
        (data.host as string) || (data.hostname as string) || 'Unknown',
        (data.src_ip as string) || (data.source_ip as string) || '0.0.0.0'
      ].filter(Boolean),
      description: (data.message as string) || (data.description as string) || `${threatInfo[0]} detected from ${source}`,
      recommended_action: this.getRecommendation(threatInfo[0], source),
      raw_data: data,
      risk_score: riskScore
    };
  }
  
  private calculateConfidence(source: DataSourceType, severity: string): number {
    const baseConfidence: Record<string, number> = {
      [DataSourceType.MISP]: 95,
      [DataSourceType.QUALYS]: 90,
      [DataSourceType.NESSUS]: 85,
      [DataSourceType.NOZOMI]: 85,
      [DataSourceType.SPLUNK]: 80,
      [DataSourceType.SIEM]: 75,
      [DataSourceType.EDR]: 85
    };
    
    let confidence = baseConfidence[source] || 75;
    
    if (severity === 'Critical') confidence = Math.min(99, confidence + 5);
    if (severity === 'High') confidence = Math.min(99, confidence + 3);
    
    return confidence;
  }
  
  private calculateRiskScore(data: Record<string, unknown>, source: DataSourceType, severity: string): number {
    const severityScores: Record<string, number> = {
      'Critical': 90,
      'High': 70,
      'Medium': 50,
      'Low': 25
    };
    
    let baseScore = severityScores[severity] || 50;
    
    // Source-specific adjustments
    if (source === DataSourceType.MISP) baseScore += 10;
    if (source === DataSourceType.NOZOMI) baseScore += 5; // OT alerts are more critical
    if ((data.cvss_base as number) > 8) baseScore += 10;
    
    return Math.min(100, baseScore + randomInt(-5, 10));
  }
  
  private getRecommendation(threatType: string, source: DataSourceType): string {
    const recommendations: Record<string, string> = {
      'Security Event Detected': 'Review event details and assess potential impact',
      'Authentication Alert': 'Verify user identity and review access patterns',
      'Network Anomaly': 'Investigate source and destination, check for lateral movement',
      'Malware Detected': 'Quarantine affected system and run full malware scan',
      'Data Exfiltration Attempt': 'Block connection immediately and investigate scope',
      'Critical Vulnerability': 'Apply security patch immediately or implement compensating controls',
      'Threat Intelligence Match': 'Block indicator, hunt for related IoCs, and investigate affected systems',
      'Vulnerability Detected': 'Schedule remediation based on CVSS score and asset criticality',
      'OT Security Alert': 'Coordinate with OT team, investigate without disrupting operations',
      'Critical OT Security Alert': 'Immediate investigation required, potential OT network isolation'
    };
    
    return recommendations[threatType] || 'Investigate and document findings';
  }
  
  private correlateAlerts(): void {
    // Group alerts by IP address for correlation
    const ipGroups = new Map<string, SecurityAlert[]>();
    
    this.alerts.forEach(alert => {
      alert.affected_assets.forEach(asset => {
        if (asset.match(/\d+\.\d+\.\d+\.\d+/)) {
          if (!ipGroups.has(asset)) {
            ipGroups.set(asset, []);
          }
          ipGroups.get(asset)?.push(alert);
        }
      });
    });
    
    // Create correlation IDs for related alerts
    let correlationCount = 0;
    ipGroups.forEach((alerts, ip) => {
      if (alerts.length >= 2) {
        correlationCount++;
        const correlationId = `CORR-${Date.now()}-${correlationCount}`;
        alerts.forEach(alert => {
          alert.correlation_id = correlationId;
        });
        this.correlatedAlerts.set(correlationId, alerts);
      }
    });
  }
  
  getDashboardData(): {
    alerts: SecurityAlert[];
    metrics: ThreatMetrics;
    compliance: ComplianceStatus[];
    recentAlerts: SecurityAlert[];
  } {
    // Calculate metrics
    const alertsBySeverity = {
      critical: this.alerts.filter(a => a.severity === 'Critical').length,
      high: this.alerts.filter(a => a.severity === 'High').length,
      medium: this.alerts.filter(a => a.severity === 'Medium').length,
      low: this.alerts.filter(a => a.severity === 'Low').length
    };
    
    const alertsBySource: Record<string, number> = {};
    this.alerts.forEach(alert => {
      alertsBySource[alert.source] = (alertsBySource[alert.source] || 0) + 1;
    });
    
    // Calculate riskiest assets
    const assetRisks = new Map<string, number>();
    this.alerts.forEach(alert => {
      alert.affected_assets.forEach(asset => {
        const currentRisk = assetRisks.get(asset) || 0;
        assetRisks.set(asset, currentRisk + (alert.risk_score || 50));
      });
    });
    
    const riskiestAssets = Array.from(assetRisks.entries())
      .map(([asset, risk]) => ({ asset, risk_score: risk }))
      .sort((a, b) => b.risk_score - a.risk_score)
      .slice(0, 10);
    
    const metrics: ThreatMetrics = {
      total_alerts: this.alerts.length,
      critical_alerts: alertsBySeverity.critical,
      high_alerts: alertsBySeverity.high,
      medium_alerts: alertsBySeverity.medium,
      low_alerts: alertsBySeverity.low,
      correlated_attacks: this.correlatedAlerts.size,
      mttd_hours: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
      mttr_hours: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      alerts_by_source: alertsBySource,
      riskiest_assets: riskiestAssets
    };
    
    const compliance: ComplianceStatus[] = [
      { framework: 'GDPR', status: 'Compliant', score: randomInt(85, 98), last_assessment: new Date().toISOString() },
      { framework: 'ISO 27001', status: 'Compliant', score: randomInt(80, 95), last_assessment: new Date().toISOString() },
      { framework: 'NIST CSF', status: 'Partial', score: randomInt(70, 88), last_assessment: new Date().toISOString() },
      { framework: 'SOC 2', status: 'Compliant', score: randomInt(82, 96), last_assessment: new Date().toISOString() },
      { framework: 'PCI DSS', status: 'Compliant', score: randomInt(88, 99), last_assessment: new Date().toISOString() }
    ];
    
    return {
      alerts: this.alerts,
      metrics,
      compliance,
      recentAlerts: this.alerts.slice(-20).reverse()
    };
  }
  
  // Data generators for individual components
  getSplunkData() { return this.splunk.generateAlerts(randomInt(5, 15)); }
  getQualysData() { return this.qualys.generateAssets(randomInt(10, 25)); }
  getMISPData() { return this.misp.generateThreatIndicators(randomInt(8, 20)); }
  getNessusData() { return this.nessus.generateScans(randomInt(3, 8)); }
  getNozomiData() { return this.nozomi.generateOTAlerts(randomInt(3, 10)); }
  getNozomiAssets() { return this.nozomi.generateOTAssets(randomInt(15, 30)); }
  
  clearAlerts(): void {
    this.alerts = [];
    this.correlatedAlerts.clear();
  }
}

// Singleton instance
export const threatIntelligencePlatform = new ThreatIntelligencePlatform();
