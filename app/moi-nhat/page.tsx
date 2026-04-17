import { NovelListPage } from "@/components/NovelListPage";
import { NOVELS } from "@/lib/novels";

type NewestNovelsPageProps = {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    sort?: string;
  }>;
};

export default async function NewestNovelsPage({ searchParams }: NewestNovelsPageProps) {
  const { page, genre, sort } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  return (
    <NovelListPage
      title="Truyện mới"
      description="Danh sách truyện được thêm gần đây."
      novels={NOVELS.slice().reverse()}
      basePath="/moi-nhat"
      currentPage={currentPage}
      selectedGenre={genre}
      selectedSort={sort}
    />
  );
}
