"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ReaderTheme = "light" | "dark" | "book";

type ReaderContentProps = {
  novelTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  paragraphs: string[];
  backHref: string;
};

const THEME_LABELS: Record<ReaderTheme, string> = {
  light: "Light",
  dark: "Dark",
  book: "Old Book",
};

function ThemeMenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  );
}

function ChapterNavigator({
  chapterNumber,
  chapterTitle,
  themeClasses,
}: {
  chapterNumber: number;
  chapterTitle: string;
  themeClasses: {
    text: string;
    meta: string;
  };
}) {
  const chapterOptions = Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    return {
      number,
      label: number === chapterNumber ? `${number} - ${chapterTitle}` : `Chương ${number}`,
    };
  });

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3">
      <button
        type="button"
        aria-label="Chương trước"
        className={[
          "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-semibold sm:w-auto sm:px-4",
          "bg-red-600 text-white shadow-sm transition-colors hover:bg-red-500",
        ].join(" ")}
      >
        <span className="sm:hidden" aria-hidden>
          ←
        </span>
        <span className="hidden sm:inline">← Chương trước</span>
      </button>

      <div className="min-w-0 flex-1">
        <select
          defaultValue={chapterNumber}
          className={`h-10 w-full min-w-0 cursor-pointer rounded-xl border border-black/10 bg-transparent px-2 text-sm font-medium outline-none sm:px-3 ${themeClasses.text}`}
        >
          {chapterOptions.map((item) => (
            <option key={item.number} value={item.number}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        aria-label="Chương sau"
        className={[
          "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-semibold sm:w-auto sm:px-4",
          "bg-red-600 text-white shadow-sm transition-colors hover:bg-red-500",
        ].join(" ")}
      >
        <span className="sm:hidden" aria-hidden>
          →
        </span>
        <span className="hidden sm:inline">Chương sau →</span>
      </button>
    </div>
  );
}

export function ReaderContent({
  novelTitle,
  chapterNumber,
  chapterTitle,
  paragraphs,
  backHref,
}: ReaderContentProps) {
  const [theme, setTheme] = useState<ReaderTheme>("light");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeFabRef = useRef<HTMLDivElement>(null);

  const themeClasses = useMemo(() => {
    switch (theme) {
      case "dark":
        return {
          page: "bg-zinc-950 text-zinc-100",
          card: "border-zinc-800 bg-zinc-900",
          text: "text-zinc-100",
          meta: "text-zinc-400",
          paragraph: "text-zinc-200",
          fabTriggerIdle:
            "opacity-60 hover:opacity-100 border-zinc-600 bg-zinc-950 text-zinc-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/8 hover:border-zinc-500 hover:bg-zinc-900 hover:text-zinc-100",
          fabTriggerOpen:
            "opacity-100 border-red-500 bg-zinc-800 text-zinc-100 shadow-lg shadow-black/40 ring-2 ring-red-500/25 ring-offset-2 ring-offset-zinc-950",
          themeChipInactive: "border-zinc-600 text-zinc-300 hover:bg-zinc-800",
          themePanelFrame: "ring-white/12",
        };
      case "book":
        return {
          page: "bg-amber-100/80 text-amber-950",
          card: "border-amber-300 bg-amber-50",
          text: "text-amber-950",
          meta: "text-amber-700",
          paragraph: "text-amber-900",
          fabTriggerIdle:
            "opacity-60 hover:opacity-100 border-amber-600 bg-amber-100/95 text-amber-950 shadow-[inset_0_1px_3px_rgba(120,53,15,0.12)] ring-1 ring-inset ring-amber-50/90 hover:border-amber-700 hover:bg-amber-100",
          fabTriggerOpen:
            "opacity-100 border-red-500 bg-amber-50 text-amber-950 shadow-md ring-2 ring-red-500/25 ring-offset-2 ring-offset-amber-100/80",
          themeChipInactive: "border-amber-400/60 text-amber-900 hover:bg-amber-200/60",
          themePanelFrame: "ring-amber-900/10",
        };
      default:
        return {
          page: "bg-zinc-50 text-zinc-950",
          card: "border-black/8 bg-white",
          text: "text-zinc-950",
          meta: "text-zinc-500",
          paragraph: "text-zinc-800",
          fabTriggerIdle:
            "opacity-60 hover:opacity-100 border-zinc-400 bg-zinc-100 text-zinc-700 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-white/90 hover:border-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
          fabTriggerOpen:
            "opacity-100 border-red-500 bg-white text-zinc-900 shadow-md ring-2 ring-red-500/20 ring-offset-2 ring-offset-zinc-50",
          themeChipInactive: "border-black/15 text-zinc-700 hover:bg-black/[0.06]",
          themePanelFrame: "ring-black/[0.08]",
        };
    }
  }, [theme]);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (themeFabRef.current && !themeFabRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setThemeMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [themeMenuOpen]);

  return (
    <main className={`min-h-[calc(100vh-64px)] transition-colors ${themeClasses.page}`}>
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <Link href={backHref} className={`text-sm font-medium hover:underline ${themeClasses.meta}`}>
          ← Quay lại trang truyện
        </Link>

        <article className={`mt-4 rounded-3xl border p-6 sm:p-8 ${themeClasses.card}`}>
          <p className={`text-sm ${themeClasses.meta}`}>{novelTitle}</p>
          <h1 className={`mt-2 text-3xl font-bold ${themeClasses.text}`}>
            Chương {chapterNumber}: {chapterTitle}
          </h1>

          <div className="mt-6">
            <ChapterNavigator
              chapterNumber={chapterNumber}
              chapterTitle={chapterTitle}
              themeClasses={themeClasses}
            />
          </div>

          <div className="mt-8 space-y-5 text-lg leading-9">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={themeClasses.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <ChapterNavigator
              chapterNumber={chapterNumber}
              chapterTitle={chapterTitle}
              themeClasses={themeClasses}
            />
          </div>
        </article>
      </div>

      <div ref={themeFabRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {themeMenuOpen ? (
          <div
            id="reader-theme-panel"
            role="region"
            aria-label="Chọn giao diện đọc"
            className={`min-w-[220px] rounded-2xl border-2 p-3 shadow-lg ring-1 backdrop-blur-sm transition-opacity ${themeClasses.card} ${themeClasses.themePanelFrame} opacity-100`}
          >
            <div className={`mb-2 text-xs font-semibold uppercase tracking-wide ${themeClasses.meta}`}>
              Giao diện
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(THEME_LABELS) as ReaderTheme[]).map((mode) => {
                const active = mode === theme;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setTheme(mode);
                      setThemeMenuOpen(false);
                    }}
                    className={[
                      "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-red-500 bg-red-500 text-white"
                        : themeClasses.themeChipInactive,
                    ].join(" ")}
                  >
                    {THEME_LABELS[mode]}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          aria-expanded={themeMenuOpen}
          aria-controls={themeMenuOpen ? "reader-theme-panel" : undefined}
          aria-label={themeMenuOpen ? "Đóng chọn giao diện" : "Mở chọn giao diện"}
          onClick={() => setThemeMenuOpen((open) => !open)}
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
            themeMenuOpen ? themeClasses.fabTriggerOpen : themeClasses.fabTriggerIdle,
          ].join(" ")}
        >
          <ThemeMenuIcon className="h-5 w-5" />
        </button>
      </div>
    </main>
  );
}
