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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_current_user_sector: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["sector_type"]
      }
      has_role: {
        Args: { _role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
    }
    Enums: {
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
