-- Enable RLS on the trades table
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Add user_id column to trades table
ALTER TABLE trades ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create a policy that allows users to see only their own trades
CREATE POLICY "Users can view own trades" ON trades FOR SELECT
  USING (auth.uid() = user_id);

-- Create a policy that allows users to insert their own trades
CREATE POLICY "Users can insert own trades" ON trades FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to update their own trades
CREATE POLICY "Users can update own trades" ON trades FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to delete their own trades
CREATE POLICY "Users can delete own trades" ON trades FOR DELETE
  USING (auth.uid() = user_id);

-- Allow authenticated users to use the storage bucket
CREATE POLICY "Authenticated users can use storage" ON storage.objects
  FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions to authenticated users
GRANT ALL ON trades TO authenticated;
GRANT ALL ON storage.objects TO authenticated;

-- Revoke permissions from public (anonymous) users
REVOKE ALL ON trades FROM anon;
REVOKE ALL ON storage.objects FROM anon;