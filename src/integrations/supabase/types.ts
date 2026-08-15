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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      claim_documents: {
        Row: {
          claim_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          uploaded_by: string | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          uploaded_by?: string | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claim_documents_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claim_events: {
        Row: {
          actor_id: string | null
          claim_id: string
          created_at: string
          id: string
          is_internal: boolean
          note: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          title: string
        }
        Insert: {
          actor_id?: string | null
          claim_id: string
          created_at?: string
          id?: string
          is_internal?: boolean
          note?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          title: string
        }
        Update: {
          actor_id?: string | null
          claim_id?: string
          created_at?: string
          id?: string
          is_internal?: boolean
          note?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "claim_events_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claim_messages: {
        Row: {
          body: string
          claim_id: string
          created_at: string
          from_staff: boolean
          id: string
          sender_id: string | null
        }
        Insert: {
          body: string
          claim_id: string
          created_at?: string
          from_staff?: boolean
          id?: string
          sender_id?: string | null
        }
        Update: {
          body?: string
          claim_id?: string
          created_at?: string
          from_staff?: boolean
          id?: string
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claim_messages_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          amount: number
          assigned_to: string | null
          claimant_email: string
          claimant_name: string
          claimant_phone: string | null
          counterparty: string | null
          country: string | null
          created_at: string
          currency: string
          description: string | null
          id: string
          incident_date: string | null
          internal_notes: string | null
          loss_type: Database["public"]["Enums"]["loss_type"]
          recovered_amount: number
          reference: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          assigned_to?: string | null
          claimant_email: string
          claimant_name: string
          claimant_phone?: string | null
          counterparty?: string | null
          country?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          incident_date?: string | null
          internal_notes?: string | null
          loss_type?: Database["public"]["Enums"]["loss_type"]
          recovered_amount?: number
          reference?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          assigned_to?: string | null
          claimant_email?: string
          claimant_name?: string
          claimant_phone?: string | null
          counterparty?: string | null
          country?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          incident_date?: string | null
          internal_notes?: string | null
          loss_type?: Database["public"]["Enums"]["loss_type"]
          recovered_amount?: number
          reference?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string | null
          country: string | null
          created_at: string
          currency: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          phone: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          account_type?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          middle_name?: string | null
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          account_type?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          grouping: string
          key: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          grouping?: string
          key: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          grouping?: string
          key?: string
          label?: string
          updated_at?: string
          value?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      track_claim: {
        Args: { _email: string; _reference: string }
        Returns: {
          amount: number
          claimant_name: string
          currency: string
          recovered_amount: number
          reference: string
          status: Database["public"]["Enums"]["claim_status"]
          submitted_at: string
          updated_at: string
        }[]
      }
      track_claim_timeline: {
        Args: { _email: string; _reference: string }
        Returns: {
          created_at: string
          note: string
          status: Database["public"]["Enums"]["claim_status"]
          title: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "member"
      claim_status:
        | "submitted"
        | "under_review"
        | "evidence_requested"
        | "filed"
        | "negotiation"
        | "approved"
        | "disbursed"
        | "declined"
      loss_type:
        | "unauthorized_transaction"
        | "merchant_dispute"
        | "wire_fraud"
        | "card_chargeback"
        | "investment_loss"
        | "duplicate_charge"
        | "subscription_billing"
        | "other"
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
      app_role: ["admin", "staff", "member"],
      claim_status: [
        "submitted",
        "under_review",
        "evidence_requested",
        "filed",
        "negotiation",
        "approved",
        "disbursed",
        "declined",
      ],
      loss_type: [
        "unauthorized_transaction",
        "merchant_dispute",
        "wire_fraud",
        "card_chargeback",
        "investment_loss",
        "duplicate_charge",
        "subscription_billing",
        "other",
      ],
    },
  },
} as const
