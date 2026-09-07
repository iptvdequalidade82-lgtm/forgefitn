import { toast } from "sonner";

export function baixarArquivo(url: string, nomeSugerido?: string) {
  if (!url) {
    toast.error("Arquivo indisponível", {
      description: "Este conteúdo ainda não possui arquivo para download.",
    });
    return;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeSugerido ?? "";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function baixarJson(dados: unknown, nomeArquivo: string) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
