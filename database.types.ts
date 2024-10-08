export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: number
          image: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          name?: string | null
        }
        Relationships: []
      }
      channels: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          disclaimer: string | null
          id: string
          image: string | null
          is_active: boolean | null
          mission: string | null
          name: string | null
          policy: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          disclaimer?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          mission?: string | null
          name?: string | null
          policy?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          disclaimer?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          mission?: string | null
          name?: string | null
          policy?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_completions: {
        Row: {
          chapter_id: string
          course_id: number
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          chapter_id: string
          course_id: number
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          chapter_id?: string
          course_id?: number
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_completions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_completions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_progress_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_downloads: {
        Row: {
          chapter_id: string | null
          created_at: string
          id: number
          student_id: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          id?: number
          student_id: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_downloads_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_downloads_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_quiz_options: {
        Row: {
          answer: string | null
          chapter_quiz_id: string | null
          created_at: string
          description: string | null
          id: string
          is_correct: boolean | null
        }
        Insert: {
          answer?: string | null
          chapter_quiz_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_correct?: boolean | null
        }
        Update: {
          answer?: string | null
          chapter_quiz_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_correct?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_quiz_options_chapter_quiz_id_fkey"
            columns: ["chapter_quiz_id"]
            isOneToOne: false
            referencedRelation: "chapter_quizes"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_quizes: {
        Row: {
          chapter_id: string | null
          created_at: string
          id: string
          question: string | null
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          id?: string
          question?: string | null
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          id?: string
          question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_quizes_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          author: string | null
          course_id: number
          created_at: string
          editor: string | null
          editor_comment: string | null
          editor_status: Database["public"]["Enums"]["editor_status"]
          id: string
          submitted: boolean
          timeline: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          course_id: number
          created_at?: string
          editor?: string | null
          editor_comment?: string | null
          editor_status?: Database["public"]["Enums"]["editor_status"]
          id?: string
          submitted?: boolean
          timeline?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          course_id?: number
          created_at?: string
          editor?: string | null
          editor_comment?: string | null
          editor_status?: Database["public"]["Enums"]["editor_status"]
          id?: string
          submitted?: boolean
          timeline?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_editor_fkey"
            columns: ["editor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
        ]
      }
      course_discussions: {
        Row: {
          course_id: number
          created_at: string
          id: string
          message: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: string
          message?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: string
          message?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_discussions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_files: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          link: string | null
          name: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          link?: string | null
          name?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          link?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_files_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_ratings: {
        Row: {
          comment: string | null
          course_id: number | null
          created_at: string
          id: string
          stars: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          course_id?: number | null
          created_at?: string
          id?: string
          stars?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          course_id?: number | null
          created_at?: string
          id?: string
          stars?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_ratings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          audience: string | null
          category_id: number | null
          channel_id: string
          created_at: string
          description: string | null
          duration: number
          editor: string
          editor_comment: string | null
          editor_status: Database["public"]["Enums"]["editor_status"]
          featured: boolean
          id: number
          is_complete: boolean
          is_live: boolean
          price: number | null
          published: boolean | null
          status: Database["public"]["Enums"]["course_status"]
          thumbnail: string | null
          timeline: string | null
          title: string | null
        }
        Insert: {
          audience?: string | null
          category_id?: number | null
          channel_id?: string
          created_at?: string
          description?: string | null
          duration?: number
          editor?: string
          editor_comment?: string | null
          editor_status?: Database["public"]["Enums"]["editor_status"]
          featured?: boolean
          id?: number
          is_complete?: boolean
          is_live?: boolean
          price?: number | null
          published?: boolean | null
          status?: Database["public"]["Enums"]["course_status"]
          thumbnail?: string | null
          timeline?: string | null
          title?: string | null
        }
        Update: {
          audience?: string | null
          category_id?: number | null
          channel_id?: string
          created_at?: string
          description?: string | null
          duration?: number
          editor?: string
          editor_comment?: string | null
          editor_status?: Database["public"]["Enums"]["editor_status"]
          featured?: boolean
          id?: number
          is_complete?: boolean
          is_live?: boolean
          price?: number | null
          published?: boolean | null
          status?: Database["public"]["Enums"]["course_status"]
          thumbnail?: string | null
          timeline?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          amount: number | null
          created_at: string
          expiry: string | null
          id: string
          item_id: number | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          expiry?: string | null
          id?: string
          item_id?: number | null
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          expiry?: string | null
          id?: string
          item_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discounts_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          channel_id: string | null
          created_at: string
          id: string
          notifications: boolean
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string
          id?: string
          notifications?: boolean
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string
          id?: string
          notifications?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "followers_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interests: {
        Row: {
          category_id: number | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          request: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          request: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          request?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["email"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string | null
          name: string | null
          read: boolean
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          name?: string | null
          read?: boolean
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          name?: string | null
          read?: boolean
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          group: string
          id: string
          member: boolean
          phone: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          group?: string
          id: string
          member?: boolean
          phone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          group?: string
          id?: string
          member?: boolean
          phone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      replies: {
        Row: {
          channel_id: string
          comment_id: string
          created_at: string
          id: string
          message: string | null
          user_id: string | null
        }
        Insert: {
          channel_id: string
          comment_id: string
          created_at?: string
          id?: string
          message?: string | null
          user_id?: string | null
        }
        Update: {
          channel_id?: string
          comment_id?: string
          created_at?: string
          id?: string
          message?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "course_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      searches: {
        Row: {
          created_at: string
          id: string
          search_term: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          search_term?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          search_term?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          author_id: string | null
          course_id: number | null
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          author_id?: string | null
          course_id?: number | null
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          author_id?: string | null
          course_id?: number | null
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          completed: boolean
          course_id: number
          created_at: string | null
          id: string
          student_id: string
        }
        Insert: {
          completed?: boolean
          course_id: number
          created_at?: string | null
          id?: string
          student_id: string
        }
        Update: {
          completed?: boolean
          course_id?: number
          created_at?: string | null
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_topics: {
        Row: {
          author_id: string | null
          chapter_id: string
          content: string | null
          created_at: string
          editor: string | null
          id: number
          title: string | null
        }
        Insert: {
          author_id?: string | null
          chapter_id: string
          content?: string | null
          created_at?: string
          editor?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          author_id?: string | null
          chapter_id?: string
          content?: string | null
          created_at?: string
          editor?: string | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_topics_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_topics_completions: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          sub_topic_id: number
          user_id: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id?: string
          sub_topic_id: number
          user_id: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          sub_topic_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_topics_completions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_topics_completions_sub_topic_id_fkey"
            columns: ["sub_topic_id"]
            isOneToOne: false
            referencedRelation: "sub_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_topics_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          name: Database["public"]["Enums"]["user_group"] | null
          supervisor: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["user_group"] | null
          supervisor?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["user_group"] | null
          supervisor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_supervisor_fkey"
            columns: ["supervisor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      terms: {
        Row: {
          category: string | null
          created_at: string
          editor: string | null
          id: string
          index: number
          message: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          editor?: string | null
          id?: string
          index?: number
          message?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          editor?: string | null
          id?: string
          index?: number
          message?: string | null
          title?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: string | null
          checkout_request_id: string
          course_id: number
          created_at: string
          editor: string | null
          id: string
          merchant_request_id: string
          method: string
          mpesa_receipt_number: string | null
          phone_number: string | null
          result_code: string | null
          result_desc: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount?: string | null
          checkout_request_id: string
          course_id: number
          created_at?: string
          editor?: string | null
          id?: string
          merchant_request_id: string
          method: string
          mpesa_receipt_number?: string | null
          phone_number?: string | null
          result_code?: string | null
          result_desc?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: string | null
          checkout_request_id?: string
          course_id?: number
          created_at?: string
          editor?: string | null
          id?: string
          merchant_request_id?: string
          method?: string
          mpesa_receipt_number?: string | null
          phone_number?: string | null
          result_code?: string | null
          result_desc?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_courses: {
        Row: {
          course_id: number | null
          created_at: string
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          points: number | null
          rate: number | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          points?: number | null
          rate?: number | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          points?: number | null
          rate?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wish_list: {
        Row: {
          course_id: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wish_list_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wish_list_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      course_status:
        | "waiting"
        | "in_review"
        | "published"
        | "private"
        | "rejected"
        | "in_progress"
      editor_status: "waiting" | "in_review" | "accepted" | "rejected"
      terms_category:
        | "membership"
        | "content consumption"
        | "app usage"
        | "partnership"
      user_group:
        | "USER"
        | "ADMIN"
        | "EDITOR"
        | "CUSTOMER_SUPPORT"
        | "SUPPORT"
        | "MARKETTING"
        | "SALES"
        | "FINANCE"
        | "AUTHOR"
        | "RESEARCH"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
