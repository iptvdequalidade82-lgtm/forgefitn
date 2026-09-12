import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { navSecundaria } from "@/components/forge/AppShell";
import { PageHeader } from "@/components/forge/ui-bits";

export const Route = createFileRoute("/mais")({
  head: () => ({
    meta: [
      { title: "Mais — FORGEFIT" },
      {
        name: "description",
        content:
          "Acesse o desafio de 24 dias, downloads, favoritos e configurações do ForgeFit.",
      },
      { property: "og:title", content: "Mais — FORGEFIT" },
      {
        property: "og:description",
        content: "Desafio, downloads, favoritos e configurações.",
      },
    ],
  }),
  component: Mais,
});

function Mais() {
  return (
    <div>
      <PageHeader titulo="Mais" descricao="Todo o restante do seu conteúdo." />
      <ul className="space-y-2">
        {navSecundaria.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-primary/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 truncate font-display text-lg font-semibold uppercase">
                  {item.label}
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
