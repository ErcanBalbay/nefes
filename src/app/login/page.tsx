"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

function translateError(message: string): string {
  if (message.includes("Invalid login credentials")) return "E-posta veya şifre hatalı.";
  if (message.includes("already registered")) return "Bu e-posta ile zaten bir hesap var.";
  if (message.includes("Password should be at least")) return "Şifre en az 6 karakter olmalı.";
  return "Bir şeyler ters gitti, tekrar dener misin?";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth" ? "Giriş başarısız, tekrar dene." : null
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const supabase = createClient();

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);
      if (error) {
        setError(translateError(error.message));
        return;
      }
      router.push("/");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setIsLoading(false);
      if (error) {
        setError(translateError(error.message));
        return;
      }
      router.push("/auth/confirm-email");
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background-elevated p-6">
        <h1 className="text-xl font-semibold">
          {mode === "signin" ? "Giriş Yap" : "Hesap Oluştur"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Nefes egzersizlerine devam etmek için giriş yap.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-background disabled:opacity-60"
          >
            {isLoading ? "Bekleyin..." : mode === "signin" ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-border" />
          veya
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full rounded-full border border-border px-4 py-2.5 text-sm font-medium hover:border-accent"
        >
          Google ile Giriş Yap
        </button>

        <button
          onClick={() => {
            setError(null);
            setMode((m) => (m === "signin" ? "signup" : "signin"));
          }}
          className="mt-5 w-full text-center text-sm text-muted hover:text-foreground"
        >
          {mode === "signin"
            ? "Hesabın yok mu? Kayıt ol"
            : "Zaten hesabın var mı? Giriş yap"}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
