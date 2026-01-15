-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create content category enum
CREATE TYPE public.content_category AS ENUM ('notes', 'pyq', 'important_questions', 'reference_books', 'mind_maps', 'formulas', 'mcq_tests', 'iit_jee_questions');

-- Create notification type enum
CREATE TYPE public.notification_type AS ENUM ('new_content', 'exam_reminder', 'announcement', 'system');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  profile_photo_url TEXT,
  role public.user_role NOT NULL DEFAULT 'user'::public.user_role,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create content table
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category public.content_category NOT NULL,
  class INTEGER NOT NULL CHECK (class >= 8 AND class <= 12),
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create MCQ questions table
CREATE TABLE public.mcq_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category public.content_category NOT NULL,
  class INTEGER NOT NULL CHECK (class >= 8 AND class <= 12),
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create test results table
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category public.content_category NOT NULL,
  class INTEGER NOT NULL,
  subject TEXT NOT NULL,
  chapter TEXT,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type public.notification_type NOT NULL,
  metadata JSONB,
  sent_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user notifications table (for tracking read status)
CREATE TABLE public.user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_id UUID NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, notification_id)
);

-- Create recently viewed table
CREATE TABLE public.recently_viewed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Create downloads table
CREATE TABLE public.downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_content_category ON public.content(category);
CREATE INDEX idx_content_class ON public.content(class);
CREATE INDEX idx_content_subject ON public.content(subject);
CREATE INDEX idx_mcq_category ON public.mcq_questions(category);
CREATE INDEX idx_mcq_class ON public.mcq_questions(class);
CREATE INDEX idx_mcq_subject ON public.mcq_questions(subject);
CREATE INDEX idx_test_results_user ON public.test_results(user_id);
CREATE INDEX idx_recently_viewed_user ON public.recently_viewed(user_id);
CREATE INDEX idx_downloads_user ON public.downloads(user_id);
CREATE INDEX idx_user_notifications_user ON public.user_notifications(user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('app-8vqzns7lohkx_content_files', 'app-8vqzns7lohkx_content_files', true),
  ('app-8vqzns7lohkx_profile_images', 'app-8vqzns7lohkx_profile_images', true)
ON CONFLICT (id) DO NOTHING;