import { defineStore } from "pinia";
import * as mailApi from "../services/mailApi";
import type { MailView, Thread, ScreenerItem, ThreadAction } from "../services/mailApi";

export const useMail = defineStore("mail", {
  state: () => ({
    view: "imbox" as MailView,
    threads: [] as Thread[],
    current: null as Thread | null,
    screener: [] as ScreenerItem[],
    loading: false,
    error: "",
    aiSummary: "",
    paletteOpen: false,
    screenerOpen: false,
  }),
  getters: {
    replyLaterCount: (s) => s.threads.filter((t) => t.replyLaterAt).length,
    unreadCount: (s) => s.threads.filter((t) => t.unread).length,
  },
  actions: {
    async load(view?: MailView) {
      if (view) this.view = view;
      this.loading = true;
      this.error = "";
      try {
        this.threads = await mailApi.listThreads(this.view);
        if (this.threads.length) await this.select(this.threads[0].id);
        else this.current = null;
      } catch (e: any) {
        this.error = e?.message ?? "failed to load mail";
      } finally {
        this.loading = false;
      }
    },
    async select(id: string) {
      try {
        this.current = await mailApi.getThread(id);
        const t = this.threads.find((x) => x.id === id);
        if (t) t.unread = false;
        this.aiSummary = "";
        mailApi.aiSummary(id).then((s) => { if (this.current?.id === id) this.aiSummary = s; }).catch(() => {});
      } catch (e: any) {
        this.error = e?.message ?? "failed to open thread";
      }
    },
    selectRelative(delta: number) {
      if (!this.threads.length) return;
      const idx = Math.max(0, this.threads.findIndex((t) => t.id === this.current?.id));
      const next = this.threads[Math.min(this.threads.length - 1, Math.max(0, idx + delta))];
      if (next) void this.select(next.id);
    },
    async act(action: ThreadAction, opts?: { until?: string }) {
      const id = this.current?.id;
      if (!id) return;
      try {
        await mailApi.threadAction(id, action, opts);
        if (action === "done" || action === "setAside") {
          this.threads = this.threads.filter((t) => t.id !== id);
          await (this.threads.length ? this.select(this.threads[0].id) : (this.current = null, Promise.resolve()));
        } else if (action === "replyLater") {
          const t = this.threads.find((x) => x.id === id);
          if (t) t.replyLaterAt = opts?.until ?? "later";
        }
      } catch (e: any) {
        this.error = e?.message ?? "action failed";
      }
    },
    async loadScreener() {
      try { this.screener = await mailApi.listScreener(); } catch (e: any) { this.error = e?.message ?? "screener failed"; }
    },
    async screen(id: string, decision: "approve" | "deny") {
      try {
        await mailApi.screenerDecision(id, decision);
        this.screener = this.screener.filter((s) => s.id !== id);
      } catch (e: any) { this.error = e?.message ?? "screener action failed"; }
    },
  },
});
