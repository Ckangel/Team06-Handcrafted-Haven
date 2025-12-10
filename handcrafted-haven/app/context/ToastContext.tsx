"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ToastTone = "success" | "error" | "warning" | "info";

export type ToastOptions = {
  title?: string;
  description: string;
  tone?: ToastTone;
  duration?: number;
};

export type ToastContextType = {
  showToast: (toast: ToastOptions) => void;
};

type ToastState = Required<ToastOptions> & { id: string };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toneStyles: Record<ToastTone, string> = {
  success:
    "border-emerald-400/40 bg-gradient-to-br from-emerald-900/90 via-emerald-900/80 to-emerald-800/70 text-emerald-50 shadow-emerald-900/40",
  error:
    "border-rose-400/50 bg-gradient-to-br from-rose-900/90 via-rose-900/80 to-rose-800/70 text-rose-50 shadow-rose-900/40",
  warning:
    "border-amber-400/60 bg-gradient-to-br from-amber-900/90 via-amber-900/80 to-amber-800/70 text-amber-50 shadow-amber-900/50",
  info:
    "border-sky-400/50 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/70 text-slate-50 shadow-slate-900/50",
};

import type { ReactElement } from "react";

function ToastIcon({ tone }: { tone: ToastTone }) {
  const icons: Record<ToastTone, ReactElement> = useMemo(
    () => ({
      success: (
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M15.78 6.22a.75.75 0 0 0-1.06-1.06L8.5 11.38 5.28 8.16a.75.75 0 1 0-1.06 1.06l3.75 3.75a.75.75 0 0 0 1.06 0Z"
          />
        </svg>
      ),
      error: (
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M11.06 10 14 7.06a.75.75 0 1 0-1.06-1.06L10 8.94 7.06 6a.75.75 0 0 0-1.06 1.06L8.94 10 6 12.94a.75.75 0 1 0 1.06 1.06L10 11.06l2.94 2.94a.75.75 0 0 0 1.06-1.06Z"
          />
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M10.94 2.44a1.25 1.25 0 0 0-1.88 0l-6.5 8A1.25 1.25 0 0 0 3.62 13h12.76a1.25 1.25 0 0 0 .96-2.56ZM10 6.75a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 10 6.75Zm.88 5.62a.88.88 0 1 1-1.76 0a.88.88 0 0 1 1.76 0Z"
          />
        </svg>
      ),
      info: (
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M10 3.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13Zm0 4a.88.88 0 1 1 0 1.76a.88.88 0 0 1 0-1.76Zm1.13 6H8.75a.75.75 0 0 1 0-1.5h.63v-2h-.63a.75.75 0 0 1 0-1.5h1.38c.41 0 .75.34.75.75v2.75h.25a.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      ),
    }),
    []
  );

  return icons[tone];
}

function ToastCard({ toast, onDismiss }: { toast: ToastState; onDismiss: (id: string) => void }) {
  const { id, title, description, tone, duration } = toast;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast-enter relative flex w-full max-w-md flex-col gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur transition ${toneStyles[tone]}`}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15"
          aria-hidden
        >
          <ToastIcon tone={tone} />
        </span>
        <div className="flex-1 text-sm leading-relaxed">
          {title && <p className="font-semibold tracking-tight text-white">{title}</p>}
          <p className="text-slate-50/90">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(id)}
          className="rounded-full p-1 text-slate-100/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Dismiss toast"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
            <path
              fill="currentColor"
              d="M11.06 10 14 7.06a.75.75 0 1 0-1.06-1.06L10 8.94 7.06 6a.75.75 0 0 0-1.06 1.06L8.94 10 6 12.94a.75.75 0 1 0 1.06 1.06L10 11.06l2.94 2.94a.75.75 0 0 0 1.06-1.06Z"
            />
          </svg>
        </button>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="toast-progress h-full w-full origin-left bg-white/70"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, tone = "info", duration = 3600 }: ToastOptions) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const toast: ToastState = { id, title: title ?? "", description, tone, duration };
      setToasts(prev => [...prev, toast]);

      if (typeof window !== "undefined") {
        window.setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-[420px] flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastCard toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
