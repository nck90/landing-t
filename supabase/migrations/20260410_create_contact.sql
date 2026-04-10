CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  company TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_anon_insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_read" ON contact_submissions FOR SELECT USING (true);
