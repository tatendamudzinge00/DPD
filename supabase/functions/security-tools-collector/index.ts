import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Splunk Connector
async function fetchSplunk(tool: any) {
  try {
    const url = `${tool.endpoint_url}/services/search/jobs/export`;
    const query = tool.metadata?.query || "search index=security | stats count by threat_type";
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${tool.metadata?.username}:${tool.metadata?.password}`)}`
      },
      body: new URLSearchParams({
        search: query,
        output_mode: 'json'
      })
    });

    if (!response.ok) {
      throw new Error(`Splunk API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Insert data into splunk_data table
    for (const result of data.results || []) {
      await supabase.from('splunk_data').insert({
        tool_id: tool.id,
        query_used: query,
        threat_type: result.threat_type || 'unknown',
        count: parseInt(result.count) || 0,
        severity: result.severity || 'medium',
        sector: tool.sector,
        raw_data: result
      });
    }
    
    console.log(`Splunk: Processed ${data.results?.length || 0} records`);
  } catch (error) {
    console.error('Splunk fetch error:', error);
  }
}

// Qualys Connector
async function fetchQualys(tool: any) {
  try {
    const url = `${tool.endpoint_url}/api/2.0/fo/asset/host/`;
    
    const response = await fetch(url + '?' + new URLSearchParams({
      action: 'list',
      output_format: 'json'
    }), {
      headers: {
        'Authorization': `Basic ${btoa(`${tool.metadata?.username}:${tool.metadata?.password}`)}`
      }
    });

    if (!response.ok) {
      throw new Error(`Qualys API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Insert data into qualys_assets table
    for (const host of data.HOST_LIST?.HOST || []) {
      await supabase.from('qualys_assets').insert({
        tool_id: tool.id,
        host_ip: host.IP,
        hostname: host.DNS,
        asset_type: host.OS || 'unknown',
        vulnerabilities_count: parseInt(host.VULN_COUNT) || 0,
        severity_score: parseFloat(host.SEVERITY_SCORE) || 0,
        last_scanned: host.LAST_SCAN_DATETIME ? new Date(host.LAST_SCAN_DATETIME) : null,
        sector: tool.sector,
        raw_data: host
      });
    }
    
    console.log(`Qualys: Processed ${data.HOST_LIST?.HOST?.length || 0} assets`);
  } catch (error) {
    console.error('Qualys fetch error:', error);
  }
}

// MISP Connector
async function fetchMISP(tool: any) {
  try {
    const url = `${tool.endpoint_url}/events/restSearch`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tool.metadata?.api_key,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        limit: 10,
        page: 1
      })
    });

    if (!response.ok) {
      throw new Error(`MISP API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Insert data into misp_events table
    for (const event of data.response || []) {
      await supabase.from('misp_events').insert({
        tool_id: tool.id,
        event_id: event.Event?.id,
        event_title: event.Event?.info,
        threat_level: parseInt(event.Event?.threat_level_id) || 1,
        analysis_status: event.Event?.analysis,
        event_date: event.Event?.date ? new Date(event.Event.date) : null,
        attributes_count: event.Event?.Attribute?.length || 0,
        sector: tool.sector,
        raw_data: event
      });
    }
    
    console.log(`MISP: Processed ${data.response?.length || 0} events`);
  } catch (error) {
    console.error('MISP fetch error:', error);
  }
}

// Nessus Connector
async function fetchNessus(tool: any) {
  try {
    const url = `${tool.endpoint_url}/scans`;
    
    const response = await fetch(url, {
      headers: {
        'X-ApiKeys': `accessKey=${tool.metadata?.access_key}; secretKey=${tool.metadata?.secret_key}`
      }
    });

    if (!response.ok) {
      throw new Error(`Nessus API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Insert data into nessus_scans table
    for (const scan of data.scans || []) {
      await supabase.from('nessus_scans').insert({
        tool_id: tool.id,
        scan_id: scan.id.toString(),
        scan_name: scan.name,
        scan_status: scan.status,
        target_count: scan.targets?.split(',').length || 0,
        vulnerabilities_found: scan.hostcount || 0,
        critical_count: scan.critical || 0,
        high_count: scan.high || 0,
        medium_count: scan.medium || 0,
        low_count: scan.low || 0,
        scan_date: scan.last_modification_date ? new Date(scan.last_modification_date * 1000) : null,
        sector: tool.sector,
        raw_data: scan
      });
    }
    
    console.log(`Nessus: Processed ${data.scans?.length || 0} scans`);
  } catch (error) {
    console.error('Nessus fetch error:', error);
  }
}

// Nozomi Connector
async function fetchNozomi(tool: any) {
  try {
    const url = `${tool.endpoint_url}/api/v1/alerts`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${tool.metadata?.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Nozomi API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Insert data into nozomi_alerts table
    for (const alert of data.alerts || []) {
      await supabase.from('nozomi_alerts').insert({
        tool_id: tool.id,
        alert_id: alert.id,
        alert_type: alert.type,
        severity: alert.severity || 'medium',
        source_ip: alert.source_ip,
        destination_ip: alert.destination_ip,
        protocol: alert.protocol,
        description: alert.description,
        alert_time: alert.timestamp ? new Date(alert.timestamp) : null,
        sector: tool.sector,
        raw_data: alert
      });
    }
    
    console.log(`Nozomi: Processed ${data.alerts?.length || 0} alerts`);
  } catch (error) {
    console.error('Nozomi fetch error:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting security tools data collection...');

    // Fetch all active security tools
    const { data: tools, error } = await supabase
      .from('security_tools')
      .select('*')
      .eq('is_active', true);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`Found ${tools?.length || 0} active tools`);

    // Process each tool
    for (const tool of tools || []) {
      console.log(`Processing tool: ${tool.tool_name} (${tool.tool_type})`);
      
      try {
        switch (tool.tool_type) {
          case 'splunk':
            await fetchSplunk(tool);
            break;
          case 'qualys':
            await fetchQualys(tool);
            break;
          case 'misp':
            await fetchMISP(tool);
            break;
          case 'nessus':
            await fetchNessus(tool);
            break;
          case 'nozomi':
            await fetchNozomi(tool);
            break;
          default:
            console.log(`Unknown tool type: ${tool.tool_type}`);
        }

        // Update last sync time
        await supabase
          .from('security_tools')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', tool.id);

      } catch (toolError) {
        console.error(`Error processing tool ${tool.tool_name}:`, toolError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${tools?.length || 0} security tools`,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Security tools collector error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});