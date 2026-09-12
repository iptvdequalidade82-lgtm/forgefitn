import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Upload, Trash2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { criarBackup, lerBackup, useForge } from "@/lib/store";
import type { ForgeState } from "@/lib/store";
import { PageHeader } from "@/components/forge/ui-bits";
import { baixarJson } from "@/lib/download";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — FORGEFIT" },
      {
        name: "description",
        content:
          "Preferências do ForgeFit e gerenciamento dos seus dados locais: exportar, importar e limpar.",
      },
      { property: "og:title", content: "Configurações — FORGEFIT" },
      {
        property: "og:description",
        content: "Exporte, importe ou apague os dados guardados neste navegador.",
      },
    ],
  }),
  component: Configuracoes,
});

function Configuracoes() {
  const { state, setState, importar, resetar } = useForge();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [confirmar, setConfirmar] = React.useState(false);
  const [backupPendente, setBackupPendente] = React.useState<ForgeState | null>(null);

  return (
    <div className="space-y-5">
      <PageHeader titulo="Configurações" />

      <section className="card-surface flex items-start gap-3 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Seus dados ficam somente neste navegador.</strong>{" "}
          Cronograma, favoritos e progresso do desafio não são enviados para nenhum
          servidor. Se você limpar os dados do navegador, trocar de aparelho ou usar uma
          aba anônima, essas informações não aparecerão. Faça uma exportação para guardar
          um backup.
        </p>
      </section>

      <section className="card-surface p-4">
        <h2 className="mb-3 font-display text-xl font-semibold uppercase">Preferências</h2>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="reduzir-animacoes" className="text-sm">
            Reduzir animações
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
              Desativa transições e movimentos na interface.
            </span>
          </Label>
          <Switch
            id="reduzir-animacoes"
            checked={state.prefs.reduceMotion}
            onCheckedChange={(v) =>
              setState((s) => ({ ...s, prefs: { ...s.prefs, reduceMotion: v } }))
            }
          />
        </div>
      </section>

      <section className="card-surface p-4">
        <h2 className="mb-3 font-display text-xl font-semibold uppercase">Meus dados</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => {
              baixarJson(
                criarBackup(state),
                `forgefit-backup-${new Date().toISOString().slice(0, 10)}.json`,
              );
              toast.success("Backup exportado");
            }}
          >
            <Download className="h-4 w-4" /> Baixar cópia
          </Button>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-4 w-4" /> Restaurar cópia
          </Button>
          <Button
            variant="outline"
            className="gap-1.5 text-destructive"
            onClick={() => setConfirmar(true)}
          >
            <Trash2 className="h-4 w-4" /> Limpar meus dados
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="hidden"
          aria-hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            try {
              const dados = JSON.parse(await file.text());
              if (!dados || typeof dados !== "object") throw new Error("formato");
              const restaurado = lerBackup(dados);
              if (!restaurado) throw new Error("formato");
              setBackupPendente(restaurado);
            } catch {
              toast.error("Falha ao importar backup", {
                description: "Verifique se o arquivo foi exportado pelo ForgeFit.",
              });
            }
          }}
        />
      </section>

      <section className="card-surface p-4">
        <h2 className="mb-2 font-display text-xl font-semibold uppercase">Sobre</h2>
        <p className="text-sm text-muted-foreground">
          FORGEFIT — área de conteúdo para clientes. Versão 1.0 (primeira fase, sem login).
        </p>
      </section>

      <AlertDialog open={confirmar} onOpenChange={setConfirmar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar todos os seus dados?</AlertDialogTitle>
            <AlertDialogDescription>
              Cronograma, favoritos e progresso do desafio serão removidos deste navegador.
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetar();
                toast.success("Dados apagados");
              }}
            >
              Apagar tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(backupPendente)}
        onOpenChange={(aberto) => !aberto && setBackupPendente(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restaurar esta cópia?</AlertDialogTitle>
            <AlertDialogDescription>
              O cronograma, os favoritos e o progresso atuais serão substituídos. Esta ação só
              acontece depois da sua confirmação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!backupPendente || !importar(backupPendente)) {
                  toast.error("Não foi possível restaurar a cópia");
                  return;
                }
                setBackupPendente(null);
                toast.success("Cópia restaurada com sucesso");
              }}
            >
              Restaurar meus dados
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
