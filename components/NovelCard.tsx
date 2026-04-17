import Image from "next/image";
import Link from "next/link";

export type NovelCardProps = {
  coverSrc: string;
  title: string;
  latestChapter: string;
  updatedAgoLabel: string;
  href?: string;
};

export function NovelCard({
  coverSrc,
  title,
  latestChapter,
  updatedAgoLabel,
  href,
}: NovelCardProps) {
  const content = (
    <article className="group w-full cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/8 bg-zinc-100">
        <div className="relative aspect-2/3 w-full">
          <Image
            src={coverSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
          />

          <div className="absolute inset-x-0 top-0 h-[10%] px-3 flex items-center">
            <span className="inline-flex items-center rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {updatedAgoLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-center">
        <div className="line-clamp-1 text-sm font-bold text-zinc-950">
          {title}
        </div>
        <div className="line-clamp-1 text-sm text-zinc-600">{latestChapter}</div>
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={`Xem chi tiết truyện ${title}`}>
      {content}
    </Link>
  );
}

