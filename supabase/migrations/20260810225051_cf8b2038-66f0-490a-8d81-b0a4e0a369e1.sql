-- ============ enums ============
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'member');

CREATE TYPE public.claim_status AS ENUM (
  'submitted', 'under_review', 'evidence_requested',
  'filed', 'negotiation', 'approved', 'disbursed', 'declined'
);

CREATE TYPE public.loss_type AS ENUM (
  'unauthorized_transaction', 'merchant_dispute', 'wire_fraud',
  'card_chargeback', 'investment_loss', 'duplicate_charge',
  'subscription_billing', 'other'
);

-- ============ shared helpers ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ profiles ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  middle_name TEXT,
  username TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  country TEXT,
  currency TEXT DEFAULT 'USD',
  account_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ user_roles ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','staff')
  );
$$;

CREATE POLICY "read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "staff read all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "staff read profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, middle_name, username, email, phone, country, currency, account_type)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'middle_name',
    NEW.raw_user_meta_data ->> 'username',
    NEW.email,
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'country',
    COALESCE(NEW.raw_user_meta_data ->> 'currency', 'USD'),
    NEW.raw_user_meta_data ->> 'account_type'
  )
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'member')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ claims ============
CREATE SEQUENCE public.claim_reference_seq START 104217;

CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT ('RB-' || to_char(nextval('public.claim_reference_seq'), 'FM000000')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  claimant_name TEXT NOT NULL,
  claimant_email TEXT NOT NULL,
  claimant_phone TEXT,
  country TEXT,
  loss_type public.loss_type NOT NULL DEFAULT 'other',
  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  incident_date DATE,
  counterparty TEXT,
  description TEXT,
  status public.claim_status NOT NULL DEFAULT 'submitted',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recovered_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.claims TO authenticated;
GRANT INSERT ON public.claims TO anon;
GRANT ALL ON public.claims TO service_role;
GRANT USAGE ON SEQUENCE public.claim_reference_seq TO anon, authenticated, service_role;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER claims_updated_at BEFORE UPDATE ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "anyone can submit a claim" ON public.claims
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "read own claims" ON public.claims
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "staff read all claims" ON public.claims
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update claims" ON public.claims
  FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "admins delete claims" ON public.claims
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============ claim_events ============
CREATE TABLE public.claim_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  status public.claim_status,
  title TEXT NOT NULL,
  note TEXT,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.claim_events TO authenticated;
GRANT ALL ON public.claim_events TO service_role;
ALTER TABLE public.claim_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own claim timeline" ON public.claim_events
  FOR SELECT TO authenticated
  USING (is_internal = false AND EXISTS (
    SELECT 1 FROM public.claims c WHERE c.id = claim_id AND c.user_id = auth.uid()
  ));
CREATE POLICY "staff read all events" ON public.claim_events
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff write events" ON public.claim_events
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.log_claim_created()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.claim_events (claim_id, status, title, note)
  VALUES (NEW.id, 'submitted', 'Claim submitted',
          'We have received your claim and opened a recovery file.');
  RETURN NEW;
END; $$;
CREATE TRIGGER claims_log_created AFTER INSERT ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.log_claim_created();

CREATE OR REPLACE FUNCTION public.log_claim_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.claim_events (claim_id, status, title, actor_id)
    VALUES (NEW.id, NEW.status, 'Status changed to ' || replace(NEW.status::text, '_', ' '), auth.uid());
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER claims_log_status AFTER UPDATE ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.log_claim_status_change();

-- ============ claim_documents ============
CREATE TABLE public.claim_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.claim_documents TO authenticated;
GRANT ALL ON public.claim_documents TO service_role;
ALTER TABLE public.claim_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own claim documents" ON public.claim_documents
  FOR SELECT TO authenticated USING (EXISTS (
    SELECT 1 FROM public.claims c WHERE c.id = claim_id AND c.user_id = auth.uid()
  ));
CREATE POLICY "staff read documents" ON public.claim_documents
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "upload to own claim" ON public.claim_documents
  FOR INSERT TO authenticated WITH CHECK (
    uploaded_by = auth.uid() AND (
      public.is_staff(auth.uid()) OR EXISTS (
        SELECT 1 FROM public.claims c WHERE c.id = claim_id AND c.user_id = auth.uid()
      )
    )
  );
CREATE POLICY "delete own documents" ON public.claim_documents
  FOR DELETE TO authenticated
  USING (uploaded_by = auth.uid() OR public.is_staff(auth.uid()));

-- ============ claim_messages ============
CREATE TABLE public.claim_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  from_staff BOOLEAN NOT NULL DEFAULT false,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.claim_messages TO authenticated;
GRANT ALL ON public.claim_messages TO service_role;
ALTER TABLE public.claim_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own claim messages" ON public.claim_messages
  FOR SELECT TO authenticated USING (EXISTS (
    SELECT 1 FROM public.claims c WHERE c.id = claim_id AND c.user_id = auth.uid()
  ));
CREATE POLICY "staff read messages" ON public.claim_messages
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "send message on own claim" ON public.claim_messages
  FOR INSERT TO authenticated WITH CHECK (
    sender_id = auth.uid() AND (
      public.is_staff(auth.uid()) OR EXISTS (
        SELECT 1 FROM public.claims c WHERE c.id = claim_id AND c.user_id = auth.uid()
      )
    )
  );

-- ============ site_settings ============
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  grouping TEXT NOT NULL DEFAULT 'general',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "public read settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, value, label, grouping) VALUES
  ('recovered_total', '412000000', 'Total funds recovered (USD)', 'stats'),
  ('claims_resolved', '61840', 'Claims resolved', 'stats'),
  ('recovery_rate', '87', 'Recovery success rate (%)', 'stats'),
  ('avg_days', '19', 'Average days to resolution', 'stats'),
  ('rate_savings_apy', '3.75', 'High-yield savings APY (%)', 'rates'),
  ('rate_certificate_apy', '3.65', '18-month certificate APY (%)', 'rates'),
  ('rate_card_apr', '4.00', 'Credit card APR (%)', 'rates'),
  ('rate_loan_apr', '15.49', 'Standard loan APR (%)', 'rates'),
  ('support_phone', '1-800-RESTITUTE', 'Support phone', 'contact'),
  ('support_email', 'claims@restitutebanking.com', 'Support email', 'contact'),
  ('routing_number', '251480576', 'Routing number', 'contact');

-- ============ public claim tracking (reference + email) ============
CREATE OR REPLACE FUNCTION public.track_claim(_reference TEXT, _email TEXT)
RETURNS TABLE (
  reference TEXT,
  claimant_name TEXT,
  status public.claim_status,
  amount NUMERIC,
  currency TEXT,
  recovered_amount NUMERIC,
  submitted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT c.reference, c.claimant_name, c.status, c.amount, c.currency,
         c.recovered_amount, c.created_at, c.updated_at
  FROM public.claims c
  WHERE upper(trim(c.reference)) = upper(trim(_reference))
    AND lower(trim(c.claimant_email)) = lower(trim(_email))
  LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION public.track_claim(TEXT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.track_claim_timeline(_reference TEXT, _email TEXT)
RETURNS TABLE (title TEXT, note TEXT, status public.claim_status, created_at TIMESTAMPTZ)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT e.title, e.note, e.status, e.created_at
  FROM public.claim_events e
  JOIN public.claims c ON c.id = e.claim_id
  WHERE upper(trim(c.reference)) = upper(trim(_reference))
    AND lower(trim(c.claimant_email)) = lower(trim(_email))
    AND e.is_internal = false
  ORDER BY e.created_at ASC;
$$;
GRANT EXECUTE ON FUNCTION public.track_claim_timeline(TEXT, TEXT) TO anon, authenticated;

-- ============ evidence storage policies ============
CREATE POLICY "owners read own evidence" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'claim-evidence' AND (owner = auth.uid() OR public.is_staff(auth.uid())));
CREATE POLICY "authenticated upload evidence" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'claim-evidence' AND owner = auth.uid());
CREATE POLICY "owners delete own evidence" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'claim-evidence' AND (owner = auth.uid() OR public.is_staff(auth.uid())));