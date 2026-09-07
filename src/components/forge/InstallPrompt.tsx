import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type BIPEvent = Event & { prompt: () => Promise<void> };

export function InstallPrompt() {
  const [evt, setEvt] = React.useState<BIPEvent | null>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!evt) return null;

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={async () => {
        await evt.prompt();
        setEvt(null);
      }}
    >
      <Download className="h-4 w-4" />
      Instalar aplicativo
    </Button>
  );
}
