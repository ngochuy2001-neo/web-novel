import Link from "next/link";
import { NovelCard, type NovelCardProps } from "./NovelCard";

export type NovelGridSectionProps = {
  title: string;
  href: string;
  items: NovelCardProps[];
};

export function NovelGridSection({ title, href, items }: NovelGridSectionProps) {
  return (
    <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-950">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-sm font-black text-white shadow-sm">
            N
          </span>
          {title}
        </h2>

        <Link
          href={href}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full border border-black/8 bg-white px-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-black/4"
        >
          Xem thêm
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.slice(0, 8).map((novel) => (
          <NovelCard key={`${novel.title}-${novel.coverSrc}`} {...novel} />
        ))}
      </div>
    </section>
  );
}

