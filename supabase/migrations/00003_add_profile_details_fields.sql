-- Add new fields to profiles table for student details
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS student_class TEXT,
ADD COLUMN IF NOT EXISTS school_name TEXT,
ADD COLUMN IF NOT EXISTS city TEXT;

-- Add comment for documentation
COMMENT ON COLUMN profiles.student_class IS 'Student class (8, 9, 10, 11, 12)';
COMMENT ON COLUMN profiles.school_name IS 'Name of the school student attends';
COMMENT ON COLUMN profiles.city IS 'City where student lives';