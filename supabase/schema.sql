create table breathing_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  technique_id text not null,
  completed_at timestamptz not null default now()
);

alter table breathing_sessions enable row level security;

create policy "Kullanıcılar kendi kayıtlarını görebilir"
  on breathing_sessions for select
  using (auth.uid() = user_id);

create policy "Kullanıcılar kendi kayıtlarını ekleyebilir"
  on breathing_sessions for insert
  with check (auth.uid() = user_id);
