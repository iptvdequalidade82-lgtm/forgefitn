import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Download,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/forge/Logo";
import { Button } from "@/components/ui/button";

const LINK_UPSELL = "https://pay.sunize.com.br/BtLpmTRc";
const LINK_DOWNSELL = "https://pay.sunize.com.br/ApQSQkKr";

export const Route = createFileRoute("/obrigado-oferta")({
  head: () => ({
    meta: [
      { title: "Obrigado — Oferta Especial | FORGEFIT" },
      {
        name: "description",
        content: "Oferta exclusiva do guia digital Gelatina Mounjaro para clientes FORGEFIT.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
  component: ObrigadoOferta,
});

const beneficios = [
  {
    titulo: "Guia digital",
    descricao: "Material organizado para acessar e acompanhar com facilidade.",
  },
  {
    titulo: "Acesso simples",
    descricao: "Receba as orientações de acesso após a confirmação da compra.",
  },
  {
    titulo: "Pagamento único",
    descricao: "Sem mensalidade ou cobrança recorrente para acessar o conteúdo.",
  },
] as const;

function ObrigadoOferta() {
  const [mostrarDownsell, setMostrarDownsell] = useState(false);

  function abrirDownsell() {
    setMostrarDownsell(true);
    window.requestAnimationFrame(() => {
      document.getElementById("oferta-atual")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

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
          <Logo compact />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <BadgeCheck className="h-4 w-4" /> Compra confirmada
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-10 lg:pb-16">
        <section className="py-9 text-center sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <CheckCircle2 className="h-4 w-4" /> Pedido principal concluído
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-none tracking-wide sm:text-5xl lg:text-6xl">
            Obrigado pela sua compra
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Antes de acessar seu conteúdo, uma condição exclusiva foi liberada para você.
          </p>
        </section>

        <section aria-live="polite">
          <article className="card-surface grid overflow-hidden border-primary/25 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)]">
            <div className="relative flex items-center justify-center bg-[#3f006d] p-4 sm:p-7 lg:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,white_14%,transparent),transparent_55%)]"
              />
              <img
                src="/images/gelatina-mounjaro.webp"
                alt="Capa do Guia Definitivo Gelatina Mounjaro"
                width={555}
                height={666}
                fetchPriority="high"
                className="relative w-full max-w-[420px] rounded-xl shadow-2xl shadow-black/35"
              />
            </div>

            <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              />
              <div className="relative">
                <span
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                    mostrarDownsell
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary/15 text-primary"
                  }`}
                >
                  {mostrarDownsell ? (
                    <>
                      <Sparkles className="h-4 w-4" /> Última oportunidade
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="h-4 w-4" /> Oferta exclusiva pós-compra
                    </>
                  )}
                </span>

                <h2
                  id="oferta-atual"
                  tabIndex={-1}
                  className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl"
                >
                  {mostrarDownsell ? (
                    <>
                      Leve o mesmo guia por uma <span className="text-primary">condição final</span>
                    </>
                  ) : (
                    <>
                      Complete sua jornada com a{" "}
                      <span className="text-primary">Gelatina Mounjaro</span>
                    </>
                  )}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {mostrarDownsell
                    ? "Esta é sua última oportunidade de adquirir o mesmo Guia Gelatina Mounjaro com uma condição reduzida exclusiva desta etapa."
                    : "Adicione agora o Guia Gelatina Mounjaro ao seu pedido e receba um material digital organizado para acompanhar de forma simples no dia a dia."}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {beneficios.map((beneficio) => (
                    <li
                      key={beneficio.titulo}
                      className="rounded-xl border border-border bg-elevated/60 p-3"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {beneficio.titulo}
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {beneficio.descricao}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/10 p-5">
                  {mostrarDownsell ? (
                    <p className="text-sm text-muted-foreground">
                      De <span className="line-through">R$ 29,90</span> por apenas:
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">Condição exclusiva:</p>
                  )}
                  <p className="mt-1 flex items-start text-primary">
                    <span className="mt-2 text-lg font-bold">R$</span>
                    <span className="font-display text-7xl font-bold leading-none">
                      {mostrarDownsell ? "15" : "29"}
                    </span>
                    <span className="mt-2 text-2xl font-bold">,90</span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Pagamento único • Sem mensalidade
                  </p>
                </div>

                <Button asChild size="lg" className="mt-5 h-14 w-full text-base sm:text-lg">
                  <a href={mostrarDownsell ? LINK_DOWNSELL : LINK_UPSELL}>
                    {mostrarDownsell ? "SIM, QUERO POR R$ 15,90" : "SIM, QUERO POR R$ 29,90"}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <LockKeyhole className="h-3.5 w-3.5 text-primary" />
                  Compra processada em ambiente seguro
                </div>

                {mostrarDownsell ? (
                  <Link
                    to="/"
                    className="mx-auto mt-5 block w-fit text-center text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Não quero aproveitar e desejo acessar meu conteúdo
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={abrirDownsell}
                    className="mx-auto mt-5 block text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Não, obrigado. Quero continuar sem esta oferta
                  </button>
                )}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="card-surface flex gap-3 p-4">
            <Download className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Produto digital</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Você receberá as informações de acesso após a confirmação do pagamento.
              </p>
            </div>
          </div>
          <div className="card-surface flex gap-3 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Compra opcional</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Seu pedido principal já está confirmado e não depende desta oferta.
              </p>
            </div>
          </div>
          <div className="card-surface flex gap-3 p-4">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">Conteúdo informativo</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Não contém tirzepatida, não é medicamento e não substitui orientação profissional.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-10 border-t border-border py-6 text-center text-xs text-muted-foreground">
        FORGEFIT — Área exclusiva pós-compra
      </footer>
    </div>
  );
}
