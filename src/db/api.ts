import { supabase } from './supabase';
import type {
  Profile,
  Content,
  MCQQuestion,
  TestResult,
  Notification,
  UserNotification,
  RecentlyViewed,
  Download,
  ContentFilter,
  TestConfig,
} from '@/types/types';

// ============ Profile APIs ============

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data as Profile | null;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as Profile;
}

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) throw error;
}

// ============ Content APIs ============

export async function getContent(filter: ContentFilter = {}) {
  let query = supabase.from('content').select('*');
  
  if (filter.category) query = query.eq('category', filter.category);
  if (filter.class) query = query.eq('class', filter.class);
  if (filter.subject) query = query.eq('subject', filter.subject);
  if (filter.chapter) query = query.eq('chapter', filter.chapter);
  if (filter.search) query = query.ilike('title', `%${filter.search}%`);
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getContentById(id: string) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) throw error;
  return data as Content | null;
}

export async function createContent(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('content')
    .insert(content)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as Content;
}

export async function updateContent(id: string, updates: Partial<Content>) {
  const { data, error } = await supabase
    .from('content')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as Content;
}

export async function deleteContent(id: string) {
  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function getSubjects(category: string, classNum: number) {
  const { data, error } = await supabase
    .from('content')
    .select('subject')
    .eq('category', category)
    .eq('class', classNum);
  
  if (error) throw error;
  const subjects = Array.isArray(data) ? [...new Set(data.map(item => item.subject))] : [];
  return subjects;
}

export async function getChapters(category: string, classNum: number, subject: string) {
  const { data, error } = await supabase
    .from('content')
    .select('chapter')
    .eq('category', category)
    .eq('class', classNum)
    .eq('subject', subject);
  
  if (error) throw error;
  const chapters = Array.isArray(data) ? [...new Set(data.map(item => item.chapter))] : [];
  return chapters;
}

// ============ MCQ APIs ============

export async function getMCQQuestions(config: Partial<TestConfig> & { category: string; class: number; limit?: number }) {
  let query = supabase
    .from('mcq_questions')
    .select('*')
    .eq('category', config.category)
    .eq('class', config.class);
  
  if (config.subject) query = query.eq('subject', config.subject);
  if (config.chapter) query = query.eq('chapter', config.chapter);
  if (config.difficulty) query = query.eq('difficulty', config.difficulty);
  
  const limit = config.limit || config.questionCount || 10;
  const { data, error } = await query.limit(limit);
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function createMCQQuestion(question: Omit<MCQQuestion, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('mcq_questions')
    .insert(question)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as MCQQuestion;
}

export async function updateMCQQuestion(id: string, updates: Partial<MCQQuestion>) {
  const { data, error } = await supabase
    .from('mcq_questions')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as MCQQuestion;
}

export async function deleteMCQQuestion(id: string) {
  const { error } = await supabase
    .from('mcq_questions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============ Test Results APIs ============

export async function saveTestResult(result: Omit<TestResult, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('test_results')
    .insert(result)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as TestResult;
}

export async function getUserTestResults(userId: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getTestHistory(userId: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getAllTestResults() {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// ============ Notifications APIs ============

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .maybeSingle();
  
  if (error) throw error;
  return data as Notification;
}

export async function getNotifications() {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from('user_notifications')
    .select('*, notification:notifications(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function markNotificationAsRead(userId: string, notificationId: string) {
  const { error } = await supabase
    .from('user_notifications')
    .upsert({
      user_id: userId,
      notification_id: notificationId,
      read: true,
    });
  
  if (error) throw error;
}

// ============ Recently Viewed APIs ============

export async function addRecentlyViewed(userId: string, contentId: string) {
  const { error } = await supabase
    .from('recently_viewed')
    .upsert({
      user_id: userId,
      content_id: contentId,
      viewed_at: new Date().toISOString(),
    });
  
  if (error) throw error;
}

export async function getRecentlyViewed(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('recently_viewed')
    .select('*, content:content!recently_viewed_content_id_fkey(*)')
    .eq('user_id', userId)
    .order('viewed_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// ============ Downloads APIs ============

export async function addDownload(userId: string, contentId: string) {
  const { error } = await supabase
    .from('downloads')
    .insert({
      user_id: userId,
      content_id: contentId,
    });
  
  if (error) throw error;
}

export async function getRecentDownloads(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('downloads')
    .select('*, content:content!downloads_content_id_fkey(*)')
    .eq('user_id', userId)
    .order('downloaded_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// ============ Storage APIs ============

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
    });
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) throw error;
}

export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}
