-- KAI Supabase Schema
-- Run this in Supabase SQL Editor

-- Trading Sessions (for HFT logs)
CREATE TABLE IF NOT EXISTS trading_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pair VARCHAR(20) NOT NULL,
  action VARCHAR(10) NOT NULL, -- BUY/SELL
  entry_price DECIMAL(18,8),
  exit_price DECIMAL(18,8),
  profit_loss DECIMAL(18,8),
  status VARCHAR(20) DEFAULT 'open', -- open/closed
  strategy VARCHAR(50),
  notes TEXT,
  metadata JSONB
);

-- KAI Memory (persistent learning)
CREATE TABLE IF NOT EXISTS kai_memory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category VARCHAR(50) NOT NULL, -- trading/content/system
  key VARCHAR(100) NOT NULL,
  value TEXT,
  embedding vector(1536), -- for semantic search
  metadata JSONB,
  UNIQUE(category, key)
);

-- Content Queue (for automation)
CREATE TABLE IF NOT EXISTS content_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type VARCHAR(50) NOT NULL, -- video/post/tweet
  status VARCHAR(20) DEFAULT 'pending', -- pending/processing/done/failed
  source TEXT,
  destination TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_trading_sessions_created_at ON trading_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trading_sessions_status ON trading_sessions(status);
CREATE INDEX IF NOT EXISTS idx_kai_memory_category ON kai_memory(category);
CREATE INDEX IF NOT EXISTS idx_content_queue_status ON content_queue(status);

-- Enable Row Level Security (optional, for security)
ALTER TABLE trading_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (KAI)
CREATE POLICY "Service role can do everything on trading_sessions" 
  ON trading_sessions FOR ALL 
  TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can do everything on kai_memory" 
  ON kai_memory FOR ALL 
  TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can do everything on content_queue" 
  ON content_queue FOR ALL 
  TO service_role USING (true) WITH CHECK (true);

-- Insert initial KAI memory
INSERT INTO kai_memory (category, key, value, metadata) VALUES
  ('system', 'version', '1.0.0', '{"created": "2026-05-03"}'),
  ('system', 'status', 'operational', '{"ram_limit": "2GB"}'),
  ('trading', 'focus_pairs', '["EURUSD", "GBPUSD", "BTCUSD", "ETHUSD"]', '{"market": "forex+crypto"}'),
  ('content', 'ugmovies_status', 'development', '{"payment": "marzpay_pending"}');
