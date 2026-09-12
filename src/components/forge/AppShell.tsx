import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Dumbbell,
  CalendarDays,
  UtensilsCrossed,
  LayoutGrid,
  FileSpreadsheet,
  Flame,
  Download,
  Heart,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { InstallPrompt } from "./InstallPrompt";

type NavItem = { to: string; label: string; icon: LucideIcon };

export const navPrincipal: NavItem[] = [
  { to: "/", label: "Início", icon: Home },
  { to: "/planilhas", label: "Treinos", icon: FileSpreadsheet },
  { to: "/planejar", label: "Meu treino", icon: CalendarDays },
  { to: "/exercicios", label: "Execuções", icon: Dumbbell },
];

export const navSecundaria: NavItem[] = [
  { to: "/receitas", label: "Receitas", icon: UtensilsCrossed },
  { to: "/desafio", label: "Desafio 24 dias", icon: Flame },
  { to: "/downloads", label: "Downloads", icon: Download },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

function useActive() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
}

export function AppShell({ children }: { children: ReactNode }) {
  const isActive = useActive();
  const maisAtivo = navSecundaria.some((i) => isActive(i.to)) || isActive("/mais");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="no-print fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card/60 px-4 py-6 lg:flex">
        <Link to="/" className="mb-8 block px-2">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Navegação principal">
          {navPrincipal.map((item) => (
            <SideLink key={item.to} item={item} active={isActive(item.to)} />
          ))}
          <div className="my-3 h-px bg-border" />
          {navSecundaria.map((item) => (
            <SideLink key={item.to} item={item} active={isActive(item.to)} />
          ))}
        </nav>
        <InstallPrompt />
        <p className="mt-4 px-2 text-[11px] leading-relaxed text-muted-foreground">
          Seus dados ficam salvos somente neste navegador.
        </p>
      </aside>

      {/* Topo mobile */}
      <header className="no-print sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/" aria-label="Início ForgeFit">
            <Logo compact />
          </Link>
          <Link
            to="/configuracoes"
            aria-label="Configurações"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="pb-24 lg:pb-10 lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>

      {/* Bottom nav mobile */}
      <nav
        className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden"
        aria-label="Navegação inferior"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {navPrincipal.map((item) => (
            <li key={item.to}>
              <BottomLink item={item} active={isActive(item.to)} />
            </li>
          ))}
          <li>
            <BottomLink
              item={{ to: "/mais", label: "Mais", icon: LayoutGrid }}
              active={maisAtivo}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

function SideLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-elevated hover:text-foreground",
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function BottomLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex min-h-[58px] flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
