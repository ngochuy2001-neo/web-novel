"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Thể loại", href: "/the-loai" },
  { label: "Đề cử", href: "/de-cu" },
  { label: "Xem nhiều", href: "/xem-nhieu" },
  { label: "Mới cập nhật", href: "/moi-cap-nhat" },
  { label: "Mới nhất", href: "/moi-nhat" },
];

const GENRES = [
  { label: "Tiên hiệp", href: "/the-loai/tien-hiep" },
  { label: "Huyền huyễn", href: "/the-loai/huyen-huyen" },
  { label: "Kiếm hiệp", href: "/the-loai/kiem-hiep" },
  { label: "Ngôn tình", href: "/the-loai/ngon-tinh" },
  { label: "Khoa huyễn", href: "/the-loai/khoa-huyen" },
  { label: "Kinh dị", href: "/the-loai/kinh-di" },
  { label: "Trinh thám", href: "/the-loai/trinh-tham" },
  { label: "Lịch sử", href: "/the-loai/lich-su" },
  { label: "Xuyên không", href: "/the-loai/xuyen-khong" },
  { label: "Hệ thống", href: "/the-loai/he-thong" },
];

const NAV_HOVER_CLASSES = [
  "hover:bg-fuchsia-500 hover:text-white",
  "hover:bg-emerald-500 hover:text-white",
  "hover:bg-sky-500 hover:text-white",
  "hover:bg-amber-500 hover:text-white",
  "hover:bg-violet-500 hover:text-white",
  "hover:bg-rose-500 hover:text-white",
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGenreOpenMobile, setIsGenreOpenMobile] = useState(false);
  const dialogId = useId();
  const searchDialogId = useId();

  useEffect(() => {
    if (!isMenuOpen && !isSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      setIsGenreOpenMobile(false);
      setIsSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const shouldLockScroll = isMenuOpen || isSearchOpen;
    if (!shouldLockScroll) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-red-500 bg-white">
      <div className="flex h-16 w-full items-center gap-3 px-4 md:px-6">
        {/* Mobile search button (< md) */}
        <button
          type="button"
          className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-black/8 text-zinc-900 transition-colors hover:bg-black/4 md:hidden"
          aria-haspopup="dialog"
          aria-controls={searchDialogId}
          aria-expanded={isSearchOpen}
          aria-label="Mở tìm kiếm"
          onClick={() => setIsSearchOpen(true)}
        >
          <span className="text-lg leading-none">⌕</span>
        </button>

        <Link
          href="/"
          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap font-semibold text-zinc-950 md:flex-none md:justify-start"
          aria-label="Về trang chủ"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="md:hidden lg:inline">Web Novel</span>
        </Link>

        {/* Desktop nav (>= lg) */}
        <nav className="mx-auto hidden min-w-0 flex-1 items-center justify-center divide-x divide-black/10 overflow-x-auto lg:flex lg:overflow-visible">
          {NAV_ITEMS.map((item, idx) => {
            const baseClasses = [
              "inline-flex h-16 w-28 items-center justify-center whitespace-nowrap px-4 text-sm font-semibold text-zinc-800",
              "transition-colors",
              NAV_HOVER_CLASSES[idx % NAV_HOVER_CLASSES.length],
            ].join(" ");

            if (item.label !== "Thể loại") {
              return (
                <Link key={item.href} href={item.href} className={baseClasses}>
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                className="relative group after:absolute after:inset-x-0 after:top-full after:h-2"
              >
                <div className={baseClasses} aria-haspopup="menu">
                  <span>Thể loại</span>
                  <span className="ml-1 text-xs opacity-70">▾</span>
                </div>

                <div
                  role="menu"
                  className={[
                    "absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2",
                    "rounded-2xl border border-black/10 bg-white p-2 shadow-xl",
                    "pointer-events-none opacity-0",
                    "group-hover:pointer-events-auto group-hover:opacity-100",
                    "transition-opacity duration-150",
                  ].join(" ")}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {GENRES.map((g) => (
                      <Link
                        key={g.href}
                        href={g.href}
                        role="menuitem"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-black/4"
                      >
                        {g.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* iPad layout (md.. < lg): search center + menu button right */}
        <div className="hidden min-w-0 flex-1 items-center px-2 md:flex lg:hidden">
          <input
            type="search"
            placeholder="Tìm kiếm..."
            className="h-10 w-full max-w-xl rounded-lg border border-black/8 bg-transparent px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-400"
          />
        </div>

        {/* Desktop actions (>= lg) */}
        <div className="ml-auto hidden flex-none items-center gap-2 lg:flex">
          <input
            type="search"
            placeholder="Tìm kiếm..."
            className="h-10 w-64 rounded-lg border border-black/8 bg-transparent px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-400"
          />

          <Link
            href="/dang-nhap"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-black/8 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/4"
          >
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Đăng ký
          </Link>
        </div>

        {/* iPad menu button (md.. < lg) */}
        <button
          type="button"
          className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-black/8 text-zinc-900 transition-colors hover:bg-black/4 lg:hidden"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          aria-expanded={isMenuOpen}
          aria-label="Mở menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="text-xl leading-none">≡</span>
        </button>
      </div>

      {/* Mobile search overlay */}
      <div
        id={searchDialogId}
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-0 z-50 md:hidden",
          isSearchOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity",
            isSearchOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setIsSearchOpen(false)}
        />
        <div
          className={[
            "absolute left-0 top-0 w-full bg-white shadow-xl",
            "transition-transform duration-200 ease-out",
            isSearchOpen ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
        >
          <div className="flex h-16 items-center gap-2 border-b border-black/8 px-4">
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="h-10 w-full rounded-lg border border-black/8 bg-transparent px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-400"
            />
            <button
              type="button"
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-black/8 text-zinc-900 transition-colors hover:bg-black/4"
              aria-label="Đóng tìm kiếm"
              onClick={() => setIsSearchOpen(false)}
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over menu (iPad) */}
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-0 z-50 lg:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity",
            isMenuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => {
            setIsGenreOpenMobile(false);
            setIsMenuOpen(false);
          }}
        />
        <aside
          className={[
            "absolute right-0 top-0 h-full w-[320px] max-w-[85vw] bg-white shadow-xl",
            "transition-transform duration-200 ease-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-16 items-center justify-between border-b border-black/8 px-4">
            <span className="font-semibold text-zinc-950">Web Novel</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/8 text-zinc-900 transition-colors hover:bg-black/4"
              aria-label="Đóng menu"
              onClick={() => {
                setIsGenreOpenMobile(false);
                setIsMenuOpen(false);
              }}
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="p-3">
            <div className="grid gap-2">
              {NAV_ITEMS.map((item, idx) => {
                const classes = [
                  "flex h-11 items-center rounded-lg px-3 text-sm font-semibold text-zinc-800",
                  "transition-colors",
                  NAV_HOVER_CLASSES[idx % NAV_HOVER_CLASSES.length],
                ].join(" ");

                if (item.label !== "Thể loại") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setIsGenreOpenMobile(false);
                        setIsMenuOpen(false);
                      }}
                      className={[classes, "justify-center"].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.href} className="rounded-lg">
                    <button
                      type="button"
                      className={[
                        classes,
                        "relative w-full justify-center",
                      ].join(" ")}
                      aria-expanded={isGenreOpenMobile}
                      onClick={() => setIsGenreOpenMobile((v) => !v)}
                    >
                      <span>Thể loại</span>
                      <span
                        className={[
                          "absolute right-3 text-xs opacity-70 transition-transform duration-200",
                          isGenreOpenMobile ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                      >
                        ▾
                      </span>
                    </button>

                    <div
                      className={[
                        "grid grid-cols-2 gap-1 px-2",
                        "overflow-hidden transition-[max-height,opacity] duration-200 ease-out",
                        isGenreOpenMobile
                          ? "max-h-80 pb-2 opacity-100"
                          : "max-h-0 pb-0 opacity-0",
                      ].join(" ")}
                    >
                      {GENRES.map((g) => (
                        <Link
                          key={g.href}
                          href={g.href}
                          onClick={() => {
                            setIsGenreOpenMobile(false);
                            setIsMenuOpen(false);
                          }}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-black/4"
                        >
                          {g.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/dang-nhap"
                onClick={() => {
                  setIsGenreOpenMobile(false);
                  setIsMenuOpen(false);
                }}
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-black/8 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/4"
              >
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                onClick={() => {
                  setIsGenreOpenMobile(false);
                  setIsMenuOpen(false);
                }}
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-red-700 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

