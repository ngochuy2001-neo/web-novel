import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildNovelChapterPath, NOVELS, parseSlugId } from "@/lib/novels";

type NovelDetailPageProps = {
  params: Promise<{
    slugId: string;
  }>;
};

export default async function NovelDetailPage({ params }: NovelDetailPageProps) {
  const { slugId } = await params;
  const parsed = parseSlugId(slugId);

  if (!parsed) notFound();

  const novel = NOVELS.find((item) => item.id === parsed.id && item.slug === parsed.slug);
  if (!novel) notFound();

  const latestChapterNumber = novel.chapters[0]?.number ?? 1;
  const firstChapterHref = buildNovelChapterPath(novel, 1);
  const latestChapterHref = buildNovelChapterPath(novel, latestChapterNumber);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-900">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">{novel.title}</span>
      </nav>

      <section className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-black/8 bg-zinc-100">
          <Image src={novel.coverSrc} alt={novel.title} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-zinc-950">{novel.title}</h1>
          <p className="mt-4 text-zinc-700">{novel.description}</p>

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl border border-black/8 p-3">
              <dt className="text-zinc-500">Tác giả</dt>
              <dd className="mt-1 font-semibold text-zinc-900">{novel.author}</dd>
            </div>
            <div className="rounded-xl border border-black/8 p-3">
              <dt className="text-zinc-500">Trạng thái</dt>
              <dd className="mt-1 font-semibold text-zinc-900">{novel.status}</dd>
            </div>
            <div className="rounded-xl border border-black/8 p-3 sm:col-span-2">
              <dt className="text-zinc-500">Thể loại</dt>
              <dd className="mt-1 font-semibold text-zinc-900">{novel.genres.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={latestChapterHref}
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Đọc chương mới nhất
            </Link>
            <Link
              href={firstChapterHref}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              Đọc từ đầu
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-950">Danh sách chương mới</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-black/8">
          <ul className="divide-y divide-black/8 bg-white">
            {novel.chapters.map((chapter) => (
              <li key={chapter.number} className="flex items-center justify-between gap-4 px-4 py-3">
                <Link
                  href={buildNovelChapterPath(novel, chapter.number)}
                  className="font-medium text-zinc-900 hover:text-red-600 hover:underline"
                >
                  Chương {chapter.number}: {chapter.title}
                </Link>
                <span className="text-sm text-zinc-500">{chapter.updatedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
