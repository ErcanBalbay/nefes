import type { Technique } from "@/lib/techniques";

export function GreetingBanner({
  greeting,
  recommendedTechnique,
}: {
  greeting: string;
  recommendedTechnique: Technique;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold">{greeting}</h1>
      <p className="text-sm text-muted">
        Şu an için önerimiz: <span className="text-foreground">{recommendedTechnique.name}</span>
      </p>
    </div>
  );
}
