import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Gift,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/forge/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/obrigado-oferta")({
  head: () => ({
    meta: [
      { title: "Obrigado — Oferta Especial | FORGEFIT" },
      {
        name: "description",
        content: "Página exclusiva de confirmação de compra e ofertas complementares FORGEFIT.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
  component: ObrigadoOferta,
});

const passos = [
  {
    icone: CheckCircle2,
    titulo: "Compra concluída",
    descricao: "Seu pedido principal foi registrado com sucesso.",
  },
  {
    icone: MailCheck,
    titulo: "Confira seu e-mail",
    descricao: "As orientações de acesso serão enviadas para o endereço informado na compra.",
  },
  {
    icone: LockKeyhole,
    titulo: "Acesso protegido",
    descricao: "Use sempre os dados cadastrados no momento do pagamento.",
  },
] as const;

const beneficiosOferta = [
  "Complementa o conteúdo que você acabou de adquirir",
  "Experiência digital simples e organizada",
  "Condição reservada para clientes FORGEFIT",
] as const;

const proximasOfertas = [
  {
    icone: Gift,
    titulo: "Conteúdo complementar",
    descricao:
      "Um espaço preparado para adicionar outro produto que amplie a experiência do cliente.",
  },
  {
    icone: Sparkles,
    titulo: "Experiência premium",
    descricao: "Uma opção para apresentar futuramente uma solução mais completa e de maior valor.",
  },
] as const;

function ObrigadoOferta() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-72 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link to="/" aria-label="Ir para a área de conteúdo FORGEFIT">
            <Logo compact />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <BadgeCheck className="h-4 w-4" /> Compra confirmada
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-10 lg:pb-16">
        <section className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <CheckCircle2 className="h-4 w-4" /> Pedido concluído
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
              Obrigado pela <span className="text-primary">sua compra.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seu pedido foi concluído. Antes de acessar o conteúdo, preparamos este espaço para
              apresentar oportunidades exclusivas que podem complementar sua jornada.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/">
                  Ir para meu conteúdo <ArrowRight />
                </Link>
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-[240px]">
                Nenhuma cobrança adicional acontece sem a sua confirmação.
              </p>
            </div>
          </div>

          <aside className="card-surface overflow-hidden" aria-label="Próximos passos">
            <div className="border-b border-border bg-primary/10 px-5 py-4">
              <p className="font-display text-lg font-semibold uppercase tracking-wide text-primary">
                O que acontece agora
              </p>
            </div>
            <ol className="divide-y divide-border">
              {passos.map((passo, index) => {
                const Icone = passo.icone;
                return (
                  <li key={passo.titulo} className="flex gap-4 p-5">
                    <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-elevated text-primary">
                      <Icone className="h-5 w-5" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold uppercase leading-none">
                        {passo.titulo}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {passo.descricao}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </section>

        <section className="border-t border-border py-10 sm:py-14" aria-labelledby="ofertas-titulo">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-4 w-4" /> Exclusivo para clientes
            </span>
            <h2
              id="ofertas-titulo"
              className="mt-3 font-display text-4xl font-bold uppercase leading-none sm:text-5xl"
            >
              Continue evoluindo com a FORGEFIT
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Esta área está pronta para receber produtos complementares, ofertas premium e
              condições especiais após a compra principal.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
            <article className="card-surface relative overflow-hidden border-primary/25 p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/10 blur-3xl"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-md bg-accent px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-accent-foreground">
                  Oferta principal
                </span>
                <h3 className="mt-5 max-w-xl font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  Uma próxima etapa pensada para você
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Este bloco receberá a oferta em destaque, com nome do produto, apresentação,
                  benefícios, condição especial e o botão para o checkout.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {beneficiosOferta.map((beneficio) => (
                    <li key={beneficio} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {beneficio}
                    </li>
                  ))}
                </ul>

                <Button disabled size="lg" className="mt-7 h-12 w-full px-6 text-base sm:w-auto">
                  Oferta em preparação
                </Button>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {proximasOfertas.map((oferta) => {
                const Icone = oferta.icone;
                return (
                  <article key={oferta.titulo} className="card-surface flex flex-col p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-elevated text-primary">
                      <Icone className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold uppercase leading-none">
                      {oferta.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {oferta.descricao}
                    </p>
                    <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Espaço reservado
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="card-surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold uppercase">Ambiente seguro</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Você poderá analisar qualquer oferta com calma. Só haverá nova compra quando você
                escolher continuar e confirmar o pagamento.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full shrink-0 sm:w-auto">
            <Link to="/">Acessar conteúdo</Link>
          </Button>
        </section>
      </main>

      <footer className="relative z-10 mt-10 border-t border-border py-6 text-center text-xs text-muted-foreground">
        FORGEFIT — Área exclusiva pós-compra
      </footer>
    </div>
  );
}
