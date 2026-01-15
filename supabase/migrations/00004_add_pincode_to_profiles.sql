-- Add pincode column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pincode TEXT;