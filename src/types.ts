export interface AnalysisItem {
  id: string;
  video_id: string;
  video_title?: string;
  channel_name?: string;
  thumbnail_url?: string;
  platform?: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  total_comments_analyzed?: number;
  hate_percentage?: number;
  positive_percentage?: number;
  negative_percentage?: number;
  neutral_percentage?: number;
  average_sentiment?: number;
  toxicity_score?: number;
  word_rankings?: Array<{ word: string; count: number; category: string }>;
  trending_topics?: Array<{ topic: string; mentions: number; sentiment: string }>;
  emotion_breakdown?: Record<string, number>;
  content_insights?: {
    questions_count?: number;
    complaints_count?: number;
    praise_count?: number;
    key_themes?: string[];
    audience_requests?: string[];
  };
  status?: string;
  created_at?: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  youtube_channel_id?: string;
  category?: string;
  thumbnail_url?: string;
  total_videos_analyzed?: number;
  avg_hate_percentage?: number;
  avg_positive_percentage?: number;
  avg_negative_percentage?: number;
  toxicity_level?: 'low' | 'medium' | 'high';
  created_at?: string;
}

export interface GlobalStats {
  total_analyses: number;
  total_channels: number;
  avg_hate_rate: number;
  total_comments_analyzed: number;
}
