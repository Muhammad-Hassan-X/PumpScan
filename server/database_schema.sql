-- PumpScan Supabase Database Schema

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tokens Table
CREATE TABLE IF NOT EXISTS public.tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT UNIQUE NOT NULL,
  chain_id TEXT NOT NULL,
  name TEXT,
  symbol TEXT,
  image TEXT,
  market_cap NUMERIC,
  liquidity NUMERIC,
  price NUMERIC,
  price_change_24h NUMERIC,
  risk_score NUMERIC,
  risk_label TEXT,
  risk_reasons JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES public.tokens(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token_id) -- Prevent duplicate entries for the same token by the same user
);

-- 4. Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES public.tokens(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL, -- 'PRICE_UP', 'PRICE_DOWN', 'RISK_CHANGED'
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. History Table (already referenced by code)
CREATE TABLE IF NOT EXISTS public.history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_id UUID REFERENCES public.tokens(id) ON DELETE CASCADE NOT NULL,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can read their own profile, Auth system can insert
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Tokens: Anyone can read tokens (public data), Backend can write (no service key policy needed here if using service_role key, or add an insert policy if needed)
CREATE POLICY "Tokens are public" ON public.tokens FOR SELECT USING (true);

-- Wishlist: Users can only see and manage their own wishlist
CREATE POLICY "Users can manage own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Alerts: Users can only see and manage their own alerts
CREATE POLICY "Users can manage own alerts" ON public.alerts FOR ALL USING (auth.uid() = user_id);

-- History: Users can only see their own search history
CREATE POLICY "Users can manage own history" ON public.history FOR ALL USING (auth.uid() = user_id);
