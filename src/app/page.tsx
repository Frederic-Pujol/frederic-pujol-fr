import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// Force la re-execution a chaque requete pour incrementer le compteur
export const dynamic = "force-dynamic";

export default async function Home() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  // 1. Enregistrer la visite courante
  await prisma.visit.create({
    data: {
      path: "/",
      userAgent,
    },
  });

  // 2. Compter le total des visites (toutes pages confondues)
  const totalVisits = await prisma.visit.count();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 px-8 py-16 sm:items-start">
        <span className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          frederic-pujol.fr
        </span>

        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          Construction en cours.
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Fred est en train de construire ce site en mode pair-programming avec
          Claude. Stack : Next.js 15, Prisma 7, Neon (PostgreSQL serverless),
          deployee sur Vercel.
        </p>

        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Compteur de visites live
          </span>
          <span className="text-3xl font-semibold tabular-nums text-black dark:text-zinc-50">
            {totalVisits.toLocaleString("fr-FR")}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Cette visite vient d&apos;etre persistee dans Neon.
          </span>
        </div>
      </main>
    </div>
  );
}
