-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Content policies
CREATE POLICY "Anyone can view content" ON content
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert content" ON content
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update content" ON content
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete content" ON content
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- MCQ questions policies
CREATE POLICY "Anyone can view MCQ questions" ON mcq_questions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert MCQ questions" ON mcq_questions
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update MCQ questions" ON mcq_questions
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete MCQ questions" ON mcq_questions
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Test results policies
CREATE POLICY "Users can view their own test results" ON test_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results" ON test_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all test results" ON test_results
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

-- Notifications policies
CREATE POLICY "Anyone can view notifications" ON notifications
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert notifications" ON notifications
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update notifications" ON notifications
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete notifications" ON notifications
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- User notifications policies
CREATE POLICY "Users can view their own notifications" ON user_notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notifications" ON user_notifications
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON user_notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Recently viewed policies
CREATE POLICY "Users can view their own recently viewed" ON recently_viewed
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recently viewed" ON recently_viewed
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recently viewed" ON recently_viewed
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recently viewed" ON recently_viewed
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Downloads policies
CREATE POLICY "Users can view their own downloads" ON downloads
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own downloads" ON downloads
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Storage policies for content files
CREATE POLICY "Anyone can view content files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'app-8vqzns7lohkx_content_files');

CREATE POLICY "Admins can upload content files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'app-8vqzns7lohkx_content_files' AND is_admin(auth.uid())
  );

CREATE POLICY "Admins can update content files" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'app-8vqzns7lohkx_content_files' AND is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete content files" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'app-8vqzns7lohkx_content_files' AND is_admin(auth.uid())
  );

-- Storage policies for profile images
CREATE POLICY "Anyone can view profile images" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'app-8vqzns7lohkx_profile_images');

CREATE POLICY "Users can upload their own profile images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'app-8vqzns7lohkx_profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own profile images" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'app-8vqzns7lohkx_profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own profile images" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'app-8vqzns7lohkx_profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );