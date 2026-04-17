import Link from "next/link";
import { NovelCard } from "./NovelCard";
import { buildNovelDetailPath, type Novel } from "@/lib/novels";

type NovelListPageProps = {
  title: string;
  description: string;
  novels: Novel[];
  basePath: string;
  currentPage: number;
  selectedGenre?: string;
  selectedSort?: string;
  pageSize?: number;
};

const SORT_OPTIONS = [
  { value: "pho-bien-nhat", label: "Phổ biến nhất" },
  { value: "xem-nhieu-nhat", label: "Xem nhiều nhất" },
  { value: "thich-nhieu-nhat", label: "Được thích nhiều nhất" },
  { value: "moi-cap-nhat", label: "Mới cập nhật" },
] as const;

function buildQuery(params: { page?: number; genre?: string; sort?: string }) {
  const query = new URLSearchParams();
  if (params.page && params.page > 1) query.set("page", String(params.page));
  if (params.genre && params.genre !== "tat-ca") query.set("genre", params.genre);
  if (params.sort && params.sort !== "pho-bien-nhat") query.set("sort", params.sort);
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

function createPageHref(
  basePath: string,
  page: number,
  selectedGenre?: string,
  selectedSort?: string,
) {
  return `${basePath}${buildQuery({ page, genre: selectedGenre, sort: selectedSort })}`;
}

export function NovelListPage({
  title,
  description,
  novels,
  basePath,
  currentPage,
  selectedGenre = "tat-ca",
  selectedSort = "pho-bien-nhat",
  pageSize = 8,
}: NovelListPageProps) {
  const genreOptions = [
    { value: "tat-ca", label: "Tất cả thể loại" },
    ...Array.from(new Set(novels.flatMap((novel) => novel.genres))).map((genre) => ({
      value: genre,
      label: genre,
    })),
  ];

  const filteredNovels =
    selectedGenre === "tat-ca"
      ? novels
      : novels.filter((novel) => novel.genres.includes(selectedGenre));

  const sortedNovels = filteredNovels.slice().sort((a, b) => {
    if (selectedSort === "xem-nhieu-nhat") return b.id - a.id;
    if (selectedSort === "thich-nhieu-nhat") return b.chapters.length - a.chapters.length;
    if (selectedSort === "moi-cap-nhat") return a.updatedAgoLabel.localeCompare(b.updatedAgoLabel);
    return b.id - a.id;
  });

  const totalPages = Math.max(1, Math.ceil(sortedNovels.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = sortedNovels.slice(start, end);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-zinc-950">{title}</h1>
        <p className="mt-2 text-sm text-zinc-600">{description}</p>

        <form className="mt-6 grid gap-3 rounded-2xl border border-black/8 bg-zinc-50 p-4 md:grid-cols-[1fr_1fr_auto]">
          <select
            name="genre"
            defaultValue={selectedGenre}
            className="h-10 cursor-pointer rounded-xl border border-black/10 bg-white px-3 text-sm font-medium text-zinc-900 outline-none"
          >
            {genreOptions.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>

          <select
            name="sort"
            defaultValue={selectedSort}
            className="h-10 cursor-pointer rounded-xl border border-black/10 bg-white px-3 text-sm font-medium text-zinc-900 outline-none"
          >
            {SORT_OPTIONS.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Lọc
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {pageItems.map((novel) => (
            <NovelCard
              key={novel.id}
              coverSrc={novel.coverSrc}
              title={novel.title}
              latestChapter={novel.latestChapter}
              updatedAgoLabel={novel.updatedAgoLabel}
              href={buildNovelDetailPath(novel)}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Link
            href={createPageHref(basePath, safePage - 1, selectedGenre, selectedSort)}
            aria-disabled={safePage === 1}
            className={[
              "inline-flex h-10 items-center rounded-full border border-black/8 px-4 text-sm font-medium",
              safePage === 1
                ? "pointer-events-none opacity-45"
                : "hover:bg-black/4 text-zinc-900",
            ].join(" ")}
          >
            Trước
          </Link>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === safePage;
            return (
              <Link
                key={page}
                href={createPageHref(basePath, page, selectedGenre, selectedSort)}
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",
                  isActive
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-black/8 text-zinc-900 hover:bg-black/4",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            );
          })}

          <Link
            href={createPageHref(basePath, safePage + 1, selectedGenre, selectedSort)}
            aria-disabled={safePage === totalPages}
            className={[
              "inline-flex h-10 items-center rounded-full border border-black/8 px-4 text-sm font-medium",
              safePage === totalPages
                ? "pointer-events-none opacity-45"
                : "hover:bg-black/4 text-zinc-900",
            ].join(" ")}
          >
            Sau
          </Link>
        </div>
      </section>
    </main>
  );
}
