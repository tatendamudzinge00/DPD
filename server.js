
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Allow dashboard frontend to fetch logs
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (optional: write to file/db)
let logs = [];

// Generate some sample data for testing
const generateSampleLogs = () => {
  const categories = ['Malware', 'Phishing & Social Engineering', 'DDoS Attack', 'Unauthorized Access'];
  const sectors = ['Government', 'Banking', 'Health', 'Education', 'Telecoms'];
  const sources = ['CERT-ZW', 'RBZ Alert', 'NetOne SOC', 'Hospital SIEM', 'UZ IT Dept'];
  
  for (let i = 0; i < 10; i++) {
    logs.push({
      id: `log-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      level: ['info', 'warning', 'error', 'critical'][Math.floor(Math.random() * 4)],
      source: sources[Math.floor(Math.random() * sources.length)],
      message: `Security event detected in ${sectors[Math.floor(Math.random() * sectors.length)]} sector`,
      category: categories[Math.floor(Math.random() * categories.length)],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      metadata: {
        type: Math.random() > 0.5 ? 'threat' : 'incident',
        iocs: [`malicious-${Math.floor(Math.random() * 1000)}.com`, `192.168.1.${Math.floor(Math.random() * 255)}`]
      }
    });
  }
};

// Initialize with sample data
generateSampleLogs();

// Endpoint to receive logs from Filebeat (we'll send manually for now)
app.post('/api/logs', (req, res) => {
    const log = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...req.body
    };
    logs.push(log);
    console.log('Received log:', log);
    res.status(200).send({ 
      message: 'Log received',
      id: log.id
    });
});

// Endpoint dashboard can call to display logs
app.get('/api/logs', (req, res) => {
    // Sort by timestamp, most recent first
    const sortedLogs = logs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 100); // last 100 logs
    
    res.send(sortedLogs);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.send({
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime()
    });
});

// Get logs by category
app.get('/api/logs/category/:category', (req, res) => {
    const { category } = req.params;
    const filteredLogs = logs
      .filter(log => log.category === category)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);
    
    res.send(filteredLogs);
});

// Get logs by sector
app.get('/api/logs/sector/:sector', (req, res) => {
    const { sector } = req.params;
    const filteredLogs = logs
      .filter(log => log.sector === sector)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);
    
    res.send(filteredLogs);
});

// Delete a log (for testing)
app.delete('/api/logs/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = logs.length;
    logs = logs.filter(log => log.id !== id);
    
    if (logs.length < initialLength) {
        res.send({ message: 'Log deleted successfully' });
    } else {
        res.status(404).send({ message: 'Log not found' });
    }
});

// Clear all logs (for testing)
app.delete('/api/logs', (req, res) => {
    logs = [];
    res.send({ message: 'All logs cleared' });
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://10.50.13.217:${PORT}`);
    console.log(`Sample logs generated: ${logs.length}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/logs - Get all logs');
    console.log('  POST /api/logs - Create new log');
    console.log('  GET  /api/health - Health check');
    console.log('  GET  /api/logs/category/:category - Get logs by category');
    console.log('  GET  /api/logs/sector/:sector - Get logs by sector');
    console.log('  DELETE /api/logs/:id - Delete specific log');
    console.log('  DELETE /api/logs - Clear all logs');
});
