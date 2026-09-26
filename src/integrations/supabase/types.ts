export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      access_control: {
        Row: {
          created_at: string
          expiry_date: string | null
          granted_by: string | null
          granted_date: string
          id: string
          is_active: boolean | null
          last_review: string | null
          metadata: Json | null
          permission: string
          resource: string
          sector: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          granted_by?: string | null
          granted_date?: string
          id?: string
          is_active?: boolean | null
          last_review?: string | null
          metadata?: Json | null
          permission: string
          resource: string
          sector: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          granted_by?: string | null
          granted_date?: string
          id?: string
          is_active?: boolean | null
          last_review?: string | null
          metadata?: Json | null
          permission?: string
          resource?: string
          sector?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      assets_inventory: {
        Row: {
          asset_name: string
          asset_type: string
          created_at: string
          criticality: string
          id: string
          ip_address: string | null
          is_cloud: boolean | null
          last_scanned: string | null
          location: string
          mac_address: string | null
          metadata: Json | null
          owner: string
          sector: string
          updated_at: string
        }
        Insert: {
          asset_name: string
          asset_type: string
          created_at?: string
          criticality: string
          id?: string
          ip_address?: string | null
          is_cloud?: boolean | null
          last_scanned?: string | null
          location: string
          mac_address?: string | null
          metadata?: Json | null
          owner: string
          sector: string
          updated_at?: string
        }
        Update: {
          asset_name?: string
          asset_type?: string
          created_at?: string
          criticality?: string
          id?: string
          ip_address?: string | null
          is_cloud?: boolean | null
          last_scanned?: string | null
          location?: string
          mac_address?: string | null
          metadata?: Json | null
          owner?: string
          sector?: string
          updated_at?: string
        }
        Relationships: []
      }
      auth_logs: {
        Row: {
          auth_method: string
          created_at: string
          geolocation: Json | null
          id: string
          ip_address: string
          is_privileged: boolean | null
          log_time: string
          metadata: Json | null
          mfa_used: boolean | null
          result: string
          sector: string
          user_id: string | null
          username: string
        }
        Insert: {
          auth_method: string
          created_at?: string
          geolocation?: Json | null
          id?: string
          ip_address: string
          is_privileged?: boolean | null
          log_time?: string
          metadata?: Json | null
          mfa_used?: boolean | null
          result: string
          sector: string
          user_id?: string | null
          username: string
        }
        Update: {
          auth_method?: string
          created_at?: string
          geolocation?: Json | null
          id?: string
          ip_address?: string
          is_privileged?: boolean | null
          log_time?: string
          metadata?: Json | null
          mfa_used?: boolean | null
          result?: string
          sector?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      business_continuity: {
        Row: {
          backup_status: string
          created_at: string
          failover_ready: boolean | null
          id: string
          last_backup: string | null
          last_test: string | null
          metadata: Json | null
          rpo_minutes: number
          rto_minutes: number
          sector: string
          system_name: string
          test_result: string | null
          updated_at: string
        }
        Insert: {
          backup_status: string
          created_at?: string
          failover_ready?: boolean | null
          id?: string
          last_backup?: string | null
          last_test?: string | null
          metadata?: Json | null
          rpo_minutes: number
          rto_minutes: number
          sector: string
          system_name: string
          test_result?: string | null
          updated_at?: string
        }
        Update: {
          backup_status?: string
          created_at?: string
          failover_ready?: boolean | null
          id?: string
          last_backup?: string | null
          last_test?: string | null
          metadata?: Json | null
          rpo_minutes?: number
          rto_minutes?: number
          sector?: string
          system_name?: string
          test_result?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      compliance_frameworks: {
        Row: {
          compliance_percentage: number | null
          created_at: string
          description: string | null
          framework_type: string
          id: string
          last_assessment: string | null
          metadata: Json | null
          name: string
          next_assessment: string | null
          requirements: Json | null
          responsible_person: string | null
          sector: string | null
          status: string
          updated_at: string
          version: string | null
        }
        Insert: {
          compliance_percentage?: number | null
          created_at?: string
          description?: string | null
          framework_type: string
          id?: string
          last_assessment?: string | null
          metadata?: Json | null
          name: string
          next_assessment?: string | null
          requirements?: Json | null
          responsible_person?: string | null
          sector?: string | null
          status?: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          compliance_percentage?: number | null
          created_at?: string
          description?: string | null
          framework_type?: string
          id?: string
          last_assessment?: string | null
          metadata?: Json | null
          name?: string
          next_assessment?: string | null
          requirements?: Json | null
          responsible_person?: string | null
          sector?: string | null
          status?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      data_subject_requests: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          metadata: Json | null
          notes: string | null
          priority: string
          request_type: string
          requester_name: string | null
          sector: string
          status: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          priority?: string
          request_type: string
          requester_name?: string | null
          sector: string
          status?: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          notes?: string | null
          priority?: string
          request_type?: string
          requester_name?: string | null
          sector?: string
          status?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      dlp_events: {
        Row: {
          action_taken: string
          blocked: boolean | null
          classification: string
          created_at: string
          data_size: number | null
          data_type: string
          destination_location: string | null
          event_time: string
          id: string
          metadata: Json | null
          policy_violated: string
          sector: string
          source_location: string
          user_id: string | null
        }
        Insert: {
          action_taken: string
          blocked?: boolean | null
          classification: string
          created_at?: string
          data_size?: number | null
          data_type: string
          destination_location?: string | null
          event_time?: string
          id?: string
          metadata?: Json | null
          policy_violated: string
          sector: string
          source_location: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string
          blocked?: boolean | null
          classification?: string
          created_at?: string
          data_size?: number | null
          data_type?: string
          destination_location?: string | null
          event_time?: string
          id?: string
          metadata?: Json | null
          policy_violated?: string
          sector?: string
          source_location?: string
          user_id?: string | null
        }
        Relationships: []
      }
      email_verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          used: boolean
          user_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          used?: boolean
          user_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          used?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      endpoints: {
        Row: {
          antivirus_status: string
          compliance_status: string
          created_at: string
          device_name: string
          device_type: string
          id: string
          ip_address: string
          is_active: boolean | null
          last_scan: string | null
          mac_address: string | null
          metadata: Json | null
          os_type: string
          os_version: string | null
          patch_level: string | null
          sector: string
          updated_at: string
        }
        Insert: {
          antivirus_status: string
          compliance_status: string
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          ip_address: string
          is_active?: boolean | null
          last_scan?: string | null
          mac_address?: string | null
          metadata?: Json | null
          os_type: string
          os_version?: string | null
          patch_level?: string | null
          sector: string
          updated_at?: string
        }
        Update: {
          antivirus_status?: string
          compliance_status?: string
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          ip_address?: string
          is_active?: boolean | null
          last_scan?: string | null
          mac_address?: string | null
          metadata?: Json | null
          os_type?: string
          os_version?: string | null
          patch_level?: string | null
          sector?: string
          updated_at?: string
        }
        Relationships: []
      }
      forensic_cases: {
        Row: {
          case_number: string
          case_status: string
          closed_date: string | null
          created_at: string
          evidence_collected: Json | null
          findings: string | null
          id: string
          incident_id: string | null
          investigator_id: string
          metadata: Json | null
          opened_date: string
          sector: string
          timeline: Json | null
          updated_at: string
        }
        Insert: {
          case_number: string
          case_status?: string
          closed_date?: string | null
          created_at?: string
          evidence_collected?: Json | null
          findings?: string | null
          id?: string
          incident_id?: string | null
          investigator_id: string
          metadata?: Json | null
          opened_date?: string
          sector: string
          timeline?: Json | null
          updated_at?: string
        }
        Update: {
          case_number?: string
          case_status?: string
          closed_date?: string | null
          created_at?: string
          evidence_collected?: Json | null
          findings?: string | null
          id?: string
          incident_id?: string | null
          investigator_id?: string
          metadata?: Json | null
          opened_date?: string
          sector?: string
          timeline?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      ids_alerts: {
        Row: {
          alert_time: string
          attack_signature: string
          attack_type: string
          confidence_score: number
          created_at: string
          destination_ip: string
          id: string
          is_false_positive: boolean | null
          metadata: Json | null
          sector: string
          severity: string
          source_ip: string
          status: string
        }
        Insert: {
          alert_time?: string
          attack_signature: string
          attack_type: string
          confidence_score: number
          created_at?: string
          destination_ip: string
          id?: string
          is_false_positive?: boolean | null
          metadata?: Json | null
          sector: string
          severity: string
          source_ip: string
          status?: string
        }
        Update: {
          alert_time?: string
          attack_signature?: string
          attack_type?: string
          confidence_score?: number
          created_at?: string
          destination_ip?: string
          id?: string
          is_false_positive?: boolean | null
          metadata?: Json | null
          sector?: string
          severity?: string
          source_ip?: string
          status?: string
        }
        Relationships: []
      }
      incidents: {
        Row: {
          created_at: string
          description: string | null
          id: string
          reported_by: string | null
          sector: string
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          reported_by?: string | null
          sector: string
          severity?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          reported_by?: string | null
          sector?: string
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "incidents_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      indicators_of_compromise: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string | null
          first_seen: string
          id: string
          ioc_type: string
          is_active: boolean | null
          last_seen: string
          metadata: Json | null
          mitre_attack_id: string | null
          sector: string | null
          severity: string
          source_feed_id: string | null
          tags: string[] | null
          threat_type: string | null
          updated_at: string
          value: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          first_seen?: string
          id?: string
          ioc_type: string
          is_active?: boolean | null
          last_seen?: string
          metadata?: Json | null
          mitre_attack_id?: string | null
          sector?: string | null
          severity?: string
          source_feed_id?: string | null
          tags?: string[] | null
          threat_type?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          first_seen?: string
          id?: string
          ioc_type?: string
          is_active?: boolean | null
          last_seen?: string
          metadata?: Json | null
          mitre_attack_id?: string | null
          sector?: string | null
          severity?: string
          source_feed_id?: string | null
          tags?: string[] | null
          threat_type?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "indicators_of_compromise_source_feed_id_fkey"
            columns: ["source_feed_id"]
            isOneToOne: false
            referencedRelation: "threat_feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      misp_events: {
        Row: {
          analysis_status: string | null
          attributes_count: number | null
          collected_at: string
          event_date: string | null
          event_id: string | null
          event_title: string | null
          id: string
          raw_data: Json | null
          sector: string | null
          threat_level: number | null
          tool_id: string | null
        }
        Insert: {
          analysis_status?: string | null
          attributes_count?: number | null
          collected_at?: string
          event_date?: string | null
          event_id?: string | null
          event_title?: string | null
          id?: string
          raw_data?: Json | null
          sector?: string | null
          threat_level?: number | null
          tool_id?: string | null
        }
        Update: {
          analysis_status?: string | null
          attributes_count?: number | null
          collected_at?: string
          event_date?: string | null
          event_id?: string | null
          event_title?: string | null
          id?: string
          raw_data?: Json | null
          sector?: string | null
          threat_level?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "misp_events_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "security_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      nessus_scans: {
        Row: {
          collected_at: string
          critical_count: number | null
          high_count: number | null
          id: string
          low_count: number | null
          medium_count: number | null
          raw_data: Json | null
          scan_date: string | null
          scan_id: string | null
          scan_name: string | null
          scan_status: string | null
          sector: string | null
          target_count: number | null
          tool_id: string | null
          vulnerabilities_found: number | null
        }
        Insert: {
          collected_at?: string
          critical_count?: number | null
          high_count?: number | null
          id?: string
          low_count?: number | null
          medium_count?: number | null
          raw_data?: Json | null
          scan_date?: string | null
          scan_id?: string | null
          scan_name?: string | null
          scan_status?: string | null
          sector?: string | null
          target_count?: number | null
          tool_id?: string | null
          vulnerabilities_found?: number | null
        }
        Update: {
          collected_at?: string
          critical_count?: number | null
          high_count?: number | null
          id?: string
          low_count?: number | null
          medium_count?: number | null
          raw_data?: Json | null
          scan_date?: string | null
          scan_id?: string | null
          scan_name?: string | null
          scan_status?: string | null
          sector?: string | null
          target_count?: number | null
          tool_id?: string | null
          vulnerabilities_found?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nessus_scans_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "security_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      network_traffic: {
        Row: {
          anomaly_detected: boolean | null
          anomaly_score: number | null
          created_at: string
          destination_ip: string
          destination_port: number | null
          geolocation: Json | null
          id: string
          metadata: Json | null
          packet_size: number | null
          protocol: string
          sector: string
          source_ip: string
          source_port: number | null
          timestamp: string
        }
        Insert: {
          anomaly_detected?: boolean | null
          anomaly_score?: number | null
          created_at?: string
          destination_ip: string
          destination_port?: number | null
          geolocation?: Json | null
          id?: string
          metadata?: Json | null
          packet_size?: number | null
          protocol: string
          sector: string
          source_ip: string
          source_port?: number | null
          timestamp?: string
        }
        Update: {
          anomaly_detected?: boolean | null
          anomaly_score?: number | null
          created_at?: string
          destination_ip?: string
          destination_port?: number | null
          geolocation?: Json | null
          id?: string
          metadata?: Json | null
          packet_size?: number | null
          protocol?: string
          sector?: string
          source_ip?: string
          source_port?: number | null
          timestamp?: string
        }
        Relationships: []
      }
      nozomi_alerts: {
        Row: {
          alert_id: string | null
          alert_time: string | null
          alert_type: string | null
          collected_at: string
          description: string | null
          destination_ip: string | null
          id: string
          protocol: string | null
          raw_data: Json | null
          sector: string | null
          severity: string | null
          source_ip: string | null
          tool_id: string | null
        }
        Insert: {
          alert_id?: string | null
          alert_time?: string | null
          alert_type?: string | null
          collected_at?: string
          description?: string | null
          destination_ip?: string | null
          id?: string
          protocol?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity?: string | null
          source_ip?: string | null
          tool_id?: string | null
        }
        Update: {
          alert_id?: string | null
          alert_time?: string | null
          alert_type?: string | null
          collected_at?: string
          description?: string | null
          destination_ip?: string | null
          id?: string
          protocol?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity?: string | null
          source_ip?: string | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nozomi_alerts_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "security_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      pentest_results: {
        Row: {
          created_at: string
          critical_findings: number | null
          high_findings: number | null
          id: string
          low_findings: number | null
          medium_findings: number | null
          metadata: Json | null
          report_url: string | null
          sector: string
          status: string
          target_system: string
          test_date: string
          test_type: string
          tester: string
          vulnerabilities_found: number
        }
        Insert: {
          created_at?: string
          critical_findings?: number | null
          high_findings?: number | null
          id?: string
          low_findings?: number | null
          medium_findings?: number | null
          metadata?: Json | null
          report_url?: string | null
          sector: string
          status: string
          target_system: string
          test_date: string
          test_type: string
          tester: string
          vulnerabilities_found: number
        }
        Update: {
          created_at?: string
          critical_findings?: number | null
          high_findings?: number | null
          id?: string
          low_findings?: number | null
          medium_findings?: number | null
          metadata?: Json | null
          report_url?: string | null
          sector?: string
          status?: string
          target_system?: string
          test_date?: string
          test_type?: string
          tester?: string
          vulnerabilities_found?: number
        }
        Relationships: []
      }
      personal_data_inventory: {
        Row: {
          consent_obtained: boolean | null
          created_at: string
          data_category: string
          data_location: string
          data_owner: string
          encryption_status: boolean | null
          id: string
          last_reviewed: string | null
          legal_basis: string
          metadata: Json | null
          purpose: string
          retention_period: string
          sector: string
          updated_at: string
        }
        Insert: {
          consent_obtained?: boolean | null
          created_at?: string
          data_category: string
          data_location: string
          data_owner: string
          encryption_status?: boolean | null
          id?: string
          last_reviewed?: string | null
          legal_basis: string
          metadata?: Json | null
          purpose: string
          retention_period: string
          sector: string
          updated_at?: string
        }
        Update: {
          consent_obtained?: boolean | null
          created_at?: string
          data_category?: string
          data_location?: string
          data_owner?: string
          encryption_status?: boolean | null
          id?: string
          last_reviewed?: string | null
          legal_basis?: string
          metadata?: Json | null
          purpose?: string
          retention_period?: string
          sector?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["user_role"]
          sector: Database["public"]["Enums"]["sector_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          sector: Database["public"]["Enums"]["sector_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          sector?: Database["public"]["Enums"]["sector_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      qualys_assets: {
        Row: {
          asset_type: string | null
          collected_at: string
          host_ip: string | null
          hostname: string | null
          id: string
          last_scanned: string | null
          raw_data: Json | null
          sector: string | null
          severity_score: number | null
          tool_id: string | null
          vulnerabilities_count: number | null
        }
        Insert: {
          asset_type?: string | null
          collected_at?: string
          host_ip?: string | null
          hostname?: string | null
          id?: string
          last_scanned?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity_score?: number | null
          tool_id?: string | null
          vulnerabilities_count?: number | null
        }
        Update: {
          asset_type?: string | null
          collected_at?: string
          host_ip?: string | null
          hostname?: string | null
          id?: string
          last_scanned?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity_score?: number | null
          tool_id?: string | null
          vulnerabilities_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "qualys_assets_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "security_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_assessments: {
        Row: {
          assessment_date: string
          created_at: string
          id: string
          impact_score: number
          likelihood_score: number
          metadata: Json | null
          mitigation_strategy: string | null
          owner: string
          residual_risk: number | null
          risk_category: string
          risk_name: string
          risk_score: number
          sector: string
          status: string
          updated_at: string
        }
        Insert: {
          assessment_date?: string
          created_at?: string
          id?: string
          impact_score: number
          likelihood_score: number
          metadata?: Json | null
          mitigation_strategy?: string | null
          owner: string
          residual_risk?: number | null
          risk_category: string
          risk_name: string
          risk_score: number
          sector: string
          status: string
          updated_at?: string
        }
        Update: {
          assessment_date?: string
          created_at?: string
          id?: string
          impact_score?: number
          likelihood_score?: number
          metadata?: Json | null
          mitigation_strategy?: string | null
          owner?: string
          residual_risk?: number | null
          risk_category?: string
          risk_name?: string
          risk_score?: number
          sector?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          id: string
          metadata: Json | null
          sector: string
          severity: string
          source: string
          target: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          sector: string
          severity?: string
          source: string
          target?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          sector?: string
          severity?: string
          source?: string
          target?: string | null
        }
        Relationships: []
      }
      security_policies: {
        Row: {
          acknowledgment_count: number | null
          acknowledgment_required: boolean | null
          content: string | null
          created_at: string
          effective_date: string
          id: string
          metadata: Json | null
          owner: string
          policy_name: string
          policy_type: string
          review_date: string
          sector: string | null
          status: string
          updated_at: string
          version: string
        }
        Insert: {
          acknowledgment_count?: number | null
          acknowledgment_required?: boolean | null
          content?: string | null
          created_at?: string
          effective_date: string
          id?: string
          metadata?: Json | null
          owner: string
          policy_name: string
          policy_type: string
          review_date: string
          sector?: string | null
          status?: string
          updated_at?: string
          version: string
        }
        Update: {
          acknowledgment_count?: number | null
          acknowledgment_required?: boolean | null
          content?: string | null
          created_at?: string
          effective_date?: string
          id?: string
          metadata?: Json | null
          owner?: string
          policy_name?: string
          policy_type?: string
          review_date?: string
          sector?: string | null
          status?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      security_tools: {
        Row: {
          created_at: string
          endpoint_url: string
          id: string
          is_active: boolean | null
          last_sync: string | null
          metadata: Json | null
          sector: string | null
          sync_frequency: number | null
          tool_name: string
          tool_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          endpoint_url: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          metadata?: Json | null
          sector?: string | null
          sync_frequency?: number | null
          tool_name: string
          tool_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          endpoint_url?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          metadata?: Json | null
          sector?: string | null
          sync_frequency?: number | null
          tool_name?: string
          tool_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      shared_intelligence: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string | null
          distribution_count: number | null
          feedback_score: number | null
          id: string
          intelligence_type: string
          metadata: Json | null
          related_incidents: string[] | null
          shared_by: string
          sharing_level: string
          source_sector: string
          status: string
          stix_package: Json | null
          tags: string[] | null
          target_sectors: string[] | null
          taxii_collection: string | null
          title: string
          updated_at: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          distribution_count?: number | null
          feedback_score?: number | null
          id?: string
          intelligence_type: string
          metadata?: Json | null
          related_incidents?: string[] | null
          shared_by: string
          sharing_level?: string
          source_sector: string
          status?: string
          stix_package?: Json | null
          tags?: string[] | null
          target_sectors?: string[] | null
          taxii_collection?: string | null
          title: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          distribution_count?: number | null
          feedback_score?: number | null
          id?: string
          intelligence_type?: string
          metadata?: Json | null
          related_incidents?: string[] | null
          shared_by?: string
          sharing_level?: string
          source_sector?: string
          status?: string
          stix_package?: Json | null
          tags?: string[] | null
          target_sectors?: string[] | null
          taxii_collection?: string | null
          title?: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: []
      }
      siem_events: {
        Row: {
          correlation_id: string | null
          created_at: string
          description: string | null
          event_time: string
          event_type: string
          id: string
          indexed: boolean | null
          ip_address: string | null
          metadata: Json | null
          raw_log: Json | null
          sector: string
          severity: string
          source_system: string
          user_id: string | null
        }
        Insert: {
          correlation_id?: string | null
          created_at?: string
          description?: string | null
          event_time?: string
          event_type: string
          id?: string
          indexed?: boolean | null
          ip_address?: string | null
          metadata?: Json | null
          raw_log?: Json | null
          sector: string
          severity: string
          source_system: string
          user_id?: string | null
        }
        Update: {
          correlation_id?: string | null
          created_at?: string
          description?: string | null
          event_time?: string
          event_type?: string
          id?: string
          indexed?: boolean | null
          ip_address?: string | null
          metadata?: Json | null
          raw_log?: Json | null
          sector?: string
          severity?: string
          source_system?: string
          user_id?: string | null
        }
        Relationships: []
      }
      splunk_data: {
        Row: {
          collected_at: string
          count: number | null
          id: string
          query_used: string | null
          raw_data: Json | null
          sector: string | null
          severity: string | null
          threat_type: string | null
          tool_id: string | null
        }
        Insert: {
          collected_at?: string
          count?: number | null
          id?: string
          query_used?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity?: string | null
          threat_type?: string | null
          tool_id?: string | null
        }
        Update: {
          collected_at?: string
          count?: number | null
          id?: string
          query_used?: string | null
          raw_data?: Json | null
          sector?: string | null
          severity?: string | null
          threat_type?: string | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "splunk_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "security_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      system_health: {
        Row: {
          cpu_usage: number
          created_at: string
          disk_usage: number
          id: string
          memory_usage: number
          metadata: Json | null
          response_time_ms: number | null
          sector: string
          server_name: string
          server_type: string
          status: string
          timestamp: string
          uptime_seconds: number
        }
        Insert: {
          cpu_usage: number
          created_at?: string
          disk_usage: number
          id?: string
          memory_usage: number
          metadata?: Json | null
          response_time_ms?: number | null
          sector: string
          server_name: string
          server_type: string
          status?: string
          timestamp?: string
          uptime_seconds: number
        }
        Update: {
          cpu_usage?: number
          created_at?: string
          disk_usage?: number
          id?: string
          memory_usage?: number
          metadata?: Json | null
          response_time_ms?: number | null
          sector?: string
          server_name?: string
          server_type?: string
          status?: string
          timestamp?: string
          uptime_seconds?: number
        }
        Relationships: []
      }
      threat_actors: {
        Row: {
          active_since: string | null
          aliases: string[] | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          known_campaigns: string[] | null
          last_activity: string | null
          metadata: Json | null
          mitre_attack_techniques: string[] | null
          motivation: string | null
          name: string
          origin_country: string | null
          sophistication: string | null
          target_sectors: string[] | null
          updated_at: string
        }
        Insert: {
          active_since?: string | null
          aliases?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          known_campaigns?: string[] | null
          last_activity?: string | null
          metadata?: Json | null
          mitre_attack_techniques?: string[] | null
          motivation?: string | null
          name: string
          origin_country?: string | null
          sophistication?: string | null
          target_sectors?: string[] | null
          updated_at?: string
        }
        Update: {
          active_since?: string | null
          aliases?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          known_campaigns?: string[] | null
          last_activity?: string | null
          metadata?: Json | null
          mitre_attack_techniques?: string[] | null
          motivation?: string | null
          name?: string
          origin_country?: string | null
          sophistication?: string | null
          target_sectors?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      threat_feeds: {
        Row: {
          api_key_required: boolean | null
          confidence_score: number | null
          created_at: string
          description: string | null
          feed_type: string
          id: string
          is_active: boolean | null
          last_updated: string | null
          metadata: Json | null
          name: string
          sector: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          api_key_required?: boolean | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          feed_type: string
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          metadata?: Json | null
          name: string
          sector?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          api_key_required?: boolean | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          feed_type?: string
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          metadata?: Json | null
          name?: string
          sector?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      threat_iocs: {
        Row: {
          confidence_score: number
          created_at: string
          dark_web_source: boolean | null
          first_seen: string
          id: string
          industry_specific: boolean | null
          ioc_type: string
          ioc_value: string
          last_seen: string
          metadata: Json | null
          sector: string | null
          source: string
          tags: string[] | null
          threat_level: string
        }
        Insert: {
          confidence_score: number
          created_at?: string
          dark_web_source?: boolean | null
          first_seen?: string
          id?: string
          industry_specific?: boolean | null
          ioc_type: string
          ioc_value: string
          last_seen?: string
          metadata?: Json | null
          sector?: string | null
          source: string
          tags?: string[] | null
          threat_level: string
        }
        Update: {
          confidence_score?: number
          created_at?: string
          dark_web_source?: boolean | null
          first_seen?: string
          id?: string
          industry_specific?: boolean | null
          ioc_type?: string
          ioc_value?: string
          last_seen?: string
          metadata?: Json | null
          sector?: string | null
          source?: string
          tags?: string[] | null
          threat_level?: string
        }
        Relationships: []
      }
      training_records: {
        Row: {
          certificate_url: string | null
          completion_date: string | null
          created_at: string
          expiry_date: string | null
          id: string
          metadata: Json | null
          passed: boolean | null
          score: number | null
          sector: string
          training_name: string
          training_type: string
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          completion_date?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          passed?: boolean | null
          score?: number | null
          sector: string
          training_name: string
          training_type: string
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          completion_date?: string | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          passed?: boolean | null
          score?: number | null
          sector?: string
          training_name?: string
          training_type?: string
          user_id?: string
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          assessment_required: boolean | null
          completion_rate: number | null
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          materials_url: string | null
          max_participants: number | null
          metadata: Json | null
          registered_count: number | null
          scheduled_date: string | null
          sector: string | null
          session_type: string
          status: string
          target_audience: string
          title: string
          trainer: string | null
          updated_at: string
        }
        Insert: {
          assessment_required?: boolean | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          materials_url?: string | null
          max_participants?: number | null
          metadata?: Json | null
          registered_count?: number | null
          scheduled_date?: string | null
          sector?: string | null
          session_type: string
          status?: string
          target_audience: string
          title: string
          trainer?: string | null
          updated_at?: string
        }
        Update: {
          assessment_required?: boolean | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          materials_url?: string | null
          max_participants?: number | null
          metadata?: Json | null
          registered_count?: number | null
          scheduled_date?: string | null
          sector?: string | null
          session_type?: string
          status?: string
          target_audience?: string
          title?: string
          trainer?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vulnerability_scans: {
        Row: {
          asset_id: string
          created_at: string
          cve_id: string | null
          cvss_score: number
          id: string
          metadata: Json | null
          patch_available: boolean | null
          remediation_priority: number | null
          scan_date: string
          sector: string
          severity: string
          status: string
          vulnerability_name: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          cve_id?: string | null
          cvss_score: number
          id?: string
          metadata?: Json | null
          patch_available?: boolean | null
          remediation_priority?: number | null
          scan_date?: string
          sector: string
          severity: string
          status?: string
          vulnerability_name: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          cve_id?: string | null
          cvss_score?: number
          id?: string
          metadata?: Json | null
          patch_available?: boolean | null
          remediation_priority?: number | null
          scan_date?: string
          sector?: string
          severity?: string
          status?: string
          vulnerability_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_current_user_sector: {
        Args: never
        Returns: Database["public"]["Enums"]["sector_type"]
      }
      has_role:
        | {
            Args: { _role: Database["public"]["Enums"]["user_role"] }
            Returns: boolean
          }
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
    }
    Enums: {
      app_role: "admin" | "analyst" | "sector-lead"
      sector_type:
        | "government"
        | "banking"
        | "private"
        | "education"
        | "industrial"
        | "telecoms"
        | "health"
        | "energy"
        | "transport"
        | "media"
        | "zchpc"
      user_role: "admin" | "analyst" | "sector-lead"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "analyst", "sector-lead"],
      sector_type: [
        "government",
        "banking",
        "private",
        "education",
        "industrial",
        "telecoms",
        "health",
        "energy",
        "transport",
        "media",
        "zchpc",
      ],
      user_role: ["admin", "analyst", "sector-lead"],
    },
  },
} as const
