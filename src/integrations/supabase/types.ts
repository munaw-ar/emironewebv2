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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      admin_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      experiment_logs: {
        Row: {
          conclusion: string
          created_at: string | null
          date_published: string
          hypothesis: string
          id: string
          industry: string
          is_published: boolean | null
          metrics: Json | null
          next_test: string | null
          results: string
          sample_size: string | null
          slug: string
          test_setup: string
          title: string
          updated_at: string | null
        }
        Insert: {
          conclusion: string
          created_at?: string | null
          date_published?: string
          hypothesis: string
          id?: string
          industry: string
          is_published?: boolean | null
          metrics?: Json | null
          next_test?: string | null
          results: string
          sample_size?: string | null
          slug: string
          test_setup: string
          title: string
          updated_at?: string | null
        }
        Update: {
          conclusion?: string
          created_at?: string | null
          date_published?: string
          hypothesis?: string
          id?: string
          industry?: string
          is_published?: boolean | null
          metrics?: Json | null
          next_test?: string | null
          results?: string
          sample_size?: string | null
          slug?: string
          test_setup?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industry_research: {
        Row: {
          author: string | null
          booking_rate: string | null
          common_mistakes: Json | null
          created_at: string | null
          icps_tested: Json | null
          id: string
          industry_name: string
          industry_overview: string | null
          is_published: boolean | null
          key_insights: Json | null
          last_updated: string | null
          methodology: string | null
          open_rate_range: string | null
          quarter: string
          reply_rate_range: string | null
          sample_size: string | null
          slug: string
          title: string
          updated_at: string | null
          what_failed: Json | null
          what_worked: Json | null
        }
        Insert: {
          author?: string | null
          booking_rate?: string | null
          common_mistakes?: Json | null
          created_at?: string | null
          icps_tested?: Json | null
          id?: string
          industry_name: string
          industry_overview?: string | null
          is_published?: boolean | null
          key_insights?: Json | null
          last_updated?: string | null
          methodology?: string | null
          open_rate_range?: string | null
          quarter: string
          reply_rate_range?: string | null
          sample_size?: string | null
          slug: string
          title: string
          updated_at?: string | null
          what_failed?: Json | null
          what_worked?: Json | null
        }
        Update: {
          author?: string | null
          booking_rate?: string | null
          common_mistakes?: Json | null
          created_at?: string | null
          icps_tested?: Json | null
          id?: string
          industry_name?: string
          industry_overview?: string | null
          is_published?: boolean | null
          key_insights?: Json | null
          last_updated?: string | null
          methodology?: string | null
          open_rate_range?: string | null
          quarter?: string
          reply_rate_range?: string | null
          sample_size?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
          what_failed?: Json | null
          what_worked?: Json | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          goal: string | null
          id: string
          metadata: Json | null
          phone: string | null
          source: string | null
          website: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          goal?: string | null
          id?: string
          metadata?: Json | null
          phone?: string | null
          source?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          goal?: string | null
          id?: string
          metadata?: Json | null
          phone?: string | null
          source?: string | null
          website?: string | null
        }
        Relationships: []
      }
      methodology_page: {
        Row: {
          content: string
          id: string
          is_published: boolean
          last_updated: string | null
          updated_by: string | null
        }
        Insert: {
          content?: string
          id?: string
          is_published?: boolean
          last_updated?: string | null
          updated_by?: string | null
        }
        Update: {
          content?: string
          id?: string
          is_published?: boolean
          last_updated?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          source: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      quarterly_reports: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          id: string
          is_published: boolean | null
          page_count: number | null
          pdf_file_size: string | null
          pdf_url: string | null
          published_date: string
          quarter: string
          sample_size_emails: number | null
          sample_size_meetings: number | null
          sample_size_replies: number | null
          slug: string
          title: string
          updated_at: string | null
          year: number
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          id?: string
          is_published?: boolean | null
          page_count?: number | null
          pdf_file_size?: string | null
          pdf_url?: string | null
          published_date?: string
          quarter: string
          sample_size_emails?: number | null
          sample_size_meetings?: number | null
          sample_size_replies?: number | null
          slug: string
          title: string
          updated_at?: string | null
          year: number
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          id?: string
          is_published?: boolean | null
          page_count?: number | null
          pdf_file_size?: string | null
          pdf_url?: string | null
          published_date?: string
          quarter?: string
          sample_size_emails?: number | null
          sample_size_meetings?: number | null
          sample_size_replies?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      research_analytics: {
        Row: {
          content_id: string | null
          content_type: string
          event_type: string
          id: string
          metadata: Json | null
          timestamp: string | null
        }
        Insert: {
          content_id?: string | null
          content_type: string
          event_type: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
        }
        Update: {
          content_id?: string | null
          content_type?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
