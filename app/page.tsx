import { RecommendedSwiper } from "../components/RecommendedSwiper";
import { NovelGridSection } from "../components/NovelGridSection";
import { buildNovelDetailPath, NOVELS } from "@/lib/novels";

export default function Home() {
  const demoNovels = NOVELS.map((novel) => ({
    coverSrc: novel.coverSrc,
    title: novel.title,
    latestChapter: novel.latestChapter,
    updatedAgoLabel: novel.updatedAgoLabel,
    href: buildNovelDetailPath(novel),
  }));

  return (
    <div className="flex flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <RecommendedSwiper />

        <NovelGridSection
          title="Truyện mới cập nhật"
          href="/moi-cap-nhat"
          items={demoNovels.slice(0, 8)}
        />

        <NovelGridSection
          title="Truyện mới"
          href="/moi-nhat"
          items={demoNovels.slice().reverse().slice(0, 8)}
        />
      </main>
    </div>
  );
}
