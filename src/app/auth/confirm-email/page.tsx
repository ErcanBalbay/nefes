import Link from "next/link";

export default function ConfirmEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background-elevated p-6 text-center">
        <span className="text-3xl">📬</span>
        <h1 className="mt-3 text-xl font-semibold">E-postanı kontrol et</h1>
        <p className="mt-2 text-sm text-muted">
          Hesabını doğrulamak için sana gönderdiğimiz e-postadaki linke tıkla. Doğruladıktan
          sonra giriş yapabilirsin.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background"
        >
          Giriş sayfasına dön
        </Link>
      </div>
    </div>
  );
}
