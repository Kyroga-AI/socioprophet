import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GLOSSARY = {
  "evidence-fabric":
    "The record-keeping layer. Every AI action gets a tamper-proof, signed record of what happened, why, and what information it relied on — so any decision can be replayed and verified later.",
  "neurosymbolic-harness":
    "A safety wrapper around the AI that labels every answer by how it was produced — stated as fact, retrieved from your documents, inferred, or logically deduced — so you know how much to trust it.",
  "cybernetic-control-plane":
    "The traffic controller. It routes every request between your people, your data, and the AI models, enforces your rules on each one, and pauses risky actions for human approval.",
  "model-choir":
    "Multiple AI models working together instead of relying on just one. Each request goes to the model best suited for it, and models can cross-check each other's answers.",
  "hypergraph-knowledge-layer":
    "Your organisation's knowledge stored as a rich web of connections — linking many related facts at once, not just pairs — so the AI understands full context, not isolated documents.",
} as const;

export type TermKey = keyof typeof GLOSSARY;

interface TermTooltipProps {
  term: TermKey;
  children: ReactNode;
}

export function TermTooltip({ term, children }: TermTooltipProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            className="cursor-help underline decoration-dotted decoration-primary/60 underline-offset-4 hover:decoration-primary hover:text-white focus-visible:decoration-primary focus-visible:text-white focus-visible:outline-none transition-colors"
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-card text-foreground border border-primary/30 px-4 py-3 text-sm leading-relaxed shadow-xl"
        >
          {GLOSSARY[term]}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
