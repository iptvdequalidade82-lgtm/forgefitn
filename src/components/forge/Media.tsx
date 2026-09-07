import * as React from "react";
import { ImageOff, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** Miniatura estática — nunca carrega GIF animado na listagem. */
export function Thumbnail({
  src,
  alt,
  className,
  fallbackIcone,
}: {
  src?: string;
  alt: string;
  className?: string;
  fallbackIcone?: React.ReactNode;
}) {
  const [erro, setErro] = React.useState(false);

  if (!src || erro) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-elevated text-muted-foreground",
          className,
        )}
        role="img"
        aria-label={`${alt} — imagem indisponível`}
      >
        {fallbackIcone ?? <ImageOff className="h-6 w-6" aria-hidden />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErro(true)}
      className={cn("object-cover", className)}
    />
  );
}

export type PlayerFonte = {
  gifUrl?: string | undefined;
  videoUrl?: string | undefined;
  thumbnailUrl?: string | undefined;
};

/**
 * Player de execução: só é montado quando o modal abre.
 * Ao desmontar, a mídia é liberada (src removido) — evita GIFs rodando em memória.
 */
export function PlayerExecucao({
  fonte,
  nome,
  pausado,
  chaveReinicio,
}: {
  fonte: PlayerFonte;
  nome: string;
  pausado: boolean;
  chaveReinicio: number;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [erro, setErro] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (pausado) v.pause();
    else void v.play().catch(() => {});
  }, [pausado, chaveReinicio]);

  React.useEffect(() => {
    return () => {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
  }, []);

  const temVideo = Boolean(fonte.videoUrl);
  const temGif = Boolean(fonte.gifUrl);

  if (erro || (!temVideo && !temGif && !fonte.thumbnailUrl)) {
    return (
      <div className="grid aspect-video w-full place-items-center rounded-xl bg-elevated text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2 px-6">
          <Play className="h-7 w-7" aria-hidden />
          <span>Mídia ainda não disponível para este item.</span>
        </div>
      </div>
    );
  }

  if (temVideo) {
    return (
      <video
        key={chaveReinicio}
        ref={videoRef}
        src={fonte.videoUrl}
        poster={fonte.thumbnailUrl || undefined}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        onError={() => setErro(true)}
        aria-label={`Execução: ${nome}`}
        className="aspect-video w-full rounded-xl bg-black object-contain"
      />
    );
  }

  if (temGif) {
    return (
      <img
        key={`${chaveReinicio}-${pausado}`}
        src={pausado && fonte.thumbnailUrl ? fonte.thumbnailUrl : fonte.gifUrl}
        alt={`Execução: ${nome}`}
        onError={() => setErro(true)}
        className="aspect-video w-full rounded-xl bg-black object-contain"
      />
    );
  }

  return (
    <img
      src={fonte.thumbnailUrl}
      alt={nome}
      onError={() => setErro(true)}
      className="aspect-video w-full rounded-xl bg-black object-contain"
    />
  );
}
